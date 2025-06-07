import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, updateCourse } from '../assets/firebase/Courses';

export default function CoursesManagement() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    courseName: '',
    lecturer: '',
    year: '',
    semester: '',
    nextClass: '',
    nextAssignment: '',
    grades: { finalAverage: '' },
  });

  useEffect(() => {
    if (courseId) {
      getCourse(courseId)
        .then((data) => {
          if (data) setValues(data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'finalAverage') {
      setValues((prev) => ({
        ...prev,
        grades: { ...prev.grades, finalAverage: value },
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCourse(courseId, values)
      .then(() => navigate('/management/courses'))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        עריכת קורס
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="שם קורס"
        name="courseName"
        value={values.courseName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="מרצה"
        name="lecturer"
        value={values.lecturer}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="שנה"
        name="year"
        value={values.year}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="סמסטר"
        name="semester"
        value={values.semester}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="שיעור הבא"
        name="nextClass"
        value={values.nextClass}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="הגשה הבאה"
        name="nextAssignment"
        value={values.nextAssignment}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="ממוצע סופי"
        name="finalAverage"
        value={values.grades.finalAverage}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        שמור
      </Button>
    </Box>
  );
}
