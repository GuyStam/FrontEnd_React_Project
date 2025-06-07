import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { listCourses } from '../assets/firebase/Courses';

export default function ScheduleTable() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      const data = await listCourses();

      // נניח שיש לך שדות day ו־time בקורסים עצמם (אם לא – צריך להוסיף)
      // כרגע נשתמש ב-fallback לדוגמה
      const formatted = data.map((c) => ({
        day: c.day || 'Sunday',
        time: c.time || '08:30',
        courseName: c.courseName,
      }));

      setSchedule(formatted);
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Assistant', fontWeight: 'bold' }}>
        Weekly Timetable
      </Typography>
      <TableContainer component={Paper} sx={{ border: '1px solid #7FC243', borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eafaf1' }}>
              <TableCell
                sx={{ fontWeight: 'bold', fontFamily: 'Assistant', border: '1px solid #7FC243' }}
              >
                Day
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', fontFamily: 'Assistant', border: '1px solid #7FC243' }}
              >
                Time
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', fontFamily: 'Assistant', border: '1px solid #7FC243' }}
              >
                Course
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((entry, idx) => (
              <TableRow key={idx} sx={{ backgroundColor: 'white' }}>
                <TableCell sx={{ border: '1px solid #7FC243' }}>{entry.day}</TableCell>
                <TableCell sx={{ border: '1px solid #7FC243' }}>{entry.time}</TableCell>
                <TableCell sx={{ border: '1px solid #7FC243' }}>{entry.courseName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
