import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import { COLORS } from './src/theme/colors';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    /** @type {(typeof import('./src/data/dummy').products)[number] | null} */ (
      null
    ),
  );
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
        <>
          <View style={[styles.home, selectedProduct && styles.hidden]}>
            <HomeScreen onProductPress={setSelectedProduct} />
          </View>
          {selectedProduct && (
            <DetailScreen
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onFavoritePress={() =>
                Alert.alert(
                  'Favorit',
                  'Fitur Favorit akan diimplementasikan pada Modul 6.',
                )
              }
            />
          )}
        </>
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
  home: { flex: 1 },
  hidden: { display: 'none' },
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
