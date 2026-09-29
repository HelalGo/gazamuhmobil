import { FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';
import { useProducts } from '../../src/useProducts';
import { ProductCard } from '../../src/components/ProductCard';

export default function Products() {
  const { top } = useSafeAreaInsets();
  const { products } = useProducts();
  return (
    <FlatList
      data={products}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 20, paddingTop: top + 20 }}
      ListHeaderComponent={<Text style={{ color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: 16 }}>Klimalar</Text>}
      renderItem={({ item, index }) => <ProductCard product={item} index={index} />}
    />
  );
}
