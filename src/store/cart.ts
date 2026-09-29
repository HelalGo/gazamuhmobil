import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  inStock: boolean;
  imageUrl?: string | null;
};
type CartItem = Product & { qty: number };

type CartState = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (p) =>
    set((s) => {
      const found = s.items.find((i) => i.id === p.id);
      return {
        items: found
          ? s.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
          : [...s.items, { ...p, qty: 1 }],
      };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((t, i) => t + i.price * i.qty, 0),
  count: () => get().items.reduce((t, i) => t + i.qty, 0),
}));
