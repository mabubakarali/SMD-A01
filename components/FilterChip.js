import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function FilterChip({ label, count, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.activeChip]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
      {count !== undefined && count !== null ? (
        <View style={[styles.countBadge, active && styles.activeCountBadge]}>
          <Text style={[styles.countText, active && styles.activeCountText]}>
            {count}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  activeLabel: {
    color: THEME.colors.primary,
    fontWeight: '700',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    backgroundColor: THEME.colors.border,
  },
  activeCountBadge: {
    backgroundColor: THEME.colors.primary,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  activeCountText: {
    color: THEME.colors.background,
  },
});
