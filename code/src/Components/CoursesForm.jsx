// src/Components/CoursesForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { listCourses, getCourse } from "../assets/firebase/Courses";

export default function CoursesForm() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (courseId) {
          const single = await getCourse(courseId);
          setCourses(single ? [single] : []);
        } else {
          const all = await listCourses();
          setCourses(all);
        }
      } catch (err) {
        console.error(err);
        setCourses([]);
      }
      setLoading(false);
    };
    load();
  }, [courseId]);

  const handleSort = (field) => {
    if (courseId) return; // disable sorting in detail
    const asc = orderBy === field && orderDirection === "asc";
    setOrderDirection(asc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filtered = courses.filter((c) =>
    courseId
      ? true
      : (
          c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.year.toString().includes(searchTerm)
        )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (courseId) return 0;
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const fmt = (d) => {
    const date = new Date(d);
    return isNaN(date) ? "" : date.toLocaleString("en-GB", { hour12: false });
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontFamily: "Assistant", fontWeight: "bold" }}
      >
        {courseId ? "Course Details" : "Courses Viewer"}
      </Typography>

      {!courseId && (
        <TextField
          label="Search Course / Lecturer / Year"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : sorted.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {courseId ? "Course not found." : "No courses to display."}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eee" }}>
              <TableRow>
                {[
                  "courseName",
                  "lecturer",
                  "year",
                  "semester",
                  "nextClass",
                  "nextAssignment",
                  "finalAverage",
                ].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={!courseId && orderBy === col}
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
              {sorted.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => navigate(`/forms/courses/${c.id}`)}
                      sx={{ textTransform: "none" }}
                    >
                      {c.courseName}
                    </Button>
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
      )}
    </Box>
  );
}
