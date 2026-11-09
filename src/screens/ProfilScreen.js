import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

/** @param {any} props */
export default function ProfilScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <HeaderBar title="Profil" variant="detail" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={24}
              color={COLORS.primaryDark}
            />
          </View>
          <Text style={styles.name}>Nama Pengguna</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>Belum tersedia</Text>
          </View>
        </View>
        <Button
          title="Tentang"
          variant="outline"
          onPress={() => navigation.navigate('Tentang')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 16, paddingVertical: 32, gap: 32 },
  identity: { alignItems: 'center', gap: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 27,
  },
  section: { gap: 16 },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  info: {
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  label: {
    color: COLORS.muted,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 17,
  },
  value: {
    color: COLORS.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
});
