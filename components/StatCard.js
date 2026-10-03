import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function StatCard({
  title,
  value,
  unit = '',
  subtitle,
  icon,
  accentColor = THEME.colors.primary,
  badgeText,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}18`, borderColor: `${accentColor}35` }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        {badgeText ? (
          <View style={[styles.badge, { backgroundColor: `${accentColor}18`, borderColor: `${accentColor}40` }]}>
            <Text style={[styles.badgeText, { color: accentColor }]}>{badgeText}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.valueRow}>
        <Text style={[styles.valueText, { color: THEME.colors.textPrimary }]}>{value}</Text>
        {unit ? <Text style={[styles.unitText, { color: accentColor }]}>{unit}</Text> : null}
      </View>

      <Text style={styles.titleText}>{title}</Text>
      {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconText: {
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  unitText: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 3,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
});
