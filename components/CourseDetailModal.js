import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { THEME } from '../constants/theme';
import ProgressBar from './ProgressBar';
import {
  calculateAttendance,
  getAttendanceStatus,
  calculateProjectedAttendance,
} from '../utils/calculations';

export default function CourseDetailModal({
  visible,
  course,
  onClose,
  onAttendClass,
  onMissClass,
}) {
  const [futureClassesInput, setFutureClassesInput] = useState('3');
  const [projectionError, setProjectionError] = useState('');

  if (!course) return null;

  const currentAttendance = calculateAttendance(course.attended, course.totalClasses);
  const status = getAttendanceStatus(currentAttendance);

  const futureClassesNum = parseInt(futureClassesInput, 10);
  const isValidProjection =
    !isNaN(futureClassesNum) && futureClassesNum >= 0 && futureClassesNum <= 50;

  const projectedAttendance = isValidProjection
    ? calculateProjectedAttendance(course.attended, course.totalClasses, futureClassesNum)
    : currentAttendance;

  const handleProjectionChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setFutureClassesInput(cleaned);

    if (cleaned === '') {
      setProjectionError('Enter number of future classes');
    } else {
      const num = parseInt(cleaned, 10);
      if (num < 0) {
        setProjectionError('Cannot be negative');
      } else if (num > 50) {
        setProjectionError('Maximum 50 future classes supported');
      } else {
        setProjectionError('');
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <View style={styles.codeRow}>
                <Text style={styles.courseCode}>{course.code}</Text>
                <View style={styles.creditBadge}>
                  <Text style={styles.creditText}>{course.creditHours} CH</Text>
                </View>
              </View>
              <Text style={styles.courseName}>{course.name}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Metadata Pills */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Instructor</Text>
                <Text style={styles.metaValue} numberOfLines={1}>{course.instructor}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Current Score</Text>
                <Text style={styles.metaValue}>{course.marks}%</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Quota Status</Text>
                <Text style={[styles.metaValue, { color: status.color }]}>{status.badgeText}</Text>
              </View>
            </View>

            {/* Attendance Analytics Box */}
            <View style={styles.attendanceBox}>
              <View style={styles.attHeaderRow}>
                <Text style={styles.boxTitle}>Attendance Breakdown</Text>
                <View style={[styles.statusBadge, { backgroundColor: status.bgColor, borderColor: status.color }]}>
                  <Text style={[styles.statusBadgeText, { color: status.color }]}>
                    {status.badgeText}
                  </Text>
                </View>
              </View>

              <View style={styles.statGrid}>
                <View style={styles.statCol}>
                  <Text style={styles.statNumber}>{course.attended}</Text>
                  <Text style={styles.statLabel}>Attended</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCol}>
                  <Text style={styles.statNumber}>{course.totalClasses}</Text>
                  <Text style={styles.statLabel}>Total Held</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCol}>
                  <Text style={[styles.statNumber, { color: status.color }]}>
                    {currentAttendance}%
                  </Text>
                  <Text style={styles.statLabel}>Current %</Text>
                </View>
              </View>

              <ProgressBar
                progress={currentAttendance}
                color={status.color}
                trackColor={THEME.colors.canvasAlt}
                height={8}
              />
            </View>

            {/* Attendance Quick Actions */}
            <View style={styles.actionSection}>
              <Text style={styles.sectionTitle}>Record Attendance</Text>
              <Text style={styles.sectionSubtitle}>
                State changes immediately update the Dashboard and Bar Chart.
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.attendBtn]}
                  onPress={() => onAttendClass(course.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnIcon}>✅</Text>
                  <Text style={styles.attendBtnText}>Attended Class (+1)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.missBtn]}
                  onPress={() => onMissClass(course.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnIcon}>❌</Text>
                  <Text style={styles.missBtnText}>Missed Class</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Attendance Projection Simulator */}
            <View style={styles.projectionSection}>
              <View style={styles.projectionHeader}>
                <Text style={styles.sectionTitle}>🔮 What-If Simulator</Text>
                <View style={styles.simBadge}>
                  <Text style={styles.simBadgeText}>Projection</Text>
                </View>
              </View>
              <Text style={styles.sectionSubtitle}>
                Calculate projected attendance if you attend upcoming consecutive lectures:
              </Text>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Future classes to attend:</Text>
                <TextInput
                  style={[
                    styles.projectionInput,
                    projectionError ? styles.inputErrorBorder : null,
                  ]}
                  value={futureClassesInput}
                  onChangeText={handleProjectionChange}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="0"
                  placeholderTextColor={THEME.colors.textMuted}
                />
              </View>

              {projectionError ? (
                <Text style={styles.errorText}>{projectionError}</Text>
              ) : null}

              {/* Quick Presets */}
              <View style={styles.presetRow}>
                {[1, 2, 3, 5, 8].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.presetBtn,
                      futureClassesInput === String(num) && styles.activePresetBtn,
                    ]}
                    onPress={() => {
                      setFutureClassesInput(String(num));
                      setProjectionError('');
                    }}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        futureClassesInput === String(num) && styles.activePresetText,
                      ]}
                    >
                      +{num} Classes
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Result Comparison Card */}
              <View style={styles.resultCard}>
                <View style={styles.resultCol}>
                  <Text style={styles.resultLabel}>Current</Text>
                  <Text style={styles.resultValue}>{currentAttendance}%</Text>
                </View>
                <Text style={styles.arrowIcon}>→</Text>
                <View style={styles.resultCol}>
                  <Text style={styles.resultLabel}>Projected Target</Text>
                  <Text
                    style={[
                      styles.resultValue,
                      {
                        color:
                          projectedAttendance >= currentAttendance
                            ? THEME.colors.healthy
                            : THEME.colors.critical,
                      },
                    ]}
                  >
                    {projectedAttendance}%
                  </Text>
                </View>
              </View>

              <Text style={styles.resultExplanation}>
                Attending next {isValidProjection ? futureClassesNum : 0} classes updates your record to{' '}
                {course.attended + (isValidProjection ? futureClassesNum : 0)}/
                {course.totalClasses + (isValidProjection ? futureClassesNum : 0)} classes.
              </Text>
            </View>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity style={styles.doneButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: THEME.colors.borderMedium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.accentCyan,
  },
  creditBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: THEME.colors.surfaceElevated,
  },
  creditText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginTop: 3,
    maxWidth: 260,
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: THEME.colors.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: 14,
    padding: 12,
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginBottom: 2,
    fontWeight: '600',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  metaDivider: {
    width: 1,
    height: '80%',
    backgroundColor: THEME.colors.border,
    alignSelf: 'center',
  },
  attendanceBox: {
    backgroundColor: THEME.colors.canvasAlt,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  attHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCol: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: THEME.colors.border,
  },
  actionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  attendBtn: {
    backgroundColor: THEME.colors.healthyBg,
    borderWidth: 1,
    borderColor: THEME.colors.healthyBorder,
  },
  attendBtnText: {
    color: THEME.colors.healthy,
    fontWeight: '800',
    fontSize: 13,
  },
  missBtn: {
    backgroundColor: THEME.colors.criticalBg,
    borderWidth: 1,
    borderColor: THEME.colors.criticalBorder,
  },
  missBtnText: {
    color: THEME.colors.critical,
    fontWeight: '800',
    fontSize: 13,
  },
  btnIcon: {
    fontSize: 14,
  },
  projectionSection: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  projectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  simBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: THEME.colors.primaryGlow,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
  },
  simBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.accentCyan,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    fontWeight: '600',
  },
  projectionInput: {
    width: 60,
    backgroundColor: THEME.colors.canvasAlt,
    borderWidth: 1,
    borderColor: THEME.colors.borderMedium,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: THEME.colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  inputErrorBorder: {
    borderColor: THEME.colors.critical,
  },
  errorText: {
    fontSize: 11,
    color: THEME.colors.critical,
    marginBottom: 6,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  presetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: THEME.colors.canvasAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  activePresetBtn: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primaryGlow,
  },
  presetText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  activePresetText: {
    color: THEME.colors.accentCyan,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.canvasAlt,
    borderRadius: 12,
    padding: 12,
    gap: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  resultCol: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginBottom: 2,
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
  },
  arrowIcon: {
    fontSize: 18,
    color: THEME.colors.textMuted,
  },
  resultExplanation: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },
  doneButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
