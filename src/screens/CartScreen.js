import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <HeaderBar title="Keranjang" variant="detail" />
      <View style={styles.content}>
        <Ionicons name="cart-outline" size={24} color={COLORS.muted} />
        <Text style={styles.title}>Keranjang masih kosong</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
  title: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
