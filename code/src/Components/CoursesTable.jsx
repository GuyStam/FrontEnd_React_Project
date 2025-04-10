import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TableSortLabel,
  Typography
} from "@mui/material";

export default function CoursesTable({ courses, onRemove, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.year.toString().includes(searchTerm)

  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <TextField
        label="Search Course / Lecturer / Year"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {sortedCourses.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No courses to display.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#eee" }}>
                {[
                  { id: "courseName", label: "Course Name" },
                  { id: "lecturer", label: "Lecturer" },
                  { id: "year", label: "Year" },
                  { id: "semester", label: "Semester" },
                  { id: "nextClass", label: "Next Class" },
                  { id: "nextAssignment", label: "Next Assignment" }
                ].map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? orderDirection : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCourses.map((course, idx) => (
                <TableRow key={idx}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.lecturer}</TableCell>
                  <TableCell>{course.year}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.nextClass}</TableCell>
                  <TableCell>{course.nextAssignment}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onEdit(courses.indexOf(course))}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onRemove(courses.indexOf(course))}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
