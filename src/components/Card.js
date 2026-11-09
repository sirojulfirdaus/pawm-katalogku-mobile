import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

/**
 * @param {{ title: string, price: number | string, image?: string, rating?: number, discount?: number, onPress?: import('react-native').PressableProps['onPress'], compact?: boolean }} props
 */
export default function Card({
  title,
  price,
  image,
  rating,
  discount,
  onPress,
  compact = false,
}) {
  const [failedImage, setFailedImage] = useState('');
  const hasImage = Boolean(image) && failedImage !== image;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        compact && styles.compactCard,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[styles.imageContainer, compact && styles.compactImageContainer]}
      >
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
          <View
            style={[styles.placeholder, compact && styles.compactPlaceholder]}
          >
            {!compact && (
              <Ionicons name="image-outline" size={32} color={COLORS.muted} />
            )}
            <Text
              style={[
                styles.placeholderText,
                compact && styles.compactPlaceholderText,
              ]}
            >
              {compact ? 'Placeholder gambar' : 'Gambar tidak tersedia'}
            </Text>
          </View>
        )}

        {discount != null && discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={[styles.body, compact && styles.compactBody]}>
        <Text
          style={[styles.title, compact && styles.compactTitle]}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text style={[styles.price, compact && styles.compactPrice]}>
          {formatPrice(price)}
        </Text>

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
  compactCard: {
    flex: 0,
    height: 214,
    borderRadius: 10,
  },
  compactImageContainer: {
    flex: 1,
    aspectRatio: undefined,
  },
  compactPlaceholder: {
    alignItems: 'flex-start',
  },
  compactPlaceholderText: {
    textAlign: 'left',
  },
  compactBody: {
    height: 88,
    paddingVertical: 6,
    gap: 3,
  },
  compactTitle: {
    minHeight: 36,
    lineHeight: 18,
  },
  compactPrice: {
    lineHeight: 18,
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
