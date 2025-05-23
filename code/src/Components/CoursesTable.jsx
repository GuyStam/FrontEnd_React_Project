import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CoursesTable({ courses }) {
  const fmt = (date) =>
    new Date(date).toLocaleString("en-GB", { hour12: false });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="courses table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#eafaf1" }}>
            <TableCell>Course Name</TableCell>
            <TableCell>Lecturer</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Next Class</TableCell>
            <TableCell>Next Assignment</TableCell>
            <TableCell>Final Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                {/* במידה ותרצה ניווט לפרטים, אפשר להשאיר קישור */}
                <Link to={`/forms/courses/${c.id}`}>{c.courseName}</Link>
              </TableCell>
              <TableCell>{c.lecturer}</TableCell>
              <TableCell>{c.year}</TableCell>
              <TableCell>{c.semester}</TableCell>
              <TableCell>{fmt(c.nextClass)}</TableCell>
              <TableCell>{fmt(c.nextAssignment)}</TableCell>
              <TableCell>{c.grades?.finalAverage ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
