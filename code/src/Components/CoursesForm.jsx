import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import "../App.css";

// Default seed data: at least 10 courses
const defaultCourses = [
  { courseName: "Course 1", lecturer: "Lecturer A", year: 2025, semester: "A", nextClass: "2025-05-10T09:00", nextAssignment: "2025-05-17T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 2", lecturer: "Lecturer B", year: 2025, semester: "B", nextClass: "2025-05-11T10:30", nextAssignment: "2025-05-18T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 3", lecturer: "Lecturer C", year: 2025, semester: "A", nextClass: "2025-05-12T13:00", nextAssignment: "2025-05-19T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 4", lecturer: "Lecturer D", year: 2025, semester: "B", nextClass: "2025-05-13T14:15", nextAssignment: "2025-05-20T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 5", lecturer: "Lecturer E", year: 2025, semester: "A", nextClass: "2025-05-14T08:00", nextAssignment: "2025-05-21T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 6", lecturer: "Lecturer F", year: 2025, semester: "B", nextClass: "2025-05-15T11:00", nextAssignment: "2025-05-22T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 7", lecturer: "Lecturer G", year: 2025, semester: "A", nextClass: "2025-05-16T12:30", nextAssignment: "2025-05-23T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 8", lecturer: "Lecturer H", year: 2025, semester: "B", nextClass: "2025-05-17T09:45", nextAssignment: "2025-05-24T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 9", lecturer: "Lecturer I", year: 2025, semester: "A", nextClass: "2025-05-18T10:00", nextAssignment: "2025-05-25T23:59", grades: { finalAverage: "" } },
  { courseName: "Course 10", lecturer: "Lecturer J", year: 2025, semester: "B", nextClass: "2025-05-19T14:00", nextAssignment: "2025-05-26T23:59", grades: { finalAverage: "" } },
];

export default function CoursesForm() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    } else {
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredCourses = courses.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.courseName.toLowerCase().includes(term) ||
      c.lecturer.toLowerCase().includes(term) ||
      c.year.toString().includes(term)
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDateTime = (value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";
    return date
      .toLocaleString("en-GB", { hour12: false })
      .replace(/(\d+)\/(\d+)\/(\d+),/, (_, d, m, y) => `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#000",
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Courses Viewer
      </Typography>

      <TextField
        label="Search Course / Lecturer / Year"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer
        component={Paper}
        sx={{ border: "1px solid #7FC243", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eafaf1" }}>
              {[
                "courseName",
                "lecturer",
                "year",
                "semester",
                "nextClass",
                "nextAssignment",
                "finalAverage",
              ].map((col) => (
                <TableCell key={col} sx={{ fontFamily: "Assistant", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? orderDirection : "asc"}
                    onClick={() => handleSort(col)}
                  >
                    {col === "finalAverage"
                      ? "Final Average"
                      : col.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCourses.map((course, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.lecturer}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{formatDateTime(course.nextClass)}</TableCell>
                <TableCell>{formatDateTime(course.nextAssignment)}</TableCell>
                <TableCell>
                  {course.grades && course.grades.finalAverage !== undefined
                    ? course.grades.finalAverage
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
