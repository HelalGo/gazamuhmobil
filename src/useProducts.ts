import { useEffect, useState } from 'react';
import { products as sample } from './data';
import type { Product } from './store/cart';

// Web sitesindeki /api/products ucundan okur. Veritabanı şifresi uygulamada TUTULMAZ.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiProduct = { id: string; name: string; brand: string; category: string; price: number; oldPrice: number | null; inStock: boolean; imageUrl: string | null };

// Site görselleri "/uploads/..." gibi göreli adres döndürür; uygulamada tam adrese çevrilir
const absolute = (url: string | null) => (url ? (/^https?:/.test(url) ? url : `${API_URL}${url}`) : null);

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(sample);
  const [loading, setLoading] = useState(!!API_URL);

  useEffect(() => {
    if (!API_URL) return;
    let alive = true;
    fetch(`${API_URL}/api/products`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rows: ApiProduct[]) => {
        if (!alive) return;
        setProducts(
          rows.map((r) => ({ id: r.id, name: r.name, brand: r.brand, category: r.category, price: r.price, oldPrice: r.oldPrice, inStock: r.inStock, imageUrl: absolute(r.imageUrl) }))
        );
      })
      .catch(() => {}) // hata olursa örnek veri kalır
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { products, loading };
}
