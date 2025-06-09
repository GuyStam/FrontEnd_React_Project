import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getGrade, updateGrade } from '../assets/firebase/Grades';
import { updateCourseByName } from '../assets/firebase/Courses';
import ValidatedTextField from './ValidatedTextField';

export default function GradesForm() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const [grade, setGrade] = useState(null);
  const [formData, setFormData] = useState({
    examGrade: '',
    assignmentGrade: '',
    finalAverage: '',
  });

  useEffect(() => {
    const loadGrade = async () => {
      const data = await getGrade(gradeId);
      if (data) {
        setGrade(data);
        setFormData({
          examGrade: data.examGrade ?? '',
          assignmentGrade: data.assignmentGrade ?? '',
          finalAverage: data.finalAverage ?? '',
        });
      }
    };
    loadGrade();
  }, [gradeId]);

  useEffect(() => {
    const exam = parseFloat(formData.examGrade);
    const assignment = parseFloat(formData.assignmentGrade);
    if (!isNaN(exam) && !isNaN(assignment)) {
      const avg = ((exam + assignment) / 2).toFixed(1);
      setFormData((prev) => ({ ...prev, finalAverage: avg }));
    }
  }, [formData.examGrade, formData.assignmentGrade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const exam = Number(formData.examGrade);
    const assignment = Number(formData.assignmentGrade);

    // ✅ ולידציה לוגית לפני שמירה
    if (
      isNaN(exam) || isNaN(assignment) ||
      exam < 0 || exam > 100 ||
      assignment < 0 || assignment > 100
    ) {
      alert('Grades must be between 0 and 100');
      return;
    }

    const updated = {
      ...grade,
      examGrade: exam,
      assignmentGrade: assignment,
      finalAverage: Number(formData.finalAverage),
    };

    await updateGrade(gradeId, updated);

    // עדכון הממוצע במסמך הקורס
    await updateCourseByName(grade.courseName, updated.finalAverage);

    navigate('/management/grades');
  };

  if (!grade) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading grade...
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Assistant', fontWeight: 'bold', color: '#7FC243' }}
        >
          Edit Grade: {grade.courseName}
        </Typography>

        <Stack spacing={2}>
          <ValidatedTextField
            label="Exam Grade"
            name="examGrade"
            type="number"
            value={formData.examGrade}
            onChange={handleChange}
            required
            validationType="number"
            min={0}
            max={100}
            fullWidth
          />
          <ValidatedTextField
            label="Assignment Grade"
            name="assignmentGrade"
            type="number"
            value={formData.assignmentGrade}
            onChange={handleChange}
            required
            validationType="number"
            min={0}
            max={100}
            fullWidth
          />
          <ValidatedTextField
            label="Final Average"
            name="finalAverage"
            value={formData.finalAverage}
            fullWidth
            disabled
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: '#7FC243', fontFamily: 'Assistant', fontWeight: 'bold' }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/management/grades')}
            sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
