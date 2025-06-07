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
import { getGrade } from '../assets/firebase/Grades';

export default function GradeForm() {
  const { gradeId } = useParams();
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGrade(gradeId)
      .then((data) => setGrade(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [gradeId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!grade) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Grade not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
      >
        Grade Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>
                Course Name
              </TableCell>
              <TableCell sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>Exam Grade</TableCell>
              <TableCell sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>
                Assignment Grade
              </TableCell>
              <TableCell sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>
                Final Average
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{grade.courseName}</TableCell>
              <TableCell>{grade.examGrade ?? 'N/A'}</TableCell>
              <TableCell>{grade.assignmentGrade ?? 'N/A'}</TableCell>
              <TableCell>{grade.finalAverage ?? 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
