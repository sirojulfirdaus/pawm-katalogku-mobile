import { StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../theme/colors';

/**
 * @param {import('react-native').TextInputProps & { label?: string, error?: string, icon?: keyof typeof Ionicons.glyphMap, compact?: boolean }} props
 */
export default function CustomInput({
  label,
  error,
  icon,
  compact = false,
  style,
  placeholderTextColor = COLORS.muted,
  selectionColor = COLORS.primary,
  ...rest
}) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          compact && styles.compactContainer,
          error && styles.inputError,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={compact ? 24 : 20}
            color={COLORS.muted}
            style={styles.icon}
          />
        ) : null}

        <TextInput
          accessibilityLabel={label}
          {...rest}
          style={[styles.input, compact && styles.compactInput, style]}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
        />
      </View>

      {error ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },

  label: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },

  inputContainer: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
  },

  inputError: {
    borderColor: COLORS.error,
  },
  compactContainer: {
    minHeight: 44,
    height: 44,
    borderRadius: 8,
  },
  compactInput: {
    paddingVertical: 0,
    fontSize: 14,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: 'Roboto-Regular',
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 16,
  },

  errorText: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.error,
    fontSize: 12,
    lineHeight: 16,
  },
});
