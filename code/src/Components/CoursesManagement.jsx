import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, updateCourse } from '../assets/firebase/Courses';
import ValidatedTextField from './ValidatedTextField';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function CoursesManagement() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    getCourse(courseId)
      .then((data) => setCourse(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCourse(course.id, course);
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 4,
        px: 2,
        py: 3,
        backgroundColor: '#fdfdfd',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 3 }}
      >
        Edit Course
      </Typography>

      <ValidatedTextField
        label="Course Name"
        value={course.courseName}
        onChange={(e) => handleChange('courseName', e.target.value)}
        required
      />

      <ValidatedTextField
        label="Lecturer"
        value={course.lecturer}
        onChange={(e) => handleChange('lecturer', e.target.value)}
        required
      />

      <ValidatedTextField
        label="Year"
        type="number"
        value={course.year}
        onChange={(e) => handleChange('year', e.target.value)}
        required
      />

      <ValidatedTextField
        label="Semester"
        value={course.semester}
        onChange={(e) => handleChange('semester', e.target.value)}
        required
      />

      <DateTimePicker
        label="Next Class"
        value={dayjs(course.nextClass)}
        onChange={(value) => handleChange('nextClass', value.toISOString())}
        sx={{ my: 2, width: '100%' }}
      />

      <DateTimePicker
        label="Next Assignment"
        value={dayjs(course.nextAssignment)}
        onChange={(value) => handleChange('nextAssignment', value.toISOString())}
        sx={{ mb: 2, width: '100%' }}
      />

      <Button
        type="submit"
        variant="contained"
        color="success"
        disabled={saving}
        fullWidth
        sx={{ mt: 1, fontWeight: 'bold' }}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Course updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
