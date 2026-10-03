import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const isCompleted = task.completed;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return {
          color: THEME.colors.priorityHigh,
          bgColor: THEME.colors.criticalBg,
          borderColor: THEME.colors.criticalBorder,
        };
      case 'Medium':
        return {
          color: THEME.colors.priorityMedium,
          bgColor: THEME.colors.watchBg,
          borderColor: THEME.colors.watchBorder,
        };
      default:
        return {
          color: THEME.colors.priorityLow,
          bgColor: THEME.colors.primaryGlow,
          borderColor: 'rgba(56, 189, 248, 0.25)',
        };
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);

  return (
    <View style={[styles.card, isCompleted && styles.completedCard]}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checkedBox]}
        onPress={() => onToggleComplete(task.id)}
        activeOpacity={0.7}
      >
        {isCompleted ? <Text style={styles.checkIcon}>✓</Text> : null}
      </TouchableOpacity>

      {/* Task Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, isCompleted && styles.completedTitle]}
          numberOfLines={2}
        >
          {task.title}
        </Text>

        <View style={styles.badgeRow}>
          {/* Course Badge */}
          <View style={styles.courseBadge}>
            <Text style={styles.courseText}>{task.course}</Text>
          </View>

          {/* Priority Badge */}
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: priorityStyle.bgColor,
                borderColor: priorityStyle.borderColor,
              },
            ]}
          >
            <Text style={[styles.priorityText, { color: priorityStyle.color }]}>
              {task.priority}
            </Text>
          </View>

          {/* Due Date */}
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>📅 {task.dueDate}</Text>
          </View>
        </View>
      </View>

      {/* Delete button */}
      {onDelete ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  completedCard: {
    opacity: 0.55,
    backgroundColor: THEME.colors.surfaceElevated,
    borderColor: 'transparent',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: THEME.colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: THEME.colors.healthy,
    borderColor: THEME.colors.healthy,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: THEME.colors.textMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  courseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  courseText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.accentCyan,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  dateBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dateText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 6,
    marginLeft: 6,
  },
  deleteText: {
    fontSize: 13,
  },
});
