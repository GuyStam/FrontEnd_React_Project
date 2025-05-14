import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { firestore } from "./config";

const COL = "Grades";

const seedGrades = [
  { courseName: "Database Systems", examGrade: 85, assignmentGrade: 90, finalAverage: 88 },
  { courseName: "Information Security", examGrade: 92, assignmentGrade: 87, finalAverage: 90 },
  { courseName: "Project Management", examGrade: 80, assignmentGrade: 85, finalAverage: 82 },
  { courseName: "ERP Systems", examGrade: 78, assignmentGrade: 81, finalAverage: 80 },
  { courseName: "Business Intelligence", examGrade: 88, assignmentGrade: 84, finalAverage: 86 }
];

// הוספת ציון חדש ל-"Grades"
export async function addGrade(grade) {
  return addDoc(collection(firestore, COL), {
    courseName: grade.courseName,
    examGrade: Number(grade.examGrade),
    assignmentGrade: Number(grade.assignmentGrade),
    finalAverage: Number(grade.finalAverage),
  });
}

// שליפת כל הציונים עם seed אם ריק
export async function listGrades() {
  const snapshot = await getDocs(collection(firestore, COL));
  if (snapshot.empty) {
    for (let g of seedGrades) {
      await addGrade(g);
    }
    const newSnap = await getDocs(collection(firestore, COL));
    return newSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// שליפת ציון יחיד לפי ID
export async function getGrade(id) {
  const ref = doc(firestore, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// עדכון ציון לפי ID
export async function updateGrade(gradeId, newData) {
  const gradeRef = doc(firestore, COL, gradeId);
  return updateDoc(gradeRef, {
    courseName: newData.courseName,
    examGrade: Number(newData.examGrade),
    assignmentGrade: Number(newData.assignmentGrade),
    finalAverage: Number(newData.finalAverage),
  });
}

// מחיקת ציון לפי ID
export async function deleteGrade(gradeId) {
  const gradeRef = doc(firestore, COL, gradeId);
  return deleteDoc(gradeRef);
}