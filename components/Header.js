import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export default function Header({
  studentName = 'John Doe',
  currentView,
  attentionCount = 0,
  onLogout,
}) {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      {/* Top Profile & Action Bar */}
      <View style={styles.topRow}>
        <View style={styles.studentProfile}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍🎓</Text>
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.studentName}>{studentName}</Text>
              <View style={styles.verifiedDot} />
            </View>
            <Text style={styles.studentRole}>3rd Year · BS Computer Science</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          {/* Notification Alert Bell */}
          <View style={[styles.iconButton, attentionCount > 0 && styles.alertIconButton]}>
            <Text style={styles.actionIcon}>🔔</Text>
            {attentionCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{attentionCount}</Text>
              </View>
            )}
          </View>

          {/* Logout / Switch User */}
          {onLogout && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>🚪 Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* View Title & Date Bar */}
      <View style={styles.bottomRow}>
        <Text style={styles.viewTitle}>
          {currentView === 'dashboard'
            ? 'Portal Dashboard'
            : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: THEME.colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  studentProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: THEME.colors.primaryBorder,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primaryLight,
  },
  studentRole: {
    fontSize: 11,
    fontWeight: '500',
    color: THEME.colors.textSecondary,
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: THEME.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  alertIconButton: {
    borderColor: THEME.colors.watch,
    backgroundColor: THEME.colors.watchBg,
  },
  actionIcon: {
    fontSize: 14,
  },
  notifBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: THEME.colors.critical,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  notifBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  logoutText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  viewTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.4,
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
});
