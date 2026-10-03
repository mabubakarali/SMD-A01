# FLEX Companion ⚡

**Personal Academic Control Center & Early Warning System for University Students**

*Developed for Software for Mobile Devices (SMD) — Assignment 1*

---

## 🎯 Problem Statement

Traditional university portals (such as FLEX) provide raw academic data—grades, attendance logs, and registered course tables. However, students frequently face critical challenges interpreting this raw data:

1. **Lack of Proactive Warnings:** Students often discover their attendance has dropped below the mandatory 75% threshold when it is already too late.
2. **Fragmented Workload Awareness:** Upcoming assignment deadlines and lab submissions are separated from course performance metrics.
3. **No Forward Simulation:** Students cannot easily determine how many future classes they must attend to recover from low attendance.
4. **Information Overload:** Portals present tabular data without highlighting what requires immediate attention.

## 💡 Proposed Solution

**FLEX Companion** is not a cosmetic FLEX clone. It is an intelligent **academic control center** built on a single core philosophy:

> *"Don't just show me my academic data. Tell me what needs my attention."*

FLEX Companion aggregates course attendance, marks, and assignment deadlines into live actionable intelligence—featuring dynamic risk warnings, visual charts, what-if attendance projection simulation, and priority-ranked recovery plans.

---

## ✨ Key Features

### 1. 📊 Executive Dashboard
* **Dynamic Metric Cards:** Live calculation of Overall Attendance, Average Marks, Pending Task count, and Critical Attention courses.
* **Priority Action Items (Early Warning System):** Real-time warning banners alerting students to attendance deficits and low-scoring courses.
* **Attendance Bar Chart:** Visualizes attendance percentages across all registered courses against the university threshold using `react-native-chart-kit`.
* **Task Workload Pie Chart:** Categorizes tasks into High Priority, Normal Pending, and Completed.
* **Upcoming Deadlines Preview:** Quick access to the most urgent deliverables with one-tap completion.

### 2. 📚 Courses Management & Simulation
* **Live Search & Filter:** Instant search by course code (e.g. `SMD`), course name, or instructor name, plus dynamic status filters (`All`, `Healthy`, `Watch`, `Low`).
* **Dynamic Status Badging:** Automatically marks courses as **Healthy** (≥ 85%), **Watch** (75%–84%), or **Low Attendance** (< 75%).
* **Interactive Attendance Tracker:** Tap any course to simulate attending (+1 attended, +1 total) or missing (+1 total) a class, updating the entire application in real time.
* **🔮 What-If Attendance Projection Simulator:** Input any number of upcoming classes to project future attendance percentage before attending them.

### 3. 📝 Tasks & Deadline Manager
* **Full Task Management:** Add, complete, uncomplete, and delete assignments and lab tasks.
* **Interactive Add Task Form:** Built-in form with real-time field validation (Title, Course selector, Due Date format `YYYY-MM-DD`, and Priority).
* **Dynamic Filters:** Filter by `All`, `Pending`, `Completed`, and `High Priority` with live count badges.
* **Contextual Empty States:** Clean visual feedback when no tasks match a selected filter.

### 4. 💡 Academic Intelligence & Insights
* **Attendance Focus:** Highlights the lowest attendance course and required recovery targets.
* **Attendance Recovery Plan:** Computes the exact attendance boost gained from attending the next 3 consecutive classes.
* **Top Academic Strength:** Recognizes top-scoring courses and instructors.
* **Priority Ranking (Sortable):** Sort courses by lowest attendance first (for risk mitigation) or highest marks first (for grade tracking).

---

## ⚛️ React & JavaScript Concepts Demonstrated

### React Fundamentals
* **Functional Components & Reusability:** Modular architecture with clean components (`Header`, `ViewSwitcher`, `StatCard`, `CourseCard`, `TaskCard`, `ProgressBar`, `ChartCard`, `EmptyState`, etc.).
* **State Management (`useState`):** Centralized state lifted to `App.js` for courses, tasks, active view, and modal overlays.
* **Props & Callbacks:** Data passed down from parent to child; state mutations triggered via upward callback functions (`handleAttendClass`, `handleToggleTask`, `handleAddTask`).
* **Conditional Rendering:** Clean tab switching without third-party navigation (`currentView === 'dashboard' && <DashboardView />`), dynamic empty states, and modal visibility.
* **Controlled Form Inputs:** Real-time form state and error validation for new tasks and projection inputs.

### JavaScript Core Capabilities
* **Array Methods:**
  * `map()`: Rendering course lists, task cards, chart labels, and filter chips.
  * `filter()`: Searching courses, applying status filters, identifying pending/completed tasks.
  * `reduce()`: Calculating overall attendance and average marks across all courses.
  * `sort()`: Ranking courses by attendance ascending or marks descending.
* **Derived State:** Computing percentages and warning lists directly during render cycles, avoiding redundant state synchronization.
* **Robust Edge-Case Handling:** Safe division handling in `calculateAttendance` to prevent `NaN` when `totalClasses === 0`.

---

## 📈 Charts Implementation

The application leverages `react-native-chart-kit` and `react-native-svg` for data visualization:

1. **Bar Chart (`BarChart`):** Plots attendance percentage per course. Data is dynamically mapped from `courses` state:
   ```javascript
   const barChartData = {
     labels: courses.map((c) => c.code),
     datasets: [{ data: courses.map((c) => calculateAttendance(c.attended, c.totalClasses)) }]
   };
   ```
2. **Pie Chart (`PieChart`):** Displays distribution of tasks across High Priority, Normal Pending, and Completed states.

---

## 📱 Navigation Architecture

In accordance with assignment guidelines:
* **No bottom navigation bar**
* **No side drawer navigation**
* **No external navigation dependencies (e.g. React Navigation)**
* View switching is managed entirely via a state-driven segmented control (`currentView`: `'dashboard' | 'courses' | 'tasks' | 'insights'`).

---

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
* **Language:** JavaScript (ES6+)
* **Charts:** `react-native-chart-kit` & `react-native-svg`
* **Styling:** React Native `StyleSheet` with centralized dark theme constants (`constants/theme.js`)

---

## 🚀 Setup & Execution Guide

### Prerequisites
* Node.js (v18 or newer recommended)
* npm

### Installation & Launch Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on target platform:**
   * **Android Device/Emulator:** Press `a` in terminal or run `npm run android`
   * **iOS Simulator (macOS only):** Press `i` in terminal or run `npm run ios`
   * **Expo Go App:** Scan the displayed QR code with your Android phone or iOS Camera app.
   * **Web Browser (preview):** Press `w` in terminal or run `npm run web`

---

## 🤖 Academic AI Usage Disclosure

In compliance with academic integrity guidelines, AI assistance (Claude / Gemini) was utilized during the development of this assignment for:
* Brainstorming architectural patterns adhering to assignment constraints (state-based view switching).
* Generating initial boilerplate for UI component styling and charting configurations.
* Refactoring calculation utilities for safe mathematical operations and edge cases.

All code has been thoroughly reviewed, understood, validated, and structured for live demonstration during the viva examination.
