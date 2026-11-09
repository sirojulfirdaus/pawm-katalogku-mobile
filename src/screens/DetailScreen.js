import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

/**
 * @param {{ product?: (typeof import('../data/dummy').products)[number] | null, onBack?: () => void }} props
 */
export default function DetailScreen({ product, onBack }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [failedImage, setFailedImage] = useState('');
  const image = product?.thumbnail;
  const hasImage = Boolean(image) && image !== failedImage;

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <HeaderBar
        title={product?.title || 'Detail Produk'}
        variant="detail"
        onBack={onBack}
      />
      {product ? (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
          >
            <View style={styles.hero}>
              {hasImage ? (
                <Image
                  key={image}
                  source={{ uri: image }}
                  onError={() => setFailedImage(image ?? '')}
                  accessibilityLabel={product.title}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.meta}>Placeholder gambar</Text>
              )}
            </View>
            <View style={styles.summary}>
              <Text style={styles.meta}>{product.category}</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productTitle}>
                Rp{product.price.toLocaleString('id-ID')}
              </Text>
              {product.rating != null && (
                <Text style={styles.meta}>
                  ★ {String(product.rating).replace('.', ',')}
                </Text>
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.sectionTitle}>Deskripsi</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          </ScrollView>
          <View style={styles.action}>
            <Button
              title={
                isFavorite(product.id)
                  ? 'Hapus dari Favorit'
                  : 'Tambah ke Favorit'
              }
              variant={isFavorite(product.id) ? 'outline' : 'primaryDark'}
              onPress={() => toggleFavorite(product)}
            />
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.descriptionText}>Produk tidak tersedia.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  hero: {
    width: '100%',
    aspectRatio: 328 / 244,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceSubtle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  summary: { gap: 8 },
  meta: {
    color: COLORS.muted,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 17,
  },
  productTitle: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 27,
  },
  description: { gap: 8 },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  descriptionText: {
    color: COLORS.muted,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  action: { paddingHorizontal: 16, paddingVertical: 16 },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
