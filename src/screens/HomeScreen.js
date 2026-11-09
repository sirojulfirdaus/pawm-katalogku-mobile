import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Card from '../components/Card';
import CategoryChips from '../components/CategoryChips';
import CustomInput from '../components/CustomInput';
import HeaderBar from '../components/HeaderBar';
import { products } from '../data/dummy';
import { COLORS } from '../theme/colors';

const CATEGORIES = ['Semua', 'Fashion', 'Elektronik', 'Rumah', 'Kecantikan'];
const SORT_OPTIONS = ['Termurah', 'Termahal'];
const PROMO_IMAGE = 'https://picsum.photos/seed/katalogku-promo/1200/420';
const PADDING = 16;
const GAP = 12;

/** @param {{ onProductPress?: (product: (typeof products)[number]) => void }} props */
export default function HomeScreen({ onProductPress }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('');
  const [promoImageFailed, setPromoImageFailed] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const columns = width < 500 ? 2 : width < 768 ? 3 : 4;
  const cardWidth = Math.max(
    0,
    (width - insets.left - insets.right - PADDING * 2 - GAP * (columns - 1)) /
      columns,
  );
  const query = search.trim().toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'Semua' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(query),
  );
  const displayedProducts = [...filteredProducts];
  if (sortOrder === 'Termurah') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'Termahal') {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <HeaderBar title="KatalogKu" variant="primary" />
      <View style={styles.searchBackdrop}>
        <CustomInput
          compact
          icon="search"
          accessibilityLabel="Cari produk"
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>

      <FlatList
        key={columns}
        data={displayedProducts}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <CategoryChips
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <View style={styles.promo}>
              {!promoImageFailed && (
                <Image
                  source={{ uri: PROMO_IMAGE }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                  onError={() => setPromoImageFailed(true)}
                />
              )}
              <View style={styles.promoOverlay} />
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoText}>Diskon 50%</Text>
              </View>
            </View>
            <Text style={styles.heading}>Produk</Text>
            <View style={styles.sortOptions}>
              <CategoryChips
                categories={SORT_OPTIONS}
                selectedCategory={sortOrder}
                onSelect={(option) =>
                  setSortOrder(option === sortOrder ? '' : option)
                }
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Produk tidak ditemukan.</Text>
        }
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <Card
              compact
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              rating={item.rating}
              onPress={onProductPress ? () => onProductPress(item) : undefined}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  searchBackdrop: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: PADDING,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: { paddingHorizontal: PADDING, paddingBottom: 32 },
  row: { gap: GAP, marginBottom: GAP },
  promo: {
    height: 116,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primaryDark,
    overflow: 'hidden',
  },
  promoOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  promoTextContainer: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  promoText: {
    color: COLORS.surface,
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    lineHeight: 30,
  },
  sortOptions: { marginBottom: 12 },
  heading: {
    paddingTop: 24,
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  empty: {
    color: COLORS.muted,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
