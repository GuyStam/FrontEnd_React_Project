import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./config";

const COL = "Courses";

// ✅ 10 קורסים התחלתיים
const seedCourses = [
  {
    courseName: "Introduction to Information Systems",
    lecturer: "Dr. Cohen",
    year: 2023,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 85 },
  },
  {
    courseName: "Microeconomics",
    lecturer: "Prof. Levi",
    year: 2023,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 78 },
  },
  {
    courseName: "Business Statistics",
    lecturer: "Dr. Shapiro",
    year: 2024,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 88 },
  },
  {
    courseName: "Database Systems",
    lecturer: "Ms. Mor",
    year: 2024,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 91 },
  },
  {
    courseName: "Marketing Principles",
    lecturer: "Mr. Yaron",
    year: 2025,
    semester: "Summer",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 80 },
  },
  {
    courseName: "Financial Accounting",
    lecturer: "Dr. Bar",
    year: 2025,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 86 },
  },
  {
    courseName: "Network Fundamentals",
    lecturer: "Ms. Tal",
    year: 2025,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 82 },
  },
  {
    courseName: "Project Management",
    lecturer: "Prof. Alon",
    year: 2026,
    semester: "A",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 89 },
  },
  {
    courseName: "ERP Systems",
    lecturer: "Dr. Regev",
    year: 2026,
    semester: "B",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 84 },
  },
  {
    courseName: "E-Business",
    lecturer: "Mr. Daniel",
    year: 2026,
    semester: "Summer",
    nextClass: new Date().toISOString(),
    nextAssignment: new Date().toISOString(),
    grades: { finalAverage: 90 },
  },
];

export async function addCourse(course) {
  const docRef = await addDoc(collection(firestore, COL), {
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: Number(course.year),
    semester: course.semester,
    nextClass: course.nextClass ?? new Date().toISOString(),
    nextAssignment: course.nextAssignment ?? new Date().toISOString(),
    grades: {
      finalAverage: Number(course.grades?.finalAverage ?? 0),
    },
  });
  return docRef.id;
}

export async function listCourses() {
  const seedRef = doc(firestore, "Settings", "CoursesSeeded");
  const seedSnap = await getDoc(seedRef);

  if (seedSnap.exists()) {
    const snapshot = await getDocs(collection(firestore, COL));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  for (let c of seedCourses) {
    await addCourse(c);
  }
  await setDoc(seedRef, { seeded: true });

  const newSnap = await getDocs(collection(firestore, COL));
  return newSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  const snap = await getDoc(courseRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateCourse(id, courseData) {
  const courseRef = doc(firestore, COL, id);
  return updateDoc(courseRef, courseData);
}

export async function deleteCourse(courseId) {
  const courseRef = doc(firestore, COL, courseId);
  return deleteDoc(courseRef);
}
