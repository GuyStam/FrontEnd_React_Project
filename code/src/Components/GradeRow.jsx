import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GradeRow({ grade, onView, onEdit, onDelete }) {
  const finalAvg = grade.finalAverage ?? calculateAverage(grade);

  function calculateAverage(g) {
    const exam = parseFloat(g.examGrade);
    const assignment = parseFloat(g.assignmentGrade);
    if (isNaN(exam) || isNaN(assignment)) return "N/A";
    return ((exam + assignment) / 2).toFixed(1);
  }

  return (
    <TableRow>
      <TableCell
        onClick={() => onView(grade)}
        sx={{ color: "#7FC243", fontWeight: "bold", cursor: "pointer" }}
      >
        {grade.courseName}
      </TableCell>
      <TableCell>{grade.lecturer}</TableCell>
      <TableCell>{grade.year}</TableCell>
      <TableCell>{grade.semester}</TableCell>
      <TableCell>{grade.examGrade ?? "N/A"}</TableCell>
      <TableCell>{grade.assignmentGrade ?? "N/A"}</TableCell>
      <TableCell>{finalAvg}</TableCell>
      {/* הצגת כפתורים רק אם התקבלו */}
      {onEdit && onDelete && (
        <TableCell>
          <IconButton onClick={() => onEdit(grade)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(grade.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}
