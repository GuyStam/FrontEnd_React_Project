// CoursesForm.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TableSortLabel
} from "@mui/material";

export default function CoursesForm() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) setCourses(JSON.parse(storedCourses));
  }, []);

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
      <h1>Courses Viewer</h1>
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
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {["courseName", "lecturer", "year", "semester", "nextClass", "nextAssignment"].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={orderBy === col}
                      direction={orderBy === col ? orderDirection : "asc"}
                      onClick={() => handleSort(col)}
                    >
                      {col.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    </TableSortLabel>
                  </TableCell>
                ))}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
