import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

/**
 * @param {{ title: string, price: number | string, image?: string, rating?: number, discount?: number, onPress?: import('react-native').PressableProps['onPress'] }} props
 */
export default function Card({
  title,
  price,
  image,
  rating,
  discount,
  onPress,
}) {
  const [failedImage, setFailedImage] = useState('');
  const hasImage = Boolean(image) && failedImage !== image;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        {hasImage ? (
          <Image
            key={image}
            source={{ uri: image }}
            onError={() => setFailedImage(image ?? '')}
            accessibilityLabel={title}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={32} color={COLORS.muted} />
            <Text style={styles.placeholderText}>Gambar tidak tersedia</Text>
          </View>
        )}

        {discount != null && discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.price}>{formatPrice(price)}</Text>

        {rating != null && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={COLORS.muted} />

            <Text style={styles.ratingText}>
              {String(rating).replace('.', ',')}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

/** @param {number | string} price */
function formatPrice(price) {
  if (typeof price === 'number') {
    return `Rp${price.toLocaleString('id-ID')}`;
  }

  return price ?? '';
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },

  pressed: {
    opacity: 0.8,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.surfaceSubtle,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    flex: 1,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  placeholderText: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.error,
  },

  discountText: {
    color: COLORS.surface,
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },

  body: {
    padding: 12,
    gap: 4,
  },

  title: {
    minHeight: 40,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Roboto-Regular',
  },

  price: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Roboto-Bold',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.muted,
    fontSize: 12,
  },
});
