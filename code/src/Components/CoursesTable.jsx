// CoursesTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";

export default function CoursesTable({ courses, onRemove }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#eee" }}>
            <TableCell>Course Name</TableCell>
            <TableCell>Lecturer</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Next Class</TableCell>
            <TableCell>Next Assignment</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, idx) => (
            <TableRow key={idx}>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.lecturer}</TableCell>
              <TableCell>{course.year}</TableCell>
              <TableCell>{course.semester}</TableCell>
              <TableCell>{course.nextClass}</TableCell>
              <TableCell>{course.nextAssignment}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => onRemove(idx)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
