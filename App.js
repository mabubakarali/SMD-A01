import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// Theme, Data & Calculations
import { THEME } from './constants/theme';
import { initialCourses, initialTasks } from './data/initialData';
import { getCoursesNeedingAttention } from './utils/calculations';

// Navigation & Header Components
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import ViewSwitcher from './components/ViewSwitcher';
import CourseDetailModal from './components/CourseDetailModal';
import AuthScreen from './components/AuthScreen';

// Views
import DashboardView from './views/DashboardView';
import CoursesView from './views/CoursesView';
import TasksView from './views/TasksView';
import InsightsView from './views/InsightsView';

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [studentName, setStudentName] = useState('John Doe');

  // Application State
  const [currentView, setCurrentView] = useState('dashboard');
  const [courses, setCourses] = useState(initialCourses);
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);

  // Derived state: Alert count
  const attentionCourses = getCoursesNeedingAttention(courses);

  // Auth Handlers
  const handleLogin = (name) => {
    setStudentName(name || 'John Doe');
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Course Handlers
  const handleAttendClass = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            attended: course.attended + 1,
            totalClasses: course.totalClasses + 1,
          };
        }
        return course;
      })
    );
  };

  const handleMissClass = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            totalClasses: course.totalClasses + 1,
          };
        }
        return course;
      })
    );
  };

  const handleOpenCourse = (course) => {
    setSelectedCourseForDetail(course);
  };

  // Task Handlers
  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const activeModalCourse = selectedCourseForDetail
    ? courses.find((c) => c.id === selectedCourseForDetail.id) || selectedCourseForDetail
    : null;

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <ExpoStatusBar style="light" backgroundColor="#07080F" />
        <AuthScreen onLogin={handleLogin} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <ExpoStatusBar style="light" backgroundColor="#0B0C14" />

      <View style={[styles.mainLayout, isDesktop ? styles.rowLayout : styles.colLayout]}>
        {/* Left Purple Sidebar (Desktop) */}
        {isDesktop && (
          <Sidebar
            currentView={currentView}
            onSelectView={setCurrentView}
            onLogout={handleLogout}
          />
        )}

        {/* Right Main Portal Panel */}
        <View style={styles.rightContentPanel}>
          {/* Top Navbar */}
          <TopNavBar
            studentName={studentName}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            attentionCount={attentionCourses.length}
            onOpenNotifications={() => setCurrentView('insights')}
            isMobile={!isDesktop}
            currentView={currentView}
            onSelectView={setCurrentView}
          />

          {/* Mobile View Switcher */}
          {!isDesktop && (
            <ViewSwitcher
              currentView={currentView}
              onSelectView={setCurrentView}
            />
          )}

          {/* View Container */}
          <View style={styles.viewContentWrapper}>
            {(currentView === 'dashboard' ||
              currentView === 'schedule' ||
              currentView === 'payment' ||
              currentView === 'registration' ||
              currentView === 'notice') && (
              <DashboardView
                studentName={studentName}
                courses={courses}
                tasks={tasks}
                onNavigate={setCurrentView}
                onToggleTask={handleToggleTask}
                onOpenCourse={handleOpenCourse}
              />
            )}

            {currentView === 'courses' && (
              <CoursesView
                courses={courses}
                onAttendClass={handleAttendClass}
                onMissClass={handleMissClass}
                selectedCourseForDetail={selectedCourseForDetail}
                setSelectedCourseForDetail={setSelectedCourseForDetail}
              />
            )}

            {currentView === 'tasks' && (
              <TasksView
                tasks={tasks}
                courses={courses}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {currentView === 'insights' && (
              <InsightsView
                courses={courses}
                tasks={tasks}
                onOpenCourse={handleOpenCourse}
              />
            )}
          </View>
        </View>
      </View>

      {/* Global Course Detail & Projection Modal */}
      {activeModalCourse && (
        <CourseDetailModal
          visible={!!selectedCourseForDetail}
          course={activeModalCourse}
          onClose={() => setSelectedCourseForDetail(null)}
          onAttendClass={handleAttendClass}
          onMissClass={handleMissClass}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: '#07080F',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#0B0C14',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainLayout: {
    flex: 1,
    backgroundColor: '#0B0C14',
  },
  rowLayout: {
    flexDirection: 'row',
  },
  colLayout: {
    flexDirection: 'column',
  },
  rightContentPanel: {
    flex: 1,
    backgroundColor: '#0B0C14',
  },
  viewContentWrapper: {
    flex: 1,
    backgroundColor: '#0B0C14',
  },
});
