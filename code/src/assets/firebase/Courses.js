// assets/firebase/Courses.js
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
import { addGrade, deleteGrade, listGrades } from './Grades';

const COL = 'Courses';

function getRandomGrade(min = 60, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
  const now = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 1);
  const days = [2, 4]; // Tuesday & Thursday

  while (true) {
    const randomTime = now.getTime() + Math.random() * (end.getTime() - now.getTime());
    const date = new Date(randomTime);
    const day = date.getDay();

    if (days.includes(day)) {
      const hour = 16 + Math.floor(Math.random() * 6);
      const quarter = [0, 15, 30, 45];
      const minute = quarter[Math.floor(Math.random() * quarter.length)];
      date.setHours(hour, minute, 0, 0);
      return date.toISOString();
    }
  }
}

const seedCourses = [
  { courseName: 'Database Systems', lecturer: 'Ms. Mor', year: 2024, semester: 'B' },
  { courseName: 'Business Statistics', lecturer: 'Dr. Shapiro', year: 2024, semester: 'A' },
  { courseName: 'ERP Systems', lecturer: 'Dr. Regev', year: 2026, semester: 'B' },
  { courseName: 'E-Business', lecturer: 'Mr. Daniel', year: 2026, semester: 'Summer' },
  { courseName: 'Financial Accounting', lecturer: 'Dr. Bar', year: 2025, semester: 'A' },
  { courseName: 'Information Systems Intro', lecturer: 'Dr. Cohen', year: 2023, semester: 'A' },
  { courseName: 'Marketing Principles', lecturer: 'Mr. Yaron', year: 2025, semester: 'Summer' },
  { courseName: 'Microeconomics', lecturer: 'Prof. Levi', year: 2023, semester: 'B' },
  { courseName: 'Network Fundamentals', lecturer: 'Ms. Tal', year: 2025, semester: 'B' },
  { courseName: 'Project Management', lecturer: 'Prof. Alon', year: 2026, semester: 'A' },
];

export async function addCourse(course) {
  const q = query(
    collection(firestore, COL),
    where('courseName', '==', course.courseName),
    where('year', '==', Number(course.year)),
    where('semester', '==', course.semester)
  );
  const existing = await getDocs(q);
  if (!existing.empty) return null;

  // יוצרים קורס עם ממוצע זמני
  const docRef = await addDoc(collection(firestore, COL), {
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: Number(course.year),
    semester: course.semester,
    nextClass: course.nextClass ?? getRandomDate(),
    nextAssignment: course.nextAssignment ?? getRandomDate(),
    grades: {
      finalAverage: 0,
    },
  });

  const exam = getRandomGrade();
  const assignment = getRandomGrade();
  const finalAvg = ((exam + assignment) / 2).toFixed(1);

  // מוסיפים ציון אמיתי בטבלת Grades
  await addGrade({
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: course.year,
    semester: course.semester,
    examGrade: exam,
    assignmentGrade: assignment,
    finalAverage: Number(finalAvg),
  });

  // ✅ מעדכנים גם בקורס את הממוצע
  await updateDoc(doc(firestore, COL, docRef.id), {
    grades: {
      finalAverage: Number(finalAvg),
    },
  });

  return docRef.id;
}

export async function listCourses() {
  const snapshot = await getDocs(collection(firestore, COL));
  const grades = await listGrades();

  return snapshot.docs.map((doc) => {
    const course = { id: doc.id, ...doc.data() };
    const grade = grades.find((g) => g.courseName === course.courseName);
    return {
      ...course,
      grades: {
        finalAverage: grade?.finalAverage ?? 0,
      },
    };
  });
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
  const courseSnap = await getDoc(courseRef);

  if (courseSnap.exists()) {
    const courseData = courseSnap.data();
    const courseName = courseData.courseName;
    const q = query(collection(firestore, 'Grades'), where('courseName', '==', courseName));
    const gradeSnap = await getDocs(q);
    for (let doc of gradeSnap.docs) {
      await deleteGrade(doc.id);
    }
  }

  return deleteDoc(courseRef);
}

export async function updateCourseByName(courseName, finalAverage) {
  const q = query(collection(firestore, COL), where('courseName', '==', courseName));
  const snapshot = await getDocs(q);
  snapshot.forEach((docSnap) => {
    updateDoc(doc(firestore, COL, docSnap.id), {
      grades: { finalAverage },
    });
  });
}

export async function seedAllCoursesIfEmpty() {
  const snapshot = await getDocs(collection(firestore, COL));
  if (!snapshot.empty) return;

  for (const course of seedCourses) {
    await addCourse(course);
  }
}
