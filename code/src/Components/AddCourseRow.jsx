import React from 'react';
import { TableCell, TableRow, IconButton, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ValidatedTextField from './ValidatedTextField';

const semesters = ['A', 'B', 'Summer'];

export default function AddCourseRow({ newCourse, setNewCourse, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <TableRow>
      <TableCell>
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
      <TableCell>
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
      <TableCell>
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
      <TableCell>
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
      <TableCell>
        <IconButton onClick={onSave} color="primary">
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
