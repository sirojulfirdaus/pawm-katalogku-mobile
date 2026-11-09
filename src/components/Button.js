import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../theme/colors';

/**
 * @param {{ title: string, onPress?: import('react-native').PressableProps['onPress'], variant?: 'primary' | 'outline' | 'danger', disabled?: boolean }} props
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) {
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : isDanger ? styles.danger : styles.primary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          isOutline ? styles.textOutline : styles.textFilled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  danger: {
    backgroundColor: COLORS.error,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },

  textFilled: {
    color: COLORS.surface,
  },

  textOutline: {
    color: COLORS.primary,
  },
});
