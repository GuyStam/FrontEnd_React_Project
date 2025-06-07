import React from "react";
import { TableCell, TableRow, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";

export default function CourseRow({ course, onClick, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith("/management");

  return (
    <TableRow>
      <TableCell
        onClick={() => !isManagement && onClick(course)}
        sx={{
          color: !isManagement ? "#7FC243" : "inherit",
          fontWeight: "bold",
          cursor: !isManagement ? "pointer" : "default",
        }}
      >
        {course.courseName}
      </TableCell>
      <TableCell>{course.lecturer}</TableCell>
      <TableCell>{course.year}</TableCell>
      <TableCell>{course.semester}</TableCell>
      {isManagement && (
        <TableCell>
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
      )}
    </TableRow>
  );
}
