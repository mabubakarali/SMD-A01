import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { THEME } from '../constants/theme';

export default function TopNavBar({
  studentName = 'John Doe',
  searchQuery = '',
  onSearchChange,
  attentionCount = 0,
  onOpenNotifications,
  isMobile,
  currentView,
  onSelectView,
}) {
  return (
    <View style={styles.headerContainer}>
      {/* Search Input Bar (Dark Theme) */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, homeworks, notices..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {/* Right Student Profile & Bell */}
      <View style={styles.profileSection}>
        {/* Profile Info */}
        <View style={styles.studentInfoRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍🎓</Text>
          </View>
          <View style={styles.nameBlock}>
            <Text style={styles.studentName} numberOfLines={1}>{studentName}</Text>
            <Text style={styles.studentYear}>3rd year · FAST-NUCES</Text>
          </View>
        </View>

        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.bellButton}
          onPress={onOpenNotifications}
          activeOpacity={0.7}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          {attentionCount > 0 && <View style={styles.redBadgeDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#0B0C14',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 16,
  },
  searchWrapper: {
    flex: 1,
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141522',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },
  searchIcon: {
    fontSize: 14,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(138, 75, 243, 0.2)',
    borderWidth: 1.5,
    borderColor: '#8A4BF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  nameBlock: {
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  studentYear: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#141522',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  bellIcon: {
    fontSize: 15,
  },
  redBadgeDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#0B0C14',
  },
});
