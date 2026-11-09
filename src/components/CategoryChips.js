import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../theme/colors';

/**
 * @param {{ categories: string[], selectedCategory: string, onSelect: (category: string) => void }} props
 */
export default function CategoryChips({ categories, selectedCategory, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {categories.map((category) => {
        const selected = category === selectedCategory;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={styles.touchTarget}
          >
            <View style={[styles.chip, selected && styles.selectedChip]}>
              <Text style={[styles.label, selected && styles.selectedLabel]}>
                {category}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  touchTarget: {
    minHeight: 48,
    minWidth: 48,
    justifyContent: 'center',
  },
  chip: {
    height: 36,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  selectedChip: {
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.primaryLight,
  },
  label: {
    color: COLORS.text,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  selectedLabel: {
    color: COLORS.primary,
  },
});
