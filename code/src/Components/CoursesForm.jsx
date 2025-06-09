import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourse } from '../assets/firebase/Courses';

export default function CoursesForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourse(courseId)
      .then((data) => setCourse(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  const fmt = (date) =>
    new Date(date).toLocaleString('en-GB', {
      hour12: false,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Course not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
      >
        Course Details
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              {[
                'Course Name',
                'Lecturer',
                'Year',
                'Semester',
                'Next Class',
                'Next Assignment',
                'Final Average',
              ].map((h) => (
                <TableCell key={h} sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.lecturer}</TableCell>
              <TableCell>{course.year}</TableCell>
              <TableCell>{course.semester}</TableCell>
              <TableCell>{fmt(course.nextClass)}</TableCell>
              <TableCell>{fmt(course.nextAssignment)}</TableCell>
              <TableCell>{course.grades?.finalAverage ?? 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
