import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { THEME } from '../constants/theme';

export default function AddTaskModal({ visible, courses = [], onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(
    courses.length > 0 ? courses[0].code : 'SMD'
  );
  const [dueDate, setDueDate] = useState('2026-10-08');
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Task title is required.';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters.';
    }

    if (!selectedCourse) {
      errs.course = 'Please select a course.';
    }

    if (!dueDate.trim()) {
      errs.dueDate = 'Due date is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate.trim())) {
      errs.dueDate = 'Use format YYYY-MM-DD (e.g. 2026-10-15)';
    }

    if (!priority) {
      errs.priority = 'Please select a priority.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      course: selectedCourse,
      dueDate: dueDate.trim(),
      priority,
      completed: false,
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setDueDate('2026-10-08');
    setPriority('Medium');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>New Academic Task</Text>
              <Text style={styles.headerSubtitle}>
                Add deadlines, assignments, or lab deliverables
              </Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Task Title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Task Description *</Text>
              <TextInput
                style={[styles.input, errors.title ? styles.inputError : null]}
                placeholder="e.g. Lab 4 Buffer Overflow Report"
                placeholderTextColor={THEME.colors.textMuted}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                }}
              />
              {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
            </View>

            {/* Course Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Registered Course *</Text>
              <View style={styles.chipRow}>
                {courses.map((c) => {
                  const isSelected = selectedCourse === c.code;
                  return (
                    <TouchableOpacity
                      key={c.id}
                      style={[styles.courseChip, isSelected && styles.activeCourseChip]}
                      onPress={() => {
                        setSelectedCourse(c.code);
                        if (errors.course) setErrors((prev) => ({ ...prev, course: null }));
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.courseChipText,
                          isSelected && styles.activeCourseChipText,
                        ]}
                      >
                        {c.code}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.course ? (
                <Text style={styles.errorText}>{errors.course}</Text>
              ) : null}
            </View>

            {/* Due Date */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Submission Deadline (YYYY-MM-DD) *</Text>
              <TextInput
                style={[styles.input, errors.dueDate ? styles.inputError : null]}
                placeholder="2026-10-15"
                placeholderTextColor={THEME.colors.textMuted}
                value={dueDate}
                onChangeText={(text) => {
                  setDueDate(text);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                maxLength={10}
              />
              {errors.dueDate ? (
                <Text style={styles.errorText}>{errors.dueDate}</Text>
              ) : null}
            </View>

            {/* Priority Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Priority Level *</Text>
              <View style={styles.priorityRow}>
                {['Low', 'Medium', 'High'].map((p) => {
                  const isSelected = priority === p;
                  return (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.priorityBtn,
                        isSelected && styles.activePriorityBtn,
                        isSelected && p === 'High' && styles.highPriorityActive,
                        isSelected && p === 'Medium' && styles.mediumPriorityActive,
                        isSelected && p === 'Low' && styles.lowPriorityActive,
                      ]}
                      onPress={() => setPriority(p)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.priorityBtnText,
                          isSelected && styles.activePriorityBtnText,
                        ]}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.priority ? (
                <Text style={styles.errorText}>{errors.priority}</Text>
              ) : null}
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Create Task</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 17, 0.85)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: THEME.colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: THEME.colors.borderMedium,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: THEME.colors.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: THEME.colors.canvasAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.borderMedium,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: THEME.colors.textPrimary,
    fontSize: 14,
  },
  inputError: {
    borderColor: THEME.colors.critical,
  },
  errorText: {
    color: THEME.colors.critical,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: THEME.colors.canvasAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  activeCourseChip: {
    backgroundColor: THEME.colors.primaryGlow,
    borderColor: THEME.colors.primary,
  },
  courseChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  activeCourseChipText: {
    color: THEME.colors.accentCyan,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: THEME.colors.canvasAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  activePriorityBtn: {
    borderWidth: 1.5,
  },
  highPriorityActive: {
    borderColor: THEME.colors.critical,
    backgroundColor: THEME.colors.criticalBg,
  },
  mediumPriorityActive: {
    borderColor: THEME.colors.watch,
    backgroundColor: THEME.colors.watchBg,
  },
  lowPriorityActive: {
    borderColor: THEME.colors.accentCyan,
    backgroundColor: THEME.colors.accentCyanGlow,
  },
  priorityBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  activePriorityBtnText: {
    color: THEME.colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: THEME.colors.surfaceElevated,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  cancelButtonText: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
