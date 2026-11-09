import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../theme/colors';

/**
 * @param {{ title: string, subtitle?: string, onBack?: import('react-native').PressableProps['onPress'], includeTopInset?: boolean, variant?: 'default' | 'primary' | 'detail' }} props
 */
export default function HeaderBar({
  title,
  subtitle,
  onBack,
  // Disable only for inline previews or a parent that already handles the top inset.
  includeTopInset = true,
  variant = 'default',
}) {
  const insets = useSafeAreaInsets();
  const isPrimary = variant === 'primary' || variant === 'detail';
  const isDetail = variant === 'detail';

  return (
    <View
      style={[
        styles.container,
        isPrimary && styles.primaryContainer,
        {
          paddingTop: (includeTopInset ? insets.top : 0) + (isPrimary ? 0 : 8),
        },
      ]}
    >
      <View style={[styles.topRow, isPrimary && styles.primaryRow]}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            hitSlop={4}
            style={({ pressed }) => [
              styles.backButton,
              isDetail && styles.detailBackButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isPrimary ? COLORS.surface : COLORS.text}
            />
          </Pressable>
        ) : null}

        <Text
          style={[
            styles.title,
            isPrimary && styles.primaryTitle,
            isDetail && styles.detailTitle,
            onBack && styles.titleWithBack,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {subtitle ? (
        <Text style={[styles.subtitle, isPrimary && styles.primarySubtitle]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  primaryContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingBottom: 0,
  },
  primaryRow: {
    minHeight: 56,
  },
  primaryTitle: {
    color: COLORS.surface,
    fontSize: 24,
    lineHeight: 30,
  },
  primarySubtitle: {
    color: COLORS.surface,
  },
  detailBackButton: {
    marginLeft: 0,
  },
  detailTitle: {
    fontSize: 22,
    lineHeight: 28,
  },

  topRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -12,
  },

  backButtonPressed: {
    opacity: 0.6,
  },

  title: {
    flex: 1,
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Roboto-Bold',
  },

  titleWithBack: {
    marginLeft: 4,
  },

  subtitle: {
    fontFamily: 'Roboto-Regular',
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
