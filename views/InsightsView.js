import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { THEME } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';
import {
  calculateAttendance,
  getAttendanceStatus,
  calculateProjectedAttendance,
} from '../utils/calculations';

export default function InsightsView({ courses, tasks, onOpenCourse }) {
  // Sorting state - easy live modification during viva
  const [sortBy, setSortBy] = useState('attendance'); // 'attendance' (ascending) | 'marks' (descending)

  // 1. Attendance Insights: Find course with lowest attendance
  const coursesWithAttendance = courses.map((course) => ({
    ...course,
    attendance: calculateAttendance(course.attended, course.totalClasses),
    status: getAttendanceStatus(
      calculateAttendance(course.attended, course.totalClasses)
    ),
  }));

  const lowestAttendanceCourse = [...coursesWithAttendance].sort(
    (a, b) => a.attendance - b.attendance
  )[0];

  // 2. Performance Insights: Find course with highest marks
  const highestMarksCourse = [...courses].sort((a, b) => b.marks - a.marks)[0];

  // 3. Workload Insights
  const pendingTasks = tasks.filter((t) => !t.completed);
  const highPriorityTasks = pendingTasks.filter((t) => t.priority === 'High');

  // 4. Dynamic Recovery calculation for lowest course
  const recoveryClasses = 3;
  const projectedAttendance = lowestAttendanceCourse
    ? calculateProjectedAttendance(
        lowestAttendanceCourse.attended,
        lowestAttendanceCourse.totalClasses,
        recoveryClasses
      )
    : 0;

  // 5. Sorted Academic Priority List
  const sortedCourses = [...coursesWithAttendance].sort((a, b) => {
    if (sortBy === 'attendance') {
      return a.attendance - b.attendance; // Ascending: lowest attendance first
    } else {
      return b.marks - a.marks; // Descending: highest marks first
    }
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Overview Intro */}
      <View style={styles.introHeader}>
        <Text style={styles.introTitle}>Academic Intelligence</Text>
        <Text style={styles.introSubtitle}>
          Real-time analytics and attendance recovery targets.
        </Text>
      </View>

      {/* Insight Highlight Card: Attendance Focus */}
      {lowestAttendanceCourse && (
        <View style={styles.highlightCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCapsule, { backgroundColor: THEME.colors.criticalBg }]}>
              <Text style={styles.cardIcon}>🎯</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Attendance Focus Course</Text>
              <Text style={styles.cardSub}>Requires immediate attendance boost</Text>
            </View>
          </View>
          <Text style={styles.insightMainText}>
            Your lowest attendance is in{' '}
            <Text style={styles.highlightCyan}>{lowestAttendanceCourse.code}</Text> ({lowestAttendanceCourse.name}) at{' '}
            <Text
              style={{
                color: lowestAttendanceCourse.status.color,
                fontWeight: '800',
              }}
            >
              {lowestAttendanceCourse.attendance}%
            </Text>
            .
          </Text>
          <Text style={styles.insightDetailText}>
            Currently {lowestAttendanceCourse.attended} of {lowestAttendanceCourse.totalClasses} classes attended · Status: {lowestAttendanceCourse.status.badgeText}.
          </Text>
        </View>
      )}

      {/* Recovery Strategy Simulator Card */}
      {lowestAttendanceCourse && (
        <View style={styles.recoveryCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCapsule, { backgroundColor: THEME.colors.primaryGlow }]}>
              <Text style={styles.cardIcon}>🚀</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Attendance Recovery Plan</Text>
              <Text style={styles.cardSub}>Target: Attend next 3 lectures</Text>
            </View>
          </View>
          <Text style={styles.recoveryMessage}>
            For <Text style={styles.boldWhite}>{lowestAttendanceCourse.name}</Text>,
            attending the next{' '}
            <Text style={styles.boldCyan}>{recoveryClasses} consecutive lectures</Text>{' '}
            will boost your attendance from{' '}
            <Text
              style={{
                color: lowestAttendanceCourse.status.color,
                fontWeight: '700',
              }}
            >
              {lowestAttendanceCourse.attendance}%
            </Text>{' '}
            to <Text style={styles.boldGreen}>{projectedAttendance}%</Text>.
          </Text>

          <View style={styles.recoveryProgressBox}>
            <View style={styles.recRow}>
              <Text style={styles.recLabel}>Projected Recovery Rate</Text>
              <Text style={styles.recValue}>{projectedAttendance}%</Text>
            </View>
            <ProgressBar
              progress={projectedAttendance}
              color={
                projectedAttendance >= THEME.ATTENDANCE_WARNING_THRESHOLD
                  ? THEME.colors.healthy
                  : THEME.colors.watch
              }
              trackColor={THEME.colors.canvasAlt}
              height={8}
            />
          </View>
        </View>
      )}

      {/* Top Performing Subject */}
      {highestMarksCourse && (
        <View style={styles.highlightCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCapsule, { backgroundColor: THEME.colors.healthyBg }]}>
              <Text style={styles.cardIcon}>🏆</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Academic Strength</Text>
              <Text style={styles.cardSub}>Top scoring subject</Text>
            </View>
          </View>
          <Text style={styles.insightMainText}>
            Your highest scoring subject is{' '}
            <Text style={styles.highlightCyan}>{highestMarksCourse.name}</Text> with{' '}
            <Text style={styles.boldGreen}>{highestMarksCourse.marks}%</Text> marks.
          </Text>
          <Text style={styles.insightDetailText}>
            Taught by {highestMarksCourse.instructor} · {highestMarksCourse.creditHours} Credit Hours
          </Text>
        </View>
      )}

      {/* Task & Workload Summary Card */}
      <View style={styles.highlightCard}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconCapsule, { backgroundColor: THEME.colors.watchBg }]}>
            <Text style={styles.cardIcon}>⏳</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Deliverables Distribution</Text>
            <Text style={styles.cardSub}>Active semester workload</Text>
          </View>
        </View>
        <Text style={styles.insightMainText}>
          You have <Text style={styles.highlightCyan}>{pendingTasks.length}</Text> pending{' '}
          {pendingTasks.length === 1 ? 'task' : 'tasks'}, of which{' '}
          <Text style={styles.boldRose}>{highPriorityTasks.length}</Text>{' '}
          {highPriorityTasks.length === 1 ? 'is' : 'are'} marked High Priority.
        </Text>
        <Text style={styles.insightDetailText}>
          Clearing urgent assignments directly avoids end-of-term attendance stress.
        </Text>
      </View>

      {/* Academic Attention Priority List */}
      <View style={styles.prioritySectionHeader}>
        <View>
          <Text style={styles.sectionHeading}>Priority Ranking</Text>
          <Text style={styles.sectionSub}>
            {sortBy === 'attendance'
              ? 'Sorted by Lowest Attendance First'
              : 'Sorted by Highest Marks First'}
          </Text>
        </View>

        {/* Sort Switcher */}
        <View style={styles.sortToggleRow}>
          <TouchableOpacity
            style={[
              styles.sortBtn,
              sortBy === 'attendance' && styles.activeSortBtn,
            ]}
            onPress={() => setSortBy('attendance')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortBy === 'attendance' && styles.activeSortBtnText,
              ]}
            >
              By Attendance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortBtn,
              sortBy === 'marks' && styles.activeSortBtn,
            ]}
            onPress={() => setSortBy('marks')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortBy === 'marks' && styles.activeSortBtnText,
              ]}
            >
              By Marks
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Course Rank Cards */}
      {sortedCourses.map((c, index) => (
        <TouchableOpacity
          key={c.id}
          style={styles.courseRankCard}
          onPress={() => onOpenCourse(c)}
          activeOpacity={0.7}
        >
          <View style={styles.rankBadge}>
            <Text style={styles.rankNumber}>#{index + 1}</Text>
          </View>

          <View style={styles.rankContent}>
            <View style={styles.rankTitleRow}>
              <Text style={styles.rankCourseCode}>{c.code}</Text>
              <Text style={[styles.rankScore, { color: c.status.color }]}>
                {sortBy === 'attendance' ? `${c.attendance}% Att.` : `${c.marks}% Marks`}
              </Text>
            </View>
            <Text style={styles.rankCourseName} numberOfLines={1}>
              {c.name}
            </Text>
            <View style={styles.rankBottomRow}>
              <Text style={styles.rankDetails}>
                {c.attended}/{c.totalClasses} Classes · {c.marks}% Marks
              </Text>
              <Text style={styles.simulateLink}>Simulate →</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  introHeader: {
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.3,
  },
  introSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  highlightCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  recoveryCard: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  iconCapsule: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  cardIcon: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  insightMainText: {
    fontSize: 14,
    color: THEME.colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
    fontWeight: '500',
  },
  insightDetailText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  highlightCyan: {
    fontWeight: '800',
    color: THEME.colors.accentCyan,
  },
  recoveryMessage: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 19,
    marginBottom: 12,
  },
  boldWhite: {
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  boldCyan: {
    fontWeight: '800',
    color: THEME.colors.accentCyan,
  },
  boldGreen: {
    fontWeight: '800',
    color: THEME.colors.healthy,
  },
  boldRose: {
    fontWeight: '800',
    color: THEME.colors.critical,
  },
  recoveryProgressBox: {
    backgroundColor: THEME.colors.canvasAlt,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  recRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  recValue: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.healthy,
  },
  prioritySectionHeader: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 1,
    marginBottom: 10,
  },
  sortToggleRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sortBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 9,
    alignItems: 'center',
  },
  activeSortBtn: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
  },
  sortBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  activeSortBtnText: {
    color: THEME.colors.textPrimary,
    fontWeight: '800',
  },
  courseRankCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
  },
  rankBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: THEME.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '900',
    color: THEME.colors.accentCyan,
  },
  rankContent: {
    flex: 1,
  },
  rankTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankCourseCode: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  rankScore: {
    fontSize: 13,
    fontWeight: '800',
  },
  rankCourseName: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginVertical: 2,
  },
  rankBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  rankDetails: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  simulateLink: {
    fontSize: 11,
    color: THEME.colors.primaryLight,
    fontWeight: '700',
  },
});
