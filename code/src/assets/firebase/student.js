import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './config';

const docRef = doc(firestore, 'Students', 'current');

export async function getStudentInfo() {
  const snap = await getDoc(docRef);
  if (snap.exists()) return snap.data();
  return null;
}

export async function setStudentInfo(data) {
  return setDoc(docRef, data);
}
