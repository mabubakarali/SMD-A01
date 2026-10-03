import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';

export default function Sidebar({ currentView, onSelectView, onLogout }) {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'courses', label: 'Courses', icon: '📚' },
    { key: 'tasks', label: 'Homeworks', icon: '📝' },
    { key: 'insights', label: 'Result & Analytics', icon: '🎓' },
    { key: 'schedule', label: 'Schedule', icon: '📅' },
    { key: 'notice', label: 'Daily Notice', icon: '💬' },
    { key: 'payment', label: 'Payment Info', icon: '💳' },
    { key: 'registration', label: 'Registration', icon: '✏️' },
  ];

  return (
    <View style={styles.sidebar}>
      {/* Top Logo Icon matching Reference 1 */}
      <View style={styles.logoContainer}>
        <View style={styles.logoTile}>
          <Text style={styles.logoEmoji}>🎓</Text>
        </View>
        <Text style={styles.portalTitle}>UTOPIA</Text>
      </View>

      {/* Navigation Links */}
      <ScrollView
        style={styles.navScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navGroup}>
          {navItems.map((item) => {
            const isActive = currentView === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.navItem, isActive && styles.activeNavItem]}
                onPress={() => onSelectView(item.key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.navIcon,
                    isActive ? styles.activeNavIcon : styles.inactiveNavIcon,
                  ]}
                >
                  {item.icon}
                </Text>
                <Text
                  style={[
                    styles.navLabel,
                    isActive ? styles.activeNavLabel : styles.inactiveNavLabel,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: THEME.colors.canvasSidebar,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoTile: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#985DF9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 28,
  },
  portalTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  navScroll: {
    flex: 1,
  },
  navGroup: {
    gap: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 12,
  },
  activeNavItem: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  navIcon: {
    fontSize: 16,
  },
  inactiveNavIcon: {
    opacity: 0.85,
  },
  activeNavIcon: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  inactiveNavLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  activeNavLabel: {
    color: THEME.colors.primary,
    fontWeight: '800',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginTop: 12,
  },
  logoutIcon: {
    fontSize: 15,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
