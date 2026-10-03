import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { THEME } from '../constants/theme';
import {
  calculateAttendance,
  calculateOverallAttendance,
  calculateAverageMarks,
  getCoursesNeedingAttention,
  generateWarnings,
  getAttendanceStatus,
} from '../utils/calculations';

export default function DashboardView({
  studentName = 'John Doe',
  courses,
  tasks,
  onNavigate,
  onToggleTask,
  onOpenCourse,
}) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  // Real-time calculated state
  const overallAttendance = calculateOverallAttendance(courses);
  const avgMarks = calculateAverageMarks(courses);
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const attentionCourses = getCoursesNeedingAttention(courses);
  const warnings = generateWarnings(courses, tasks);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const chartWidth = isWide ? Math.min(width * 0.42, 480) : Math.min(width - 64, 420);

  const barChartData = {
    labels: courses.map((c) => c.code),
    datasets: [
      {
        data: courses.map((c) =>
          calculateAttendance(c.attended, c.totalClasses)
        ),
      },
    ],
  };

  const highPriorityCount = pendingTasks.filter((t) => t.priority === 'High').length;
  const normalCount = pendingTasks.length - highPriorityCount;
  const completedCount = completedTasks.length;

  const pieChartData = [
    {
      name: 'High Priority',
      population: highPriorityCount,
      color: '#F43F5E',
      legendFontColor: '#94A3B8',
      legendFontSize: 12,
    },
    {
      name: 'Standard',
      population: normalCount,
      color: '#8A4BF3',
      legendFontColor: '#94A3B8',
      legendFontSize: 12,
    },
    {
      name: 'Completed',
      population: completedCount,
      color: '#10B981',
      legendFontColor: '#94A3B8',
      legendFontSize: 12,
    },
  ].filter((item) => item.population > 0);

  const chartConfig = {
    backgroundColor: '#141522',
    backgroundGradientFrom: '#141522',
    backgroundGradientTo: '#141522',
    fillShadowGradientFrom: '#8A4BF3',
    fillShadowGradientTo: '#A78BFA',
    fillShadowGradientOpacity: 0.95,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(167, 139, 250, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '4',
      stroke: 'rgba(255, 255, 255, 0.08)',
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Purple Hero Welcome Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.bannerLeftContent}>
          <View style={styles.bannerBadgeRow}>
            <Text style={styles.bannerDateText}>{formattedDate}</Text>
            <View style={styles.semesterBadge}>
              <Text style={styles.semesterBadgeText}>Semester 6</Text>
            </View>
          </View>
          <Text style={styles.bannerHeading}>
            Welcome back, {studentName.split(' ')[0]}!
          </Text>
          <Text style={styles.bannerSubheading}>
            Always stay updated in your student portal
          </Text>
        </View>

        {/* Seamless Banner Graphic Capsule */}
        <View style={styles.bannerGraphicCapsule}>
          <View style={styles.glowingBadgeCircle}>
            <Text style={styles.glowingCapEmoji}>🎓</Text>
          </View>
          <View style={styles.onlinePill}>
            <View style={styles.greenDot} />
            <Text style={styles.onlinePillText}>Live Portal</Text>
          </View>
        </View>
      </View>

      {/* 2. Top Metric Cards (Dark Theme) */}
      <View style={styles.sectionTitleBlock}>
        <Text style={styles.sectionMainTitle}>Academic Standing</Text>
      </View>

      <View style={[styles.financeRow, isWide ? styles.rowWrap : styles.colWrap]}>
        {/* Card 1: Total Tuition */}
        <View style={styles.financeCard}>
          <View style={styles.financeIconWrapper}>
            <Text style={styles.financeIcon}>🪙</Text>
          </View>
          <Text style={styles.financeAmount}>$ 10,000</Text>
          <Text style={styles.financeLabel}>Semester Tuition</Text>
        </View>

        {/* Card 2: Overall Attendance (Highlighted Purple Border) */}
        <View style={[styles.financeCard, styles.highlightedCard]}>
          <View style={[styles.financeIconWrapper, { backgroundColor: 'rgba(138, 75, 243, 0.18)' }]}>
            <Text style={styles.financeIcon}>🎓</Text>
          </View>
          <Text style={[styles.financeAmount, { color: '#A78BFA' }]}>
            {overallAttendance}%
          </Text>
          <Text style={styles.financeLabel}>Overall Attendance</Text>
        </View>

        {/* Card 3: Average Marks */}
        <View style={styles.financeCard}>
          <View style={styles.financeIconWrapper}>
            <Text style={styles.financeIcon}>📊</Text>
          </View>
          <Text style={styles.financeAmount}>{avgMarks}%</Text>
          <Text style={styles.financeLabel}>Average Marks</Text>
        </View>
      </View>

      {/* 3. Middle Section: Enrolled Courses & Daily Notices (No Instructors section) */}
      <View style={[styles.middleGrid, isWide ? styles.twoColLayout : styles.singleColLayout]}>
        {/* Left Column: Enrolled Courses */}
        <View style={styles.leftCol}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionMainTitle}>Enrolled Courses</Text>
            <TouchableOpacity onPress={() => onNavigate('courses')}>
              <Text style={styles.seeAllLink}>See all ({courses.length})</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesGrid}>
            {courses.slice(0, 4).map((course, idx) => {
              const att = calculateAttendance(course.attended, course.totalClasses);
              const status = getAttendanceStatus(att);
              const isFirst = idx === 0;

              return (
                <View
                  key={course.id}
                  style={[
                    styles.enrolledCourseCard,
                    isFirst ? styles.lilacCourseCard : styles.blueCourseCard,
                  ]}
                >
                  <View style={styles.courseCardHeader}>
                    <View style={styles.courseTitleCol}>
                      <View style={styles.codeCapsule}>
                        <Text style={styles.codeText}>{course.code}</Text>
                      </View>
                      <Text style={styles.enrolledCourseTitle} numberOfLines={2}>
                        {course.name}
                      </Text>
                      <Text style={styles.instructorText}>👤 {course.instructor}</Text>
                    </View>

                    <View style={styles.laptopIconCapsule}>
                      <Text style={styles.laptopEmoji}>{isFirst ? '💻' : '📊'}</Text>
                    </View>
                  </View>

                  <View style={styles.courseCardFooter}>
                    <TouchableOpacity
                      style={styles.purpleViewBtn}
                      onPress={() => onOpenCourse(course)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.purpleViewBtnText}>View & Simulate</Text>
                    </TouchableOpacity>

                    <View style={[styles.attBadge, { backgroundColor: status.bgColor }]}>
                      <Text style={[styles.attBadgeText, { color: status.color }]}>
                        {att}% Att.
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Right Column: Daily Notice & Warnings */}
        <View style={styles.rightCol}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionMainTitle}>Daily Notice & Alerts</Text>
            <TouchableOpacity onPress={() => onNavigate('insights')}>
              <Text style={styles.seeAllLink}>See all ({warnings.length})</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noticesWrapper}>
            {warnings.length > 0 ? (
              warnings.slice(0, 3).map((w) => (
                <View key={w.id} style={styles.dailyNoticeCard}>
                  <View style={styles.noticeHeader}>
                    <View style={styles.noticeTag}>
                      <Text style={styles.noticeTagText}>
                        {w.type === 'critical' ? '⚠️ High Priority' : '🔔 Notification'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.noticeTitle}>{w.title}</Text>
                  <Text style={styles.noticeDesc} numberOfLines={3}>
                    {w.message}
                  </Text>
                  <TouchableOpacity
                    onPress={() => onNavigate(w.type === 'critical' ? 'courses' : 'tasks')}
                  >
                    <Text style={styles.seeMoreLink}>View Action Details →</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.dailyNoticeCard}>
                <Text style={styles.noticeTitle}>All Clear 🎉</Text>
                <Text style={styles.noticeDesc}>
                  You have healthy attendance across all registered courses and no urgent deadlines today.
                </Text>
                <TouchableOpacity onPress={() => onNavigate('tasks')}>
                  <Text style={styles.seeMoreLink}>View Homeworks →</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 4. Required Academic Charts (Dark Cards) */}
      <View style={styles.sectionTitleBlock}>
        <Text style={styles.sectionMainTitle}>Performance Analytics</Text>
      </View>

      <View style={[styles.chartsRow, isWide ? styles.twoColLayout : styles.singleColLayout]}>
        {/* Attendance Bar Chart */}
        <View style={styles.darkChartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Course Attendance Rate</Text>
            <Text style={styles.chartSub}>Target: ≥ 75%</Text>
          </View>
          <BarChart
            data={barChartData}
            width={chartWidth}
            height={200}
            yAxisSuffix="%"
            yAxisLabel=""
            fromZero={true}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showValuesOnTopOfBars={true}
            style={styles.chartStyle}
          />
        </View>

        {/* Task Workload Pie Chart */}
        <View style={styles.darkChartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Tasks & Homework Breakdown</Text>
            <Text style={styles.chartSub}>{tasks.length} Tracked</Text>
          </View>
          {pieChartData.length > 0 ? (
            <PieChart
              data={pieChartData}
              width={chartWidth}
              height={180}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute={false}
            />
          ) : (
            <Text style={styles.noDataText}>No tasks created yet.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C14',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 50,
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8A4BF3',
    borderRadius: 24,
    padding: 28,
    marginBottom: 28,
    overflow: 'hidden',
    shadowColor: '#8A4BF3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  bannerLeftContent: {
    flex: 1,
    paddingRight: 16,
  },
  bannerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bannerDateText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  semesterBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  semesterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  bannerHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  bannerSubheading: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  bannerGraphicCapsule: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  glowingBadgeCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  glowingCapEmoji: {
    fontSize: 34,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 5,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  onlinePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitleBlock: {
    marginBottom: 12,
  },
  sectionMainTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  financeRow: {
    gap: 16,
    marginBottom: 28,
  },
  rowWrap: {
    flexDirection: 'row',
  },
  colWrap: {
    flexDirection: 'column',
  },
  financeCard: {
    flex: 1,
    backgroundColor: '#141522',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  highlightedCard: {
    borderColor: '#8A4BF3',
    borderWidth: 2,
  },
  financeIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1D2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  financeIcon: {
    fontSize: 24,
  },
  financeAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  financeLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  middleGrid: {
    gap: 24,
    marginBottom: 28,
  },
  twoColLayout: {
    flexDirection: 'row',
  },
  singleColLayout: {
    flexDirection: 'column',
  },
  leftCol: {
    flex: 1.4,
  },
  rightCol: {
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  seeAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A78BFA',
  },
  coursesGrid: {
    gap: 14,
  },
  enrolledCourseCard: {
    backgroundColor: '#141522',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  lilacCourseCard: {
    borderColor: 'rgba(138, 75, 243, 0.45)',
  },
  blueCourseCard: {
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  courseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  courseTitleCol: {
    flex: 1,
  },
  codeCapsule: {
    alignSelf: 'flex-start',
    backgroundColor: '#1C1D2E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A78BFA',
  },
  enrolledCourseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  instructorText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  laptopIconCapsule: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1C1D2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  laptopEmoji: {
    fontSize: 18,
  },
  courseCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12,
  },
  purpleViewBtn: {
    backgroundColor: '#8A4BF3',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
  },
  purpleViewBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  attBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  attBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  noticesWrapper: {
    gap: 12,
  },
  dailyNoticeCard: {
    backgroundColor: '#141522',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  noticeHeader: {
    marginBottom: 6,
  },
  noticeTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  noticeTagText: {
    color: '#FDA4AF',
    fontSize: 10,
    fontWeight: '800',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  noticeDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 17,
    marginBottom: 8,
  },
  seeMoreLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A78BFA',
  },
  chartsRow: {
    gap: 16,
  },
  darkChartCard: {
    flex: 1,
    backgroundColor: '#141522',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  chartHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  chartSub: {
    fontSize: 11,
    color: '#A78BFA',
    fontWeight: '700',
  },
  chartStyle: {
    borderRadius: 16,
  },
  noDataText: {
    color: '#94A3B8',
    fontSize: 13,
    paddingVertical: 20,
  },
});
