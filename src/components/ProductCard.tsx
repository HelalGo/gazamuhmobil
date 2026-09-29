import { Pressable, Text, View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme';
import { tl } from '../data';
import { useCart, type Product } from '../store/cart';

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const add = useCart((s) => s.add);
  return (
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 450, delay: index * 90 }}
      style={s.card}
    >
      {product.imageUrl ? (
        <Image source={product.imageUrl} style={[s.img, s.photo]} contentFit="contain" transition={200} accessibilityLabel={product.name} />
      ) : (
        <View style={s.img} />
      )}
      <Text style={s.brand}>{product.brand}</Text>
      <Text style={s.name} numberOfLines={2}>{product.name}</Text>
      <Text style={s.btu}>{product.category}</Text>
      <View style={s.row}>
        <View>
          {product.oldPrice && product.oldPrice > product.price ? <Text style={s.old}>{tl(product.oldPrice)}</Text> : null}
          <Text style={s.price}>{tl(product.price)}</Text>
        </View>
        <Pressable
          disabled={!product.inStock}
          style={({ pressed }) => [s.btn, !product.inStock && s.btnOff, pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            add(product);
          }}
        >
          <Text style={[s.btnText, !product.inStock && { color: colors.muted }]}>{product.inStock ? 'Sepete Ekle' : 'Tükendi'}</Text>
        </Pressable>
      </View>
    </MotiView>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 20, padding: 16, marginBottom: 14 },
  img: { height: 120, borderRadius: 14, backgroundColor: colors.surfaceAlt, marginBottom: 12 },
  photo: { height: 180, backgroundColor: '#FFFFFF' },
  brand: { color: colors.muted, fontSize: 12 },
  name: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 2 },
  btu: { color: colors.primary, fontSize: 13, marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  price: { color: colors.text, fontSize: 18, fontWeight: '800' },
  btn: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  btnOff: { backgroundColor: colors.surfaceAlt },
  old: { color: colors.muted, fontSize: 12, textDecorationLine: 'line-through' },
  btnText: { color: '#FFFFFF', fontWeight: '700' },
});
