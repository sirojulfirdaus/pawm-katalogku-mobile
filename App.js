import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './src/theme/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KatalogKu</Text>
      <Text style={styles.subtitle}>Setup berhasil!</Text>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.text,
  },
});