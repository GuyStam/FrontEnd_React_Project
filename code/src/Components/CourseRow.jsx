import React from 'react';
import { TableCell, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CourseRow({ course, onClick, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith('/management');

  return (
    <TableRow>
      <TableCell
        sx={{
          color: !isManagement ? '#7FC243' : 'inherit',
          fontWeight: 'bold',
          cursor: !isManagement ? 'pointer' : 'default',
          minWidth: 140,
        }}
        onClick={() => !isManagement && onClick(course)}
      >
        {course.courseName}
      </TableCell>
      <TableCell sx={{ minWidth: 140 }}>{course.lecturer}</TableCell>
      <TableCell sx={{ minWidth: 140 }}>{course.year}</TableCell>
      <TableCell sx={{ minWidth: 140 }}>{course.semester}</TableCell>
      {isManagement && (
        <>
          <TableCell sx={{ minWidth: 180 }}>
            {course.nextClass ? new Date(course.nextClass).toLocaleString('en-GB') : ''}
          </TableCell>
          <TableCell sx={{ minWidth: 180 }}>
            {course.nextAssignment ? new Date(course.nextAssignment).toLocaleString('en-GB') : ''}
          </TableCell>
          <TableCell sx={{ minWidth: 100 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/management/courses/${course.id}`)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <IconButton onClick={() => onDelete(course)} color="error">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
