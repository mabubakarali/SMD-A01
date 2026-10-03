import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { THEME } from '../constants/theme';

export default function AuthScreen({ onLogin }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!username.trim()) {
      setError('Please enter your Student ID or Username');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setError('');
    const studentName = isSignUp ? fullName.trim() : username.trim() || 'John Doe';
    onLogin(studentName);
  };

  const handleQuickDemoLogin = () => {
    setError('');
    onLogin('John Doe');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cardWrapper, isDesktop ? styles.cardRow : styles.cardCol]}>
          {/* Left Side: Dark Auth Form */}
          <View style={[styles.leftFormPanel, isDesktop && styles.halfWidth]}>
            <View style={styles.formHeader}>
              <View style={styles.brandCapsule}>
                <Text style={styles.brandIcon}>🎓</Text>
                <Text style={styles.brandName}>FLEX Companion</Text>
              </View>
              <Text style={styles.loginHeading}>
                {isSignUp ? 'Sign Up' : 'Login'}
              </Text>
              <Text style={styles.loginSub}>
                {isSignUp
                  ? 'Create your university student profile'
                  : 'Enter your account details'}
              </Text>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            {isSignUp && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#64748B"
                  value={fullName}
                  onChangeText={(t) => {
                    setFullName(t);
                    setError('');
                  }}
                />
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Username / Student ID</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 21K-0452 or john.doe"
                placeholderTextColor="#64748B"
                autoCapitalize="none"
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  setError('');
                }}
              />
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.passwordRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                {!isSignUp && (
                  <TouchableOpacity onPress={handleQuickDemoLogin}>
                    <Text style={styles.forgotPass}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="••••••••"
                  placeholderTextColor="#64748B"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    setError('');
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🔒'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Vibrant Purple Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.loginButtonText}>
                {isSignUp ? 'Create Account' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Quick Demo Access Button */}
            <TouchableOpacity
              style={styles.demoLoginBtn}
              onPress={handleQuickDemoLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.demoLoginText}>⚡ Quick Student Demo (John Doe)</Text>
            </TouchableOpacity>

            {/* Switch between Login and Signup */}
            <View style={styles.switchAuthRow}>
              <Text style={styles.switchAuthText}>
                {isSignUp
                  ? 'Already have an account? '
                  : "Don't have an account? "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
              >
                <Text style={styles.switchAuthLink}>
                  {isSignUp ? 'Login' : 'Sign up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Side: Seamless Vibrant Purple Panel (100% Native Vector Graphic) */}
          <View style={[styles.rightHeroPanel, isDesktop && styles.halfWidth]}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Welcome to{'\n'}student portal</Text>
              <Text style={styles.heroSubtitle}>
                Login to access your academic control center, courses, and warnings
              </Text>
            </View>

            {/* Seamless Native Visual Graphic Composition */}
            <View style={styles.graphicCenterpiece}>
              {/* Central Glowing Shield / Cap */}
              <View style={styles.glowingCapCircle}>
                <Text style={styles.giantCapEmoji}>🎓</Text>
              </View>

              {/* Floating Live Feature Cards */}
              <View style={[styles.floatingCard, styles.cardTopLeft]}>
                <Text style={styles.cardEmoji}>📚</Text>
                <View>
                  <Text style={styles.cardBoldText}>5 Enrolled</Text>
                  <Text style={styles.cardLightText}>Active Courses</Text>
                </View>
              </View>

              <View style={[styles.floatingCard, styles.cardTopRight]}>
                <Text style={styles.cardEmoji}>📈</Text>
                <View>
                  <Text style={styles.cardBoldText}>80% Quota</Text>
                  <Text style={styles.cardLightText}>Attendance Safe</Text>
                </View>
              </View>

              <View style={[styles.floatingCard, styles.cardBottom]}>
                <Text style={styles.cardEmoji}>⚡</Text>
                <View>
                  <Text style={styles.cardBoldText}>Instant Warnings</Text>
                  <Text style={styles.cardLightText}>Live Simulation Engine</Text>
                </View>
              </View>
            </View>

            {/* Bottom Footer Note */}
            <View style={styles.heroFooter}>
              <View style={styles.greenPulseDot} />
              <Text style={styles.heroFooterText}>Portal System Online · FAST-NUCES</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07080F',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 960,
    backgroundColor: '#12131C',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardCol: {
    flexDirection: 'column-reverse',
  },
  halfWidth: {
    flex: 1,
  },
  leftFormPanel: {
    padding: 36,
    justifyContent: 'center',
    backgroundColor: '#12131C',
  },
  formHeader: {
    marginBottom: 24,
  },
  brandCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  brandIcon: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 0.5,
  },
  loginHeading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  loginSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  errorBox: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F43F5E',
    marginBottom: 16,
  },
  errorText: {
    color: '#FDA4AF',
    fontSize: 12,
    fontWeight: '700',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 6,
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotPass: {
    fontSize: 11,
    color: '#A78BFA',
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#1C1D2A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2E42',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1D2A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2E42',
  },
  passwordTextInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeToggle: {
    paddingHorizontal: 14,
  },
  eyeIcon: {
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#8A4BF3',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#8A4BF3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  demoLoginBtn: {
    backgroundColor: 'rgba(138, 75, 243, 0.12)',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 75, 243, 0.35)',
  },
  demoLoginText: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '700',
  },
  switchAuthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  switchAuthText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  switchAuthLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#A78BFA',
  },
  rightHeroPanel: {
    backgroundColor: '#8A4BF3',
    padding: 36,
    justifyContent: 'space-between',
    minHeight: 460,
  },
  heroTextContainer: {
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 320,
  },
  graphicCenterpiece: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    position: 'relative',
  },
  glowingCapCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  giantCapEmoji: {
    fontSize: 54,
  },
  floatingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  cardTopRight: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  cardBottom: {
    marginTop: 18,
  },
  cardEmoji: {
    fontSize: 18,
  },
  cardBoldText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  cardLightText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  heroFooterText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
});
