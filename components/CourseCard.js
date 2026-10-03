import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';
import ProgressBar from './ProgressBar';
import { calculateAttendance, getAttendanceStatus } from '../utils/calculations';

export default function CourseCard({ course, onPress }) {
  const attendance = calculateAttendance(course.attended, course.totalClasses);
  const status = getAttendanceStatus(attendance);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(course)}
      activeOpacity={0.7}
    >
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.codeContainer}>
          <View style={styles.codeBadge}>
            <Text style={styles.courseCode}>{course.code}</Text>
          </View>
          <View style={styles.creditPill}>
            <Text style={styles.creditText}>{course.creditHours} Credits</Text>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: status.bgColor, borderColor: status.color }]}>
          <View style={[styles.statusDot, { backgroundColor: status.color }]} />
          <Text style={[styles.statusBadgeText, { color: status.color }]}>
            {status.badgeText}
          </Text>
        </View>
      </View>

      {/* Course Title & Instructor */}
      <Text style={styles.courseName} numberOfLines={1}>
        {course.name}
      </Text>
      <View style={styles.instructorRow}>
        <Text style={styles.instructorIcon}>👤</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
      </View>

      {/* Attendance Metrics Bar */}
      <View style={styles.attendanceSection}>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>
            Attendance ({course.attended}/{course.totalClasses} classes)
          </Text>
          <Text style={[styles.metricValue, { color: status.color }]}>
            {attendance}%
          </Text>
        </View>
        <ProgressBar
          progress={attendance}
          color={status.color}
          trackColor={THEME.colors.canvasAlt}
          height={6}
        />
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.marksContainer}>
          <Text style={styles.marksLabel}>Current Score: </Text>
          <Text style={styles.marksValue}>{course.marks}%</Text>
        </View>
        <View style={styles.actionPrompt}>
          <Text style={styles.tapPrompt}>Simulate & Details</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  codeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: THEME.colors.primaryGlow,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
  },
  courseCode: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.accentCyan,
    letterSpacing: 0.5,
  },
  creditPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  creditText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 14,
  },
  instructorIcon: {
    fontSize: 11,
  },
  instructor: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  attendanceSection: {
    marginBottom: 14,
    backgroundColor: THEME.colors.surfaceElevated,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '800',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 10,
  },
  marksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marksLabel: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  marksValue: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tapPrompt: {
    fontSize: 12,
    color: THEME.colors.primaryLight,
    fontWeight: '700',
  },
  arrowIcon: {
    fontSize: 12,
    color: THEME.colors.primaryLight,
  },
});
