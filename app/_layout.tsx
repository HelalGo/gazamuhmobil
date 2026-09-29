import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/theme';
import { WhatsAppButton } from '../src/components/WhatsAppButton';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
        {/* alt sekme çubuğunun (~50px) üstünde durur */}
        <WhatsAppButton bottom={56} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
