import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { THEME } from '../constants/theme';
import CourseCard from '../components/CourseCard';
import CourseDetailModal from '../components/CourseDetailModal';
import FilterChip from '../components/FilterChip';
import EmptyState from '../components/EmptyState';
import { calculateAttendance, getAttendanceStatus } from '../utils/calculations';

export default function CoursesView({
  courses,
  onAttendClass,
  onMissClass,
  selectedCourseForDetail,
  setSelectedCourseForDetail,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Healthy' | 'Watch' | 'Low'

  // Filter and search courses dynamically using pure JavaScript array methods
  const filteredCourses = courses.filter((course) => {
    // 1. Search query match (Code, Name, or Instructor)
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      course.code.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // 2. Status category match
    if (activeFilter === 'All') return true;

    const attendance = calculateAttendance(course.attended, course.totalClasses);
    const status = getAttendanceStatus(attendance);

    return status.label === activeFilter;
  });

  // Calculate counts for filter chips
  const healthyCount = courses.filter(
    (c) =>
      getAttendanceStatus(calculateAttendance(c.attended, c.totalClasses)).label ===
      'Healthy'
  ).length;

  const watchCount = courses.filter(
    (c) =>
      getAttendanceStatus(calculateAttendance(c.attended, c.totalClasses)).label ===
      'Watch'
  ).length;

  const lowCount = courses.filter(
    (c) =>
      getAttendanceStatus(calculateAttendance(c.attended, c.totalClasses)).label ===
      'Low'
  ).length;

  const handleOpenDetail = (course) => {
    setSelectedCourseForDetail(course);
  };

  const handleCloseDetail = () => {
    setSelectedCourseForDetail(null);
  };

  const currentModalCourse = selectedCourseForDetail
    ? courses.find((c) => c.id === selectedCourseForDetail.id) || selectedCourseForDetail
    : null;

  return (
    <View style={styles.container}>
      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by course code, name or instructor..."
            placeholderTextColor={THEME.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <FilterChip
            label="All"
            count={courses.length}
            active={activeFilter === 'All'}
            onPress={() => setActiveFilter('All')}
          />
          <FilterChip
            label="Healthy"
            count={healthyCount}
            active={activeFilter === 'Healthy'}
            onPress={() => setActiveFilter('Healthy')}
          />
          <FilterChip
            label="Watch"
            count={watchCount}
            active={activeFilter === 'Watch'}
            onPress={() => setActiveFilter('Watch')}
          />
          <FilterChip
            label="Low"
            count={lowCount}
            active={activeFilter === 'Low'}
            onPress={() => setActiveFilter('Low')}
          />
        </ScrollView>
      </View>

      {/* Course Cards List */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsInfoText}>
            Showing {filteredCourses.length} of {courses.length} registered courses
          </Text>
          <Text style={styles.helperHint}>Tap card to simulate</Text>
        </View>

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={handleOpenDetail}
            />
          ))
        ) : (
          <EmptyState
            icon="🔍"
            title="No Courses Found"
            message={`No courses match "${searchQuery || activeFilter}". Try adjusting your search keyword or filters.`}
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
          />
        )}
      </ScrollView>

      {/* Course Detail & Attendance Projection Modal */}
      {currentModalCourse && (
        <CourseDetailModal
          visible={!!selectedCourseForDetail}
          course={currentModalCourse}
          onClose={handleCloseDetail}
          onAttendClass={onAttendClass}
          onMissClass={onMissClass}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    height: 46,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: THEME.colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },
  clearText: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    padding: 4,
  },
  filterBar: {
    paddingVertical: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsInfoText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  helperHint: {
    fontSize: 11,
    color: THEME.colors.accentCyan,
    fontWeight: '700',
  },
});
