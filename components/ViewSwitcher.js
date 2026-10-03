import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function ViewSwitcher({ currentView, onSelectView }) {
  const views = [
    { key: 'dashboard', label: 'Overview', icon: '⚡' },
    { key: 'courses', label: 'Courses', icon: '📚' },
    { key: 'tasks', label: 'Tasks', icon: '✓' },
    { key: 'insights', label: 'Analytics', icon: '✦' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.switcherWrapper}>
        {views.map((view) => {
          const isActive = currentView === view.key;
          return (
            <TouchableOpacity
              key={view.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onSelectView(view.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>
                {view.icon}
              </Text>
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {view.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: THEME.colors.background,
  },
  switcherWrapper: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 11,
    gap: 5,
  },
  activeTabButton: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  tabIcon: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  activeTabIcon: {
    color: THEME.colors.accentCyan,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    letterSpacing: -0.2,
  },
  activeTabLabel: {
    color: THEME.colors.textPrimary,
    fontWeight: '700',
  },
});
