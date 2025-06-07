// src/assets/firebase/settings.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './config';

const DOC_REF = doc(firestore, 'Settings', 'LecturerMessage');

export async function getLecturerMessage() {
  const snapshot = await getDoc(DOC_REF);
  if (snapshot.exists()) {
    return snapshot.data().message;
  }
  return '';
}

export async function setLecturerMessage(message) {
  return setDoc(DOC_REF, { message });
}
