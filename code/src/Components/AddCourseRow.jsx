import React from 'react';
import { TableCell, TableRow, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function AddCourseRow({ newCourse, setNewCourse, onSave }) {
  return (
    <TableRow>
      <TableCell>
        <TextField
          size="small"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse((prev) => ({ ...prev, courseName: e.target.value }))}
          placeholder="Course Name"
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={newCourse.lecturer}
          onChange={(e) => setNewCourse((prev) => ({ ...prev, lecturer: e.target.value }))}
          placeholder="Lecturer"
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={newCourse.year}
          onChange={(e) => setNewCourse((prev) => ({ ...prev, year: e.target.value }))}
          placeholder="Year"
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={newCourse.semester}
          onChange={(e) => setNewCourse((prev) => ({ ...prev, semester: e.target.value }))}
          placeholder="Semester"
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={onSave} color="primary">
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
