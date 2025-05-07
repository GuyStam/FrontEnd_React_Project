// src/assets/firebase/courses.js
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./config";

const COL = "Courses"; // שם הקולקשן בדיוק כפי שמופיע ב־Console

export async function addCourses(course) {
  return addDoc(
    collection(firestore, COL),
    {
      courseName: course.courseName,
      lecturer:   course.lecturer,
      year:       Number(course.year),
      semester:   course.semester,
      nextClass:      course.nextClass,
      nextAssignment: course.nextAssignment,
      grades: {
        finalAverage: course.grades.finalAverage
      }
    }
  );
}

export async function listCourses() {
  const snapshot = await getDocs(collection(firestore, COL));
  return snapshot.docs.map(doc => doc.data());
}
