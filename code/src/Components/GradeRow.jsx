import React from 'react';
import { TableRow, TableCell, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function GradeRow({ grade, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>{grade.courseName}</TableCell>
      <TableCell>{grade.examGrade}</TableCell>
      <TableCell>{grade.assignmentGrade}</TableCell>
      <TableCell>{grade.finalAverage}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="small"
          onClick={() => onEdit(grade)}
          sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
        >
          EDIT
        </Button>
        <IconButton onClick={() => onDelete(grade.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
