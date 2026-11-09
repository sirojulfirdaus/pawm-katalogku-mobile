import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { COLORS } from './src/theme/colors';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    ...Ionicons.font,
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {fontsLoaded ? (
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      ) : (
        <View style={styles.loading}>
          {fontError ? (
            <Text style={styles.loadingError}>
              Font gagal dimuat. Silakan muat ulang aplikasi.
            </Text>
          ) : (
            <ActivityIndicator
              color={COLORS.primary}
              accessibilityLabel="Memuat komponen"
            />
          )}
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  loadingError: {
    color: COLORS.error,
    textAlign: 'center',
  },
});
