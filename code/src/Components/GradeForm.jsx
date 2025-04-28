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
  TableSortLabel,
} from "@mui/material";
import "../App.css";

export default function GradesForm() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (storedCourses) {
      setCourses(storedCourses);
    }
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  // only show courses that have grades
  const graded = courses.filter(
    (c) =>
      c.grades &&
      c.grades.examGrade !== "" &&
      c.grades.assignmentGrade !== "" &&
      c.grades.finalAverage !== ""
  );

  // filter by course name or any grade
  const filtered = graded.filter(
    (c) =>
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.grades.examGrade.toString().includes(searchTerm) ||
      c.grades.assignmentGrade.toString().includes(searchTerm) ||
      c.grades.finalAverage.toString().includes(searchTerm)
  );

  // sort by field
  const sorted = [...filtered].sort((a, b) => {
    const aVal =
      orderBy === "courseName" ? a.courseName.toLowerCase() : a.grades[orderBy];
    const bVal =
      orderBy === "courseName" ? b.courseName.toLowerCase() : b.grades[orderBy];
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const columns = [
    { id: "courseName", label: "Course Name" },
    { id: "examGrade", label: "Exam Grade" },
    { id: "assignmentGrade", label: "Assignment Grade" },
    { id: "finalAverage", label: "Final Average" },
  ];

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#000", // צבע שחור
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Grades Viewer
      </Typography>
      <TextField
        label="Search Course / Grades"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {sorted.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No grades to display.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : "asc"}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell>{c.courseName}</TableCell>
                  <TableCell>{c.grades.examGrade}</TableCell>
                  <TableCell>{c.grades.assignmentGrade}</TableCell>
                  <TableCell>{c.grades.finalAverage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
