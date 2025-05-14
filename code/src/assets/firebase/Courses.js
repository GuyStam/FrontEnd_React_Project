// src/assets/firebase/Courses.js
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { firestore } from "./config";

const COL = "Courses";

const seedCourses = [
  { courseName: "Database Systems", lecturer: "Dr. Cohen", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 85 } },
  { courseName: "Network Fundamentals", lecturer: "Prof. Levy", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 78 } },
  { courseName: "Information Security", lecturer: "Dr. Bar", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 90 } },
  { courseName: "Web Development", lecturer: "Ms. Mor", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 88 } },
  { courseName: "ERP Systems", lecturer: "Mr. Yaron", year: 2025, semester: "Summer", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 82 } }
];

// הוספת קורס חדש
export async function addCourses(course) {
  return addDoc(collection(firestore, COL), {
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: Number(course.year),
    semester: course.semester,
    nextClass: course.nextClass,
    nextAssignment: course.nextAssignment,
    grades: {
      finalAverage: Number(course.grades.finalAverage)
    }
  });
}

// טעינת כל הקורסים
export async function listCourses() {
  const snapshot = await getDocs(collection(firestore, COL));
  if (snapshot.empty) {
    for (let c of seedCourses) {
      await addCourses(c);
    }
    const newSnap = await getDocs(collection(firestore, COL));
    return newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// שליפת קורס יחיד לפי ID
export async function getCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  const snap = await getDoc(courseRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// עדכון קורס לפי ID
export async function updateCourse(courseId, newData) {
  const courseRef = doc(firestore, COL, courseId);
  return updateDoc(courseRef, newData);
}

// מחיקת קורס לפי ID
export async function deleteCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  return deleteDoc(courseRef);
}
