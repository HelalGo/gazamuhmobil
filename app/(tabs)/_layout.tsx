import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';
import { useCart } from '../../src/store/cart';

export default function TabsLayout() {
  const count = useCart((s) => s.count());
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="products" options={{ title: 'Ürünler', tabBarIcon: ({ color, size }) => <Ionicons name="snow" color={color} size={size} /> }} />
      <Tabs.Screen name="cart" options={{ title: 'Sepet', tabBarBadge: count || undefined, tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} /> }} />
    </Tabs>
  );
}
