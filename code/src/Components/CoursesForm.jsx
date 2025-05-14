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
      if (courseId) {
        const single = await getCourse(courseId);
        setCourses(single ? [single] : []);
      } else {
        const all = await listCourses();
        setCourses(all);
      }
      setLoading(false);
    };
    load();
  }, [courseId]);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
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
    const aVal = orderBy === "courseName" ? a.courseName.toLowerCase() : a[orderBy];
    const bVal = orderBy === "courseName" ? b.courseName.toLowerCase() : b[orderBy];
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toLocaleString("en-GB", { hour12: false });
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
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {[
                  { id: "courseName", label: "Course Name" },
                  { id: "lecturer", label: "Lecturer" },
                  { id: "year", label: "Year" },
                  { id: "semester", label: "Semester" },
                  { id: "nextClass", label: "Next Class" },
                  { id: "nextAssignment", label: "Next Assignment" },
                  { id: "finalAverage", label: "Final Average" },
                ].map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={!courseId && orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : "asc"}
                      onClick={() => !courseId && handleSort(col.id)}
                    >
                      {col.label}
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
                  <TableCell>{formatDate(c.nextClass)}</TableCell>
                  <TableCell>{formatDate(c.nextAssignment)}</TableCell>
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
