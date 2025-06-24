import React from 'react';
import { TableCell, TableRow, IconButton, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ValidatedTextField from './ValidatedTextField';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const semesters = ['A', 'B', 'Summer'];

export default function AddCourseRow({ newCourse, setNewCourse, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setNewCourse((prev) => ({
      ...prev,
      [name]: newValue ? new Date(newValue).toISOString() : '',
    }));
  };

  const validateBeforeSave = () => {
    const year = Number(newCourse.year);
    const onlyEnglishRegex = /^[A-Za-z .'-]+$/;

    if (
      !newCourse.courseName?.trim() ||
      !newCourse.lecturer?.trim() ||
      !newCourse.semester ||
      isNaN(year) ||
      year < 2000 ||
      year > 2100 ||
      !onlyEnglishRegex.test(newCourse.courseName) ||
      !onlyEnglishRegex.test(newCourse.lecturer)
    ) {
      onSave(null, '❌ Please fill all fields correctly using English only.');
      return;
    }

    onSave(newCourse);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TableRow>
        <TableCell sx={{ minWidth: 140 }}>
          <ValidatedTextField
            name="courseName"
            label="Course Name"
            value={newCourse.courseName}
            onChange={handleChange}
            required
            validationType="text"
            minLength={2}
            fullWidth
            size="small"
          />
        </TableCell>
        <TableCell sx={{ minWidth: 140 }}>
          <ValidatedTextField
            name="lecturer"
            label="Lecturer"
            value={newCourse.lecturer}
            onChange={handleChange}
            required
            validationType="text"
            minLength={3}
            fullWidth
            size="small"
          />
        </TableCell>
        <TableCell sx={{ minWidth: 140 }}>
          <ValidatedTextField
            name="year"
            label="Year"
            type="number"
            value={newCourse.year}
            onChange={handleChange}
            required
            validationType="number"
            min={2000}
            max={2100}
            fullWidth
            size="small"
          />
        </TableCell>
        <TableCell sx={{ minWidth: 140 }}>
          <ValidatedTextField
            select
            name="semester"
            label="Semester"
            value={newCourse.semester}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          >
            {semesters.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </ValidatedTextField>
        </TableCell>
        <TableCell sx={{ minWidth: 180 }}>
          <DateTimePicker
            label="Next Class"
            value={newCourse.nextClass ? new Date(newCourse.nextClass) : null}
            onChange={(newValue) => handleDateChange('nextClass', newValue)}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </TableCell>
        <TableCell sx={{ minWidth: 180 }}>
          <DateTimePicker
            label="Next Assignment"
            value={newCourse.nextAssignment ? new Date(newCourse.nextAssignment) : null}
            onChange={(newValue) => handleDateChange('nextAssignment', newValue)}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </TableCell>
        <TableCell sx={{ minWidth: 100 }}>
          <IconButton onClick={validateBeforeSave} color="primary">
            <SaveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </LocalizationProvider>
  );
}
