import React from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function ProgressBar({
  progress = 0,
  color = THEME.colors.primary,
  trackColor = THEME.colors.border,
  height = 8,
}) {
  // Clamp progress percentage between 0% and 100%
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
});
