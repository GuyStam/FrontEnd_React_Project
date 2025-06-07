import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HomeCards from './Components/HomeCards';
import ScheduleTable from './Components/ScheduleTable';
import { listCourses } from './assets/firebase/Courses';
import { getLecturerMessage } from './assets/firebase/settings';

const getDaysUntil = (dateStr) => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} days left` : 'Semester ended';
};

const SEMESTER_START = '2025-02-01';
const SEMESTER_END = '2025-06-30';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [lecturerMessage, setLecturerMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await listCourses();
      setCourses(data);

      const msg = await getLecturerMessage();
      setLecturerMessage(msg);
    };
    loadData();
  }, []);

  const gradeValues = courses.map((c) => Number(c.grades?.finalAverage)).filter((v) => !isNaN(v));
  const averageGPA =
    gradeValues.length > 0
      ? (gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length).toFixed(2)
      : 'N/A';

  const nextAssignment = courses
    .map((c) => c.nextAssignment)
    .filter(Boolean)
    .sort()[0];

  const now = new Date();
  const sinceStart = Math.floor((now - new Date(SEMESTER_START)) / (1000 * 60 * 60 * 24));
  const untilEnd = getDaysUntil(SEMESTER_END);

  const sampleSchedule = [
    { day: 'Sunday', time: '10:00–12:00', courseName: 'Math for Business' },
    { day: 'Monday', time: '14:00–16:00', courseName: 'React Basics' },
    { day: 'Wednesday', time: '15:00–17:00', courseName: 'Info Systems' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontFamily: 'Assistant', textAlign: 'center', fontWeight: 'bold', mb: 1 }}
      >
        Welcome to the Student Portal
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 4, fontStyle: 'italic' }}>
        Semester started on: {SEMESTER_START}
      </Typography>

      <HomeCards
        nextAssignment={nextAssignment}
        averageGPA={averageGPA}
        sinceStart={sinceStart}
        untilEnd={untilEnd}
        lecturerMessage={lecturerMessage}
      />

      <Typography variant="h5" sx={{ fontFamily: 'Assistant', mb: 2 }}></Typography>

      <ScheduleTable schedule={sampleSchedule} />
    </Box>
  );
}
