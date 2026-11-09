import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

/** @param {any} props */
export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <HeaderBar
        title="Tentang"
        variant="detail"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.title}>KatalogKu</Text>
        <Text style={styles.label}>Nama mahasiswa</Text>
        <Text style={styles.value}>Sirojul Firdaus</Text>
        <Text style={styles.label}>NIM</Text>
        <Text style={styles.value}>18224095</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, gap: 8 },
  title: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 27,
    marginBottom: 8,
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
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});
