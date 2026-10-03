import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { THEME } from '../constants/theme';
import TaskCard from '../components/TaskCard';
import FilterChip from '../components/FilterChip';
import AddTaskModal from '../components/AddTaskModal';
import EmptyState from '../components/EmptyState';

export default function TasksView({
  tasks,
  courses,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Pending' | 'Completed' | 'High'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dynamic filtering using pure JavaScript array filter()
  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case 'Pending':
        return !task.completed;
      case 'Completed':
        return task.completed;
      case 'High':
        return task.priority === 'High';
      default:
        return true;
    }
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'High').length;

  const getEmptyStateMessage = () => {
    switch (activeFilter) {
      case 'Pending':
        return {
          icon: '🎉',
          title: 'No Pending Deliverables',
          message: 'Awesome work! You have completed all assignments and lab reports.',
        };
      case 'Completed':
        return {
          icon: '📝',
          title: 'No Completed Tasks Yet',
          message: 'Check off tasks as you finish them to track your academic progress.',
        };
      case 'High':
        return {
          icon: '🛡️',
          title: 'No High Priority Tasks',
          message: 'You have no urgent deliverables due right now.',
        };
      default:
        return {
          icon: '📋',
          title: 'No Tasks Found',
          message: 'Click the "+ New Task" button above to add your first deadline.',
        };
    }
  };

  const emptyInfo = getEmptyStateMessage();

  return (
    <View style={styles.container}>
      {/* Top Action Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.summaryTitle}>Academic Deliverables</Text>
          <Text style={styles.summarySubtitle}>
            {pendingCount} pending · {completedCount} completed
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonIcon}>＋</Text>
          <Text style={styles.addButtonText}>New Task</Text>
        </TouchableOpacity>
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
            count={tasks.length}
            active={activeFilter === 'All'}
            onPress={() => setActiveFilter('All')}
          />
          <FilterChip
            label="Pending"
            count={pendingCount}
            active={activeFilter === 'Pending'}
            onPress={() => setActiveFilter('Pending')}
          />
          <FilterChip
            label="Completed"
            count={completedCount}
            active={activeFilter === 'Completed'}
            onPress={() => setActiveFilter('Completed')}
          />
          <FilterChip
            label="High Priority"
            count={highPriorityCount}
            active={activeFilter === 'High'}
            onPress={() => setActiveFilter('High')}
          />
        </ScrollView>
      </View>

      {/* Task Cards List */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <EmptyState
            icon={emptyInfo.icon}
            title={emptyInfo.title}
            message={emptyInfo.message}
            actionLabel={activeFilter !== 'All' ? 'View All Tasks' : '+ Add New Task'}
            onAction={() => {
              if (activeFilter !== 'All') {
                setActiveFilter('All');
              } else {
                setIsAddModalOpen(true);
              }
            }}
          />
        )}
      </ScrollView>

      {/* Add Task Modal */}
      <AddTaskModal
        visible={isAddModalOpen}
        courses={courses}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={onAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.3,
  },
  summarySubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 5,
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
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
});
