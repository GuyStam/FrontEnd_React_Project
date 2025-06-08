import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './config';

const COL = 'Grades';

export async function addGrade(grade) {
  // בדיקה אם כבר קיים ציון לקורס הזה
  const q = query(collection(firestore, COL), where('courseName', '==', grade.courseName));
  const existing = await getDocs(q);
  if (!existing.empty) return null; // לא ניצור שוב

  const docRef = await addDoc(collection(firestore, COL), {
    courseName: grade.courseName,
    lecturer: grade.lecturer ?? '',
    year: grade.year ?? '',
    semester: grade.semester ?? '',
    examGrade: Number(grade.examGrade ?? 0),
    assignmentGrade: Number(grade.assignmentGrade ?? 0),
    finalAverage: Number(grade.finalAverage ?? 0),
  });

  return docRef.id;
}

export async function listGrades() {
  const snapshot = await getDocs(collection(firestore, COL));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
