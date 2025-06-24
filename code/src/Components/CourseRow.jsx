import React from 'react';
import { TableCell, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CourseRow({ course, onClick, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith('/management');

  const formatDateTime = (iso) => {
    if (!iso) return '';
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(iso).toLocaleString('en-GB', options);
  };

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
            {formatDateTime(course.nextClass)}
          </TableCell>
          <TableCell sx={{ minWidth: 180 }}>
            {formatDateTime(course.nextAssignment)}
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
