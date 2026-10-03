// Pure JavaScript utility functions for all academic calculations and derived state.
// Demonstrates array operations (reduce, filter, map, sort), math functions, and robust edge-case handling.

import { THEME } from '../constants/theme';

/**
 * Calculates attendance percentage safely.
 * Returns 0 if totalClasses is 0 to prevent division by zero (NaN).
 */
export const calculateAttendance = (attended, totalClasses) => {
  if (!totalClasses || totalClasses <= 0) return 0;
  return Math.round((attended / totalClasses) * 100);
};

/**
 * Evaluates course status based on calculated attendance percentage.
 * Uses centralized thresholds from THEME.
 */
export const getAttendanceStatus = (percentage) => {
  if (percentage >= THEME.ATTENDANCE_HEALTHY_THRESHOLD) {
    return {
      label: 'Healthy',
      color: THEME.colors.healthy,
      bgColor: THEME.colors.healthyBg,
      badgeText: 'Healthy'
    };
  }
  if (percentage >= THEME.ATTENDANCE_WARNING_THRESHOLD) {
    return {
      label: 'Watch',
      color: THEME.colors.watch,
      bgColor: THEME.colors.watchBg,
      badgeText: 'Watch'
    };
  }
  return {
    label: 'Low',
    color: THEME.colors.critical,
    bgColor: THEME.colors.criticalBg,
    badgeText: 'Low Attendance'
  };
};

/**
 * Calculates overall university attendance across all courses.
 * Total attended classes / Total conducted classes * 100
 */
export const calculateOverallAttendance = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  const totalAttended = courses.reduce((acc, curr) => acc + (curr.attended || 0), 0);
  const totalClasses = courses.reduce((acc, curr) => acc + (curr.totalClasses || 0), 0);
  
  return calculateAttendance(totalAttended, totalClasses);
};

/**
 * Calculates average marks across all registered courses.
 */
export const calculateAverageMarks = (courses) => {
  if (!courses || courses.length === 0) return 0;
  const totalMarks = courses.reduce((acc, curr) => acc + (curr.marks || 0), 0);
  return Math.round(totalMarks / courses.length);
};

/**
 * Returns courses that fall below the attendance warning threshold.
 */
export const getCoursesNeedingAttention = (courses) => {
  if (!courses) return [];
  return courses.filter(course => {
    const percentage = calculateAttendance(course.attended, course.totalClasses);
    return percentage < THEME.ATTENDANCE_WARNING_THRESHOLD;
  });
};

/**
 * Calculates projected attendance if the student attends 'futureClasses' upcoming classes.
 * Formula: (attended + futureClasses) / (totalClasses + futureClasses) * 100
 */
export const calculateProjectedAttendance = (attended, totalClasses, futureClasses) => {
  const future = parseInt(futureClasses, 10);
  if (isNaN(future) || future < 0) {
    return calculateAttendance(attended, totalClasses);
  }
  const newAttended = attended + future;
  const newTotal = totalClasses + future;
  return calculateAttendance(newAttended, newTotal);
};

/**
 * Generates dynamic academic warnings based on real-time courses and tasks data.
 */
export const generateWarnings = (courses, tasks) => {
  const warnings = [];

  // Check for courses with low attendance (< warning threshold)
  courses.forEach(course => {
    const percentage = calculateAttendance(course.attended, course.totalClasses);
    if (percentage < THEME.ATTENDANCE_WARNING_THRESHOLD) {
      warnings.push({
        id: `att-${course.id}`,
        type: 'critical',
        title: `Low Attendance Alert`,
        message: `${course.code} (${course.name}) attendance is currently ${percentage}%, below the required ${THEME.ATTENDANCE_WARNING_THRESHOLD}% threshold.`,
        courseCode: course.code,
      });
    }
  });

  // Check for course with lowest marks if marks are below 70
  if (courses.length > 0) {
    const lowestMarksCourse = [...courses].sort((a, b) => a.marks - b.marks)[0];
    if (lowestMarksCourse && lowestMarksCourse.marks < 75) {
      warnings.push({
        id: `marks-${lowestMarksCourse.id}`,
        type: 'watch',
        title: `Academic Performance Alert`,
        message: `${lowestMarksCourse.code} has your lowest score (${lowestMarksCourse.marks}%). Consider prioritizing its assignments.`,
        courseCode: lowestMarksCourse.code,
      });
    }
  }

  // Check for high-priority pending tasks
  const highPriorityPending = tasks.filter(t => !t.completed && t.priority === 'High');
  if (highPriorityPending.length > 0) {
    warnings.push({
      id: 'tasks-high',
      type: 'watch',
      title: `Upcoming High Priority Deadlines`,
      message: `You have ${highPriorityPending.length} high priority pending ${highPriorityPending.length === 1 ? 'task' : 'tasks'} requiring attention.`,
    });
  }

  return warnings;
};
