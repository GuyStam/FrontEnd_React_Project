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

const COL = "Grades";

// ✅ 10 ציונים התחלתיים
const seedGrades = [
  { courseName: "Introduction to Information Systems", examGrade: 87, assignmentGrade: 83, finalAverage: 85 },
  { courseName: "Microeconomics", examGrade: 75, assignmentGrade: 81, finalAverage: 78 },
  { courseName: "Business Statistics", examGrade: 90, assignmentGrade: 86, finalAverage: 88 },
  { courseName: "Database Systems", examGrade: 94, assignmentGrade: 88, finalAverage: 91 },
  { courseName: "Marketing Principles", examGrade: 77, assignmentGrade: 83, finalAverage: 80 },
  { courseName: "Financial Accounting", examGrade: 85, assignmentGrade: 87, finalAverage: 86 },
  { courseName: "Network Fundamentals", examGrade: 80, assignmentGrade: 84, finalAverage: 82 },
  { courseName: "Project Management", examGrade: 90, assignmentGrade: 88, finalAverage: 89 },
  { courseName: "ERP Systems", examGrade: 83, assignmentGrade: 85, finalAverage: 84 },
  { courseName: "E-Business", examGrade: 91, assignmentGrade: 89, finalAverage: 90 },
];

export async function addGrade(grade) {
  const docRef = await addDoc(collection(firestore, COL), {
    courseName: grade.courseName,
    examGrade: Number(grade.examGrade),
    assignmentGrade: Number(grade.assignmentGrade),
    finalAverage: Number(grade.finalAverage),
  });
  return docRef.id;
}

export async function listGrades() {
  const seedRef = doc(firestore, "Settings", "GradesSeeded");
  const seedSnap = await getDoc(seedRef);

  if (seedSnap.exists()) {
    const snapshot = await getDocs(collection(firestore, COL));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  for (let g of seedGrades) {
    await addGrade(g);
  }
  await setDoc(seedRef, { seeded: true });

  const newSnap = await getDocs(collection(firestore, COL));
  return newSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getGrade(gradeId) {
  const gradeRef = doc(firestore, COL, gradeId);
  const snap = await getDoc(gradeRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateGrade(id, gradeData) {
  const gradeRef = doc(firestore, COL, id);
  return updateDoc(gradeRef, gradeData);
}

export async function deleteGrade(id) {
  const gradeRef = doc(firestore, COL, id);
  return deleteDoc(gradeRef);
}
