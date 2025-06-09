import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './config';
import { addGrade, deleteGrade, listGrades } from './Grades'; // הוספת listGrades כאן

const COL = 'Courses';

// פונקציה שמחזירה ציון רנדומלי בין 60 ל-100
function getRandomGrade(min = 60, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const q = query(collection(firestore, COL), where('courseName', '==', course.courseName));
  const existing = await getDocs(q);
  if (!existing.empty) return null;

  const docRef = await addDoc(collection(firestore, COL), {
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: Number(course.year),
    semester: course.semester,
    nextClass: course.nextClass ?? new Date().toISOString(),
    nextAssignment: course.nextAssignment ?? new Date().toISOString(),
    grades: {
      finalAverage: 0, // ייקבע לפי הקולקציה Grades
    },
  });

  const exam = getRandomGrade();
  const assignment = getRandomGrade();
  const finalAvg = ((exam + assignment) / 2).toFixed(1);

  await addGrade({
    courseName: course.courseName,
    lecturer: course.lecturer,
    year: course.year,
    semester: course.semester,
    examGrade: exam,
    assignmentGrade: assignment,
    finalAverage: Number(finalAvg),
  });

  return docRef.id;
}

export async function listCourses() {
  const snapshot = await getDocs(collection(firestore, COL));
  const grades = await listGrades(); // משיכה של כל הציונים

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
