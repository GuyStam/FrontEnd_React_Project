import React, { useState, useEffect } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { addGrade, listGrades } from '../assets/firebase/Grades';
import { listCourses, updateCourseByName } from '../assets/firebase/Courses';
import ValidatedTextField from './ValidatedTextField';

export default function AddGradeRow({ onAdd }) {
  const [formData, setFormData] = useState({
    courseName: '',
    examGrade: '',
    assignmentGrade: '',
  });
  const [courseOptions, setCourseOptions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadCourses = async () => {
      const data = await listCourses();
      const uniqueNames = [...new Set(data.map((c) => c.courseName))];
      setCourseOptions(uniqueNames);
    };
    loadCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { courseName, examGrade, assignmentGrade } = formData;

    if (
      !courseName ||
      isNaN(Number(examGrade)) ||
      isNaN(Number(assignmentGrade)) ||
      Number(examGrade) < 0 ||
      Number(examGrade) > 100 ||
      Number(assignmentGrade) < 0 ||
      Number(assignmentGrade) > 100
    ) {
      setSnackbar({
        open: true,
        message: '❌ Please enter valid grades between 0 and 100 for all fields.',
        severity: 'error',
      });
      return;
    }

    const existingGrades = await listGrades();
    const isDuplicate = existingGrades.some(
      (g) => g.courseName.trim().toLowerCase() === courseName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setSnackbar({
        open: true,
        message: `❌ A grade for '${courseName}' already exists.`,
        severity: 'error',
      });
      return;
    }

    const finalAverage = ((Number(examGrade) + Number(assignmentGrade)) / 2).toFixed(1);
    const newGrade = {
      courseName,
      examGrade: Number(examGrade),
      assignmentGrade: Number(assignmentGrade),
      finalAverage: Number(finalAverage),
    };

    const added = await addGrade(newGrade);
    if (added) {
      onAdd({ ...newGrade, id: added.id });
      await updateCourseByName(courseName, Number(finalAverage));
      setFormData({ courseName: '', examGrade: '', assignmentGrade: '' });
      setSnackbar({
        open: true,
        message: `✅ Grade for '${courseName}' was added successfully!`,
        severity: 'success',
      });
    }
  };

  const finalAverage =
    formData.examGrade && formData.assignmentGrade
      ? ((Number(formData.examGrade) + Number(formData.assignmentGrade)) / 2).toFixed(1)
      : '';

  return (
    <>
      <TableRow>
        <TableCell sx={{ minWidth: 180 }}>
          <Select
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            size="small"
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Course
            </MenuItem>
            {courseOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell sx={{ minWidth: 120 }}>
          <ValidatedTextField
            name="examGrade"
            label="Exam Grade"
            type="number"
            value={formData.examGrade}
            onChange={handleChange}
            required
            validationType="number"
            min={0}
            max={100}
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell sx={{ minWidth: 150 }}>
          <ValidatedTextField
            name="assignmentGrade"
            label="Assignment Grade"
            type="number"
            value={formData.assignmentGrade}
            onChange={handleChange}
            required
            validationType="number"
            min={0}
            max={100}
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell sx={{ minWidth: 130 }}>{finalAverage}</TableCell>
        <TableCell sx={{ minWidth: 100 }}>
          <Tooltip title="Save Grade">
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
