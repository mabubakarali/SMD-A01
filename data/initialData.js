// Initial realistic static academic datasets for FLEX Companion
// Data is stored as clean JavaScript arrays and objects.

export const initialCourses = [
  {
    id: "1",
    code: "SMD",
    name: "Software for Mobile Devices",
    instructor: "Dr. Ahmed",
    attended: 18,
    totalClasses: 22,
    marks: 84,
    creditHours: 3
  },
  {
    id: "2",
    code: "INFOSEC",
    name: "Information Security",
    instructor: "Dr. Ali",
    attended: 15,
    totalClasses: 21,
    marks: 76,
    creditHours: 3
  },
  {
    id: "3",
    code: "GENAI",
    name: "Generative AI",
    instructor: "Dr. Hassan",
    attended: 19,
    totalClasses: 22,
    marks: 88,
    creditHours: 3
  },
  {
    id: "4",
    code: "SRE",
    name: "Software Re-Engineering",
    instructor: "Dr. Usman",
    attended: 16,
    totalClasses: 23,
    marks: 68,
    creditHours: 3
  },
  {
    id: "5",
    code: "CLOUD",
    name: "Cloud Computing Architecture",
    instructor: "Dr. Sara",
    attended: 20,
    totalClasses: 22,
    marks: 91,
    creditHours: 3
  }
];

export const initialTasks = [
  {
    id: "1",
    title: "SMD Assignment 1 - React Native App",
    course: "SMD",
    dueDate: "2026-09-30",
    priority: "High",
    completed: false
  },
  {
    id: "2",
    title: "INFOSEC Lab Quiz 3 Revision",
    course: "INFOSEC",
    dueDate: "2026-10-02",
    priority: "Medium",
    completed: false
  },
  {
    id: "3",
    title: "GENAI Prompt Engineering Report",
    course: "GENAI",
    dueDate: "2026-10-05",
    priority: "High",
    completed: false
  },
  {
    id: "4",
    title: "SRE Refactoring Case Study",
    course: "SRE",
    dueDate: "2026-09-28",
    priority: "High",
    completed: false
  },
  {
    id: "5",
    title: "CLOUD AWS Deployment Lab 2",
    course: "CLOUD",
    dueDate: "2026-09-24",
    priority: "Low",
    completed: true
  }
];
