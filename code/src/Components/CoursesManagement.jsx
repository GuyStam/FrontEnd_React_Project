import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, updateCourse } from '../assets/firebase/Courses';
import ValidatedTextField from './ValidatedTextField';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const semesters = ['A', 'B', 'Summer'];

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
    let mounted = true;
    if (courseId) {
      getCourse(courseId)
        .then((data) => {
          if (data && mounted) {
            setValues({
              courseName: data.courseName ?? '',
              lecturer: data.lecturer ?? '',
              year: data.year ?? '',
              semester: data.semester ?? '',
              nextClass: data.nextClass ?? '',
              nextAssignment: data.nextAssignment ?? '',
              grades: {
                finalAverage: data.grades?.finalAverage ?? '',
              },
            });
          }
        })
        .catch(console.error)
        .finally(() => mounted && setLoading(false));
    }
    return () => {
      mounted = false;
    };
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

  const handleDateChange = (name, newValue) => {
    setValues((prev) => ({
      ...prev,
      [name]: newValue ? new Date(newValue).toISOString() : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCourse(courseId, values);
      navigate('/management/courses');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
        >
          Edit Course
        </Typography>

        <ValidatedTextField
          fullWidth
          margin="normal"
          label="Course Name"
          name="courseName"
          value={values.courseName}
          onChange={handleChange}
          required
          validationType="text"
          minLength={2}
        />
        <ValidatedTextField
          fullWidth
          margin="normal"
          label="Lecturer"
          name="lecturer"
          value={values.lecturer}
          onChange={handleChange}
          required
          validationType="text"
          minLength={3}
        />
        <ValidatedTextField
          fullWidth
          margin="normal"
          label="Year"
          name="year"
          type="number"
          value={values.year}
          onChange={handleChange}
          required
          validationType="number"
          min={2000}
          max={2100}
        />
        <ValidatedTextField
          fullWidth
          margin="normal"
          select
          label="Semester"
          name="semester"
          value={values.semester}
          onChange={handleChange}
          required
        >
          {semesters.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </ValidatedTextField>

        <DateTimePicker
          label="Next Class"
          value={values.nextClass ? new Date(values.nextClass) : null}
          onChange={(newValue) => handleDateChange('nextClass', newValue)}
          renderInput={(params) => (
            <TextField fullWidth margin="normal" {...params} />
          )}
        />

        <DateTimePicker
          label="Next Assignment"
          value={values.nextAssignment ? new Date(values.nextAssignment) : null}
          onChange={(newValue) => handleDateChange('nextAssignment', newValue)}
          renderInput={(params) => (
            <TextField fullWidth margin="normal" {...params} />
          )}
        />

        <ValidatedTextField
          fullWidth
          margin="normal"
          label="Final Average"
          name="finalAverage"
          value={values.grades.finalAverage}
          onChange={handleChange}
          validationType="number"
          disabled
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Save
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
