import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import { useFavorites } from '../context/FavoritesContext';
import { COLORS } from '../theme/colors';

/** @param {any} props */
export default function FavoritScreen({ navigation }) {
  const { favorites } = useFavorites();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const columns = width < 500 ? 2 : width < 768 ? 3 : 4;
  const cardWidth = Math.max(
    0,
    (width - insets.left - insets.right - 32 - 12 * (columns - 1)) / columns,
  );
  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <HeaderBar title="Favorit" variant="detail" />
      <FlatList
        key={columns}
        data={favorites}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
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
        }
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <Card
              compact
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              rating={item.rating}
              onPress={() => navigation.navigate('Detail', { product: item })}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  list: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 16 },
  row: { gap: 12, marginBottom: 12 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 8 },
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
