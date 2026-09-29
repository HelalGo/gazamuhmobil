import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';
import { useProducts } from '../../src/useProducts';
import { ProductCard } from '../../src/components/ProductCard';

export default function Home() {
  const { top } = useSafeAreaInsets();
  const { products } = useProducts();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: top + 20 }}>
      <LinearGradient colors={[colors.surfaceAlt, colors.surface]} style={s.hero}>
        <MotiView
          from={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          style={s.glow}
        />
        <MotiText from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} style={s.title}>
          Gaza Mühendislik
        </MotiText>
        <MotiText from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 300 }} style={s.sub}>
          Klima & iklimlendirme çözümleri
        </MotiText>
      </LinearGradient>
      <Text style={s.h2}>Öne Çıkanlar</Text>
      {products.slice(0, 2).map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { borderRadius: 24, padding: 28, minHeight: 180, justifyContent: 'flex-end', overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  glow: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: colors.primary, opacity: 0.25 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  sub: { color: colors.muted, marginTop: 4 },
  h2: { color: colors.text, fontSize: 20, fontWeight: '700', marginVertical: 20 },
});
