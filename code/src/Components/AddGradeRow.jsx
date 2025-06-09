import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { addGrade } from '../assets/firebase/Grades';
import ValidatedTextField from './ValidatedTextField';

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

    const finalAverage = (
      (Number(examGrade) + Number(assignmentGrade)) / 2
    ).toFixed(1);

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

  const finalAverage =
    formData.examGrade && formData.assignmentGrade
      ? ((Number(formData.examGrade) + Number(formData.assignmentGrade)) / 2).toFixed(1)
      : '';

  return (
    <TableRow>
      <TableCell sx={{ minWidth: 180 }}>
        <ValidatedTextField
          name="courseName"
          label="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          required
          validationType="text"
          minLength={2}
          fullWidth
          size="small"
        />
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
          fullWidth
          size="small"
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
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell sx={{ minWidth: 130 }}>
        {finalAverage || '-'}
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
