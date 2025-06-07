import { addDoc, collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './config';

const COL = 'Grades';

// ציונים התחלתיים (לא חובה אבל שימושי)
const seedGrades = [
  {
    courseName: 'Database Systems',
    examGrade: 90,
    assignmentGrade: 85,
    finalAverage: 87,
  },
  {
    courseName: 'Network Fundamentals',
    examGrade: 75,
    assignmentGrade: 80,
    finalAverage: 78,
  },
];

// הוספת ציון חדש
export async function addGrade(grade) {
  const docRef = await addDoc(collection(firestore, COL), {
    courseName: grade.courseName,
    examGrade: Number(grade.examGrade),
    assignmentGrade: Number(grade.assignmentGrade),
    finalAverage: Number(grade.finalAverage),
  });
  return docRef.id;
}

// שליפת כל הציונים
export async function listGrades() {
  const snapshot = await getDocs(collection(firestore, COL));
  if (snapshot.empty) {
    for (let g of seedGrades) {
      await addGrade(g);
    }
    const newSnap = await getDocs(collection(firestore, COL));
    return newSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// שליפת ציון לפי ID
export async function getGrade(gradeId) {
  const gradeRef = doc(firestore, COL, gradeId);
  const snap = await getDoc(gradeRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// עדכון ציון לפי ID
export async function updateGrade(id, gradeData) {
  const gradeRef = doc(firestore, COL, id);
  return updateDoc(gradeRef, gradeData);
}

// מחיקת ציון לפי ID
export async function deleteGrade(id) {
  const gradeRef = doc(firestore, COL, id);
  return deleteDoc(gradeRef);
}
