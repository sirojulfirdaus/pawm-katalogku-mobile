import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../theme/colors';

/**
 * @param {{ title: string, subtitle?: string, onBack?: import('react-native').PressableProps['onPress'], includeTopInset?: boolean }} props
 */
export default function HeaderBar({
  title,
  subtitle,
  onBack,
  // Disable only for inline previews or a parent that already handles the top inset.
  includeTopInset = true,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: (includeTopInset ? insets.top : 0) + 8,
        },
      ]}
    >
      <View style={styles.topRow}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            hitSlop={4}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </Pressable>
        ) : null}

        <Text
          style={[styles.title, onBack && styles.titleWithBack]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 12,
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
