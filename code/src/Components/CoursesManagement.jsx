import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, updateCourse } from '../assets/firebase/Courses';
import ValidatedTextField from './ValidatedTextField';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function CoursesManagement() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getCourse(courseId)
      .then((data) => setCourse(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setCourse((prev) => ({
      ...prev,
      [name]: newValue ? new Date(newValue).toISOString() : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const year = Number(course.year);
    const onlyEnglishRegex = /^[A-Za-z .'-]+$/;

    if (
      !course.courseName?.trim() ||
      !course.lecturer?.trim() ||
      !course.semester?.trim() ||
      isNaN(year) ||
      year < 2000 ||
      year > 2100 ||
      !onlyEnglishRegex.test(course.courseName) ||
      !onlyEnglishRegex.test(course.lecturer)
    ) {
      setSnackbar({
        open: true,
        message: '❌ Cannot save. Make sure all fields are filled correctly in English only.',
        severity: 'error',
      });
      return;
    }

    setSaving(true);
    try {
      await updateCourse(course.id, course);
      setSnackbar({
        open: true,
        message: `✅ Course '${course.courseName}' updated successfully!`,
        severity: 'success',
      });
      setTimeout(() => navigate('/management/courses'), 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: `❌ Failed to update course.`,
        severity: 'error',
      });
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          validationType="text"
          minLength={2}
        />

        <ValidatedTextField
          label="Lecturer"
          value={course.lecturer}
          onChange={(e) => handleChange('lecturer', e.target.value)}
          required
          validationType="text"
          minLength={2}
        />

        <ValidatedTextField
          label="Year"
          type="number"
          value={course.year}
          onChange={(e) => handleChange('year', e.target.value)}
          required
          validationType="number"
          min={2000}
          max={2100}
        />

        <ValidatedTextField
          label="Semester"
          value={course.semester}
          onChange={(e) => handleChange('semester', e.target.value)}
          required
        />

        <DateTimePicker
          label="Next Class"
          value={course.nextClass ? new Date(course.nextClass) : null}
          onChange={(newValue) => handleDateChange('nextClass', newValue)}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ my: 2 }}
        />

        <DateTimePicker
          label="Next Assignment"
          value={course.nextAssignment ? new Date(course.nextAssignment) : null}
          onChange={(newValue) => handleDateChange('nextAssignment', newValue)}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ mb: 2 }}
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

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
