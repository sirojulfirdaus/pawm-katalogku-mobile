import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

/** @param {any} props */
export default function FavoritScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <HeaderBar title="Favorit" variant="detail" />
      <View style={styles.content}>
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={24} color={COLORS.muted} />
          <Text style={styles.title}>Belum ada favorit</Text>
          <Text style={styles.description}>
            Simpan produk yang kamu suka agar mudah ditemukan kembali.
          </Text>
          <View style={styles.button}>
            <Button
              title="Lihat Produk"
              variant="primaryDark"
              onPress={() => navigation.navigate('Beranda')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  empty: { alignItems: 'center', gap: 16, padding: 24 },
  title: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  description: {
    color: COLORS.muted,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  button: { alignSelf: 'stretch' },
});
