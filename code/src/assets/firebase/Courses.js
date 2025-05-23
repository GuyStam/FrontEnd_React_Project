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

// שם הקולקשן
const COL = "Courses";

// קורסים התחלתיים
const seedCourses = [
  {
    courseName: "Database Systems",
    lecturer: "Dr. Cohen",
    year: 2025,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 85 }
  },
  {
    courseName: "Network Fundamentals",
    lecturer: "Prof. Levy",
    year: 2025,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 78 }
  },
  {
    courseName: "Information Security",
    lecturer: "Dr. Bar",
    year: 2025,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 90 }
  },
  {
    courseName: "Web Development",
    lecturer: "Ms. Mor",
    year: 2025,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 88 }
  },
  {
    courseName: "ERP Systems",
    lecturer: "Mr. Yaron",
    year: 2025,
    semester: "Summer",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 82 }
  }
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

// שליפת כל הקורסים
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

// שליפת קורס לפי ID
export async function getCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  const snap = await getDoc(courseRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// עדכון קורס לפי ID (מתוקן!)
export async function updateCourse(id, courseData) {
  const courseRef = doc(firestore, COL, id);
  return updateDoc(courseRef, courseData);
}

// מחיקת קורס לפי ID
export async function deleteCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  return deleteDoc(courseRef);
}
