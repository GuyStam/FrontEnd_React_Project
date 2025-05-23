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
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { listCourses } from "../assets/firebase/Courses";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listCourses().then(all => {
      setCourses(all);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    );
  }

  const filtered = courses.filter(c =>
    [c.courseName, c.lecturer, c.year]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
      >
        Courses Viewer
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Search Course / Lecturer / Year"
        variant="outlined"
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table aria-label="courses table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eafaf1" }}>
              {[
                "Course Name",
                "Lecturer",
                "Year",
                "Semester",
                "Next Class",
                "Next Assignment",
                "Final Average",
              ].map(h => (
                <TableCell
                  key={h}
                  sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id}>
                <TableCell>
                  <Link to={`/forms/courses/${c.id}`}>{c.courseName}</Link>
                </TableCell>
                <TableCell>{c.lecturer}</TableCell>
                <TableCell>{c.year}</TableCell>
                <TableCell>{c.semester}</TableCell>
                <TableCell>
                  {new Date(c.nextClass).toLocaleString("en-GB", {
                    hour12: false,
                  })}
                </TableCell>
                <TableCell>
                  {new Date(c.nextAssignment).toLocaleString("en-GB", {
                    hour12: false,
                  })}
                </TableCell>
                <TableCell>{c.grades?.finalAverage ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
