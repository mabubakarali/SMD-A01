import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function WarningCard({ title, message, type = 'critical' }) {
  const isCritical = type === 'critical';
  const color = isCritical ? THEME.colors.critical : THEME.colors.watch;
  const bgColor = isCritical ? THEME.colors.criticalBg : THEME.colors.watchBg;
  const borderColor = isCritical ? THEME.colors.criticalBorder : THEME.colors.watchBorder;
  const icon = isCritical ? '⚠️' : '⚡';

  return (
    <View style={[styles.card, { backgroundColor: THEME.colors.surface, borderColor: THEME.colors.border }]}>
      {/* Left Accent Indicator Bar */}
      <View style={[styles.indicatorBar, { backgroundColor: color }]} />
      
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.tagBadge, { backgroundColor: bgColor, borderColor }]}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={[styles.title, { color }]}>{title}</Text>
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  indicatorBar: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    gap: 5,
  },
  icon: {
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    fontWeight: '500',
  },
});
