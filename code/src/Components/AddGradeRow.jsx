import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { addGrade } from '../assets/firebase/Grades';

export default function AddGradeRow({ onAdd }) {
  const [formData, setFormData] = useState({
    courseName: '',
    examGrade: '',
    assignmentGrade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { courseName, examGrade, assignmentGrade } = formData;
    if (!courseName || !examGrade || !assignmentGrade) return;

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
      setFormData({ courseName: '', examGrade: '', assignmentGrade: '' });
    }
  };

  const finalAverage = (
    formData.examGrade && formData.assignmentGrade
      ? ((Number(formData.examGrade) + Number(formData.assignmentGrade)) / 2).toFixed(1)
      : ''
  );

  return (
    <TableRow>
      <TableCell sx={{ minWidth: 180 }}>
        <TextField
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="Course Name"
          size="small"
          fullWidth
        />
      </TableCell>
      <TableCell sx={{ minWidth: 120 }}>
        <TextField
          name="examGrade"
          type="number"
          value={formData.examGrade}
          onChange={handleChange}
          placeholder="Exam Grade"
          size="small"
          fullWidth
        />
      </TableCell>
      <TableCell sx={{ minWidth: 150 }}>
        <TextField
          name="assignmentGrade"
          type="number"
          value={formData.assignmentGrade}
          onChange={handleChange}
          placeholder="Assignment Grade"
          size="small"
          fullWidth
        />
      </TableCell>
      <TableCell sx={{ minWidth: 130 }}>
        {finalAverage}
      </TableCell>
      <TableCell sx={{ minWidth: 100 }}>
        <Tooltip title="Save Grade">
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
