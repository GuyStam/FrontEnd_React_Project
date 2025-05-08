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
  CircularProgress,
} from "@mui/material";
import { listCourses, addCourses } from "../assets/firebase/Courses";

export default function CoursesForm() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  const seedCourses = [
    { courseName: "Database Systems", lecturer: "Dr. Cohen", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 85 } },
    { courseName: "Network Fundamentals", lecturer: "Prof. Levy", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 78 } },
    { courseName: "Information Security", lecturer: "Dr. Bar", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 90 } },
    { courseName: "Web Development", lecturer: "Ms. Mor", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 88 } },
    { courseName: "ERP Systems", lecturer: "Mr. Yaron", year: 2025, semester: "Summer", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 82 } },
    { courseName: "Business Intelligence", lecturer: "Dr. Nir", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 87 } },
    { courseName: "Project Management", lecturer: "Mrs. Dan", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 91 } },
    { courseName: "Cloud Computing", lecturer: "Mr. Ron", year: 2025, semester: "A", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 80 } },
    { courseName: "UX/UI Design", lecturer: "Ms. Ella", year: 2025, semester: "B", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 89 } },
    { courseName: "System Analysis", lecturer: "Dr. Ziv", year: 2025, semester: "Summer", nextClass: new Date().toISOString(), nextAssignment: new Date().toISOString(), grades: { finalAverage: 86 } },
  ];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetched = await listCourses();
        if (fetched.length === 0) {
          for (const course of seedCourses) await addCourses(course);
          const updated = await listCourses();
          setCourses(updated);
        } else {
          setCourses(fetched);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filtered = courses.filter((c) =>
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.year.toString().includes(searchTerm)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toLocaleString("en-GB", { hour12: false });
  };

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", color: "#000", fontFamily: "Assistant", fontWeight: "bold", mb: 3 }}>
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

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      ) : sorted.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No courses to display.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {["courseName", "lecturer", "year", "semester", "nextClass", "nextAssignment", "finalAverage"].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={orderBy === col}
                      direction={orderBy === col ? orderDirection : "asc"}
                      onClick={() => handleSort(col)}
                    >
                      {col === "finalAverage" ? "Final Average" : col.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell>{c.courseName}</TableCell>
                  <TableCell>{c.lecturer}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>{c.semester}</TableCell>
                  <TableCell>{formatDate(c.nextClass)}</TableCell>
                  <TableCell>{formatDate(c.nextAssignment)}</TableCell>
                  <TableCell>{c.grades?.finalAverage ?? "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}