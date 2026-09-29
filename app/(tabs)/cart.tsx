import { View, Text, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';
import { tl } from '../../src/data';
import { useCart } from '../../src/store/cart';

export default function Cart() {
  const { top } = useSafeAreaInsets();
  const { items, remove, total } = useCart();
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: top + 20 }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: 16 }}>Sepet</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>Sepetiniz boş.</Text>}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.border }}>
            <View>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{item.name} × {item.qty}</Text>
              <Text style={{ color: colors.muted }}>{item.brand}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.text }}>{tl(item.price * item.qty)}</Text>
              <Pressable onPress={() => remove(item.id)}><Text style={{ color: colors.primary }}>Kaldır</Text></Pressable>
            </View>
          </View>
        )}
      />
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 16 }}>Toplam: {tl(total())}</Text>
    </View>
  );
}
