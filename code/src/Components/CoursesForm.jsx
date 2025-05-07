// src/Components/CoursesForm.jsx
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
  TableSortLabel
} from "@mui/material";
import "../App.css";

// 10 default MIS-related courses
const defaultCourses = [
  { courseName: "Business Information Systems", lecturer: "Dr. Smith", year: 2025, semester: "A", nextClass: "2025-09-01T10:00", nextAssignment: "2025-09-08T23:59", grades: { finalAverage: "" } },
  { courseName: "Database Management", lecturer: "Prof. Lee", year: 2025, semester: "A", nextClass: "2025-09-02T12:00", nextAssignment: "2025-09-09T23:59", grades: { finalAverage: "" } },
  { courseName: "Enterprise Resource Planning", lecturer: "Dr. Patel", year: 2025, semester: "B", nextClass: "2025-10-05T09:00", nextAssignment: "2025-10-12T23:59", grades: { finalAverage: "" } },
  { courseName: "Data Analytics", lecturer: "Dr. Cohen", year: 2025, semester: "B", nextClass: "2025-10-06T11:00", nextAssignment: "2025-10-13T23:59", grades: { finalAverage: "" } },
  { courseName: "Systems Analysis & Design", lecturer: "Dr. Garcia", year: 2025, semester: "A", nextClass: "2025-09-03T14:00", nextAssignment: "2025-09-10T23:59", grades: { finalAverage: "" } },
  { courseName: "Spreadsheet Modeling (Excel)", lecturer: "Dr. Alvarez", year: 2025, semester: "A", nextClass: "2025-09-04T16:00", nextAssignment: "2025-09-11T23:59", grades: { finalAverage: "" } },
  { courseName: "Information Security", lecturer: "Prof. Rossi", year: 2025, semester: "B", nextClass: "2025-10-07T13:00", nextAssignment: "2025-10-14T23:59", grades: { finalAverage: "" } },
  { courseName: "Web Programming", lecturer: "Prof. Kumar", year: 2025, semester: "B", nextClass: "2025-10-08T15:00", nextAssignment: "2025-10-15T23:59", grades: { finalAverage: "" } },
  { courseName: "Decision Support Systems", lecturer: "Prof. Wang", year: 2025, semester: "A", nextClass: "2025-09-05T09:30", nextAssignment: "2025-09-12T23:59", grades: { finalAverage: "" } },
  { courseName: "Business Process Management", lecturer: "Prof. Nguyen", year: 2025, semester: "A", nextClass: "2025-09-06T11:30", nextAssignment: "2025-09-13T23:59", grades: { finalAverage: "" } }
];

export default function CoursesForm() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("courses") || "null");
    if (stored && Array.isArray(stored) && stored.length > 0) {
      setCourses(stored);
    } else {
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderBy(field);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const filtered = courses.filter(c =>
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.year.toString().includes(searchTerm)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = iso => {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleString("en-GB", { hour12: false })
      .replace(/(\d+)\/(\d+)\/(\d+),/, (_, day, mon, yr) =>
        `${day.padStart(2,"0")}/${mon.padStart(2,"0")}/${yr}`
      );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "Assistant", fontWeight: "bold", mb: 3 }}>
        Courses Viewer
      </Typography>

      <TextField
        label="Search Course / Lecturer / Year"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper} sx={{ border: "1px solid #7FC243", borderRadius: 2 }}>
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
                "finalAverage"
              ].map(col => (
                <TableCell key={col} sx={{ fontFamily: "Assistant", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? orderDirection : "asc"}
                    onClick={() => handleSort(col)}
                  >
                    {col === "finalAverage"
                      ? "Final Average"
                      : col.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())
                    }
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((c, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{c.courseName}</TableCell>
                <TableCell>{c.lecturer}</TableCell>
                <TableCell>{c.year}</TableCell>
                <TableCell>{c.semester}</TableCell>
                <TableCell>{formatDate(c.nextClass)}</TableCell>
                <TableCell>{formatDate(c.nextAssignment)}</TableCell>
                <TableCell>{c.grades.finalAverage || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
