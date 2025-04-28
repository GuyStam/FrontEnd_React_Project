import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "../App.css";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: 2025,
    semester: "",
    nextClass: new Date().toISOString().slice(0, 16),
    nextAssignment: new Date().toISOString().slice(0, 16),
    grades: { finalAverage: "" },
  });
  const [editIndex, setEditIndex] = useState(null);
  const [success, setSuccess] = useState("");

  // Load courses and ensure each has a grades.finalAverage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("courses") || "[]");
    const normalized = stored.map((c) => ({
      ...c,
      grades: { finalAverage: c.grades?.finalAverage ?? "" },
    }));
    setCourses(normalized);
  }, []);

  const save = (updated) => {
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "finalAverage") {
      setNewCourse((prev) => ({
        ...prev,
        grades: { finalAverage: value },
      }));
    } else {
      setNewCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const updated = [...courses];
    if (editIndex !== null) {
      updated[editIndex] = newCourse;
      setSuccess("Course updated");
    } else {
      updated.push(newCourse);
      setSuccess("Course added");
    }
    save(updated);
    setEditIndex(null);
    setNewCourse({
      courseName: "",
      lecturer: "",
      year: 2025,
      semester: "",
      nextClass: new Date().toISOString().slice(0, 16),
      nextAssignment: new Date().toISOString().slice(0, 16),
      grades: { finalAverage: "" },
    });
  };

  const handleEdit = (idx) => {
    setNewCourse({ ...courses[idx] });
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    const updated = courses.filter((_, i) => i !== idx);
    save(updated);
    setSuccess("Course removed");
    if (editIndex === idx) {
      setEditIndex(null);
      setNewCourse({
        courseName: "",
        lecturer: "",
        year: 2025,
        semester: "",
        nextClass: new Date().toISOString().slice(0, 16),
        nextAssignment: new Date().toISOString().slice(0, 16),
        grades: { finalAverage: "" },
      });
    }
  };

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
        Courses Management
      </Typography>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: 16 }}>
        <TextField
          label="Course Name"
          name="courseName"
          value={newCourse.courseName}
          onChange={handleChange}
        />
        <TextField
          label="Lecturer"
          name="lecturer"
          value={newCourse.lecturer}
          onChange={handleChange}
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          value={newCourse.year}
          onChange={handleChange}
        />
        <TextField select label="Semester" name="semester" value={newCourse.semester} onChange={handleChange}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="Summer">Summer</MenuItem>
        </TextField>
        <TextField
          label="Next Class"
          name="nextClass"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={newCourse.nextClass}
          onChange={handleChange}
        />
        <TextField
          label="Next Assignment"
          name="nextAssignment"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={newCourse.nextAssignment}
          onChange={handleChange}
        />
        <TextField
          label="Final Average"
          name="finalAverage"
          type="number"
          value={newCourse.grades.finalAverage}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ backgroundColor: "#7FC243", mb: 2 }}
      >
        {editIndex !== null ? "Update" : "Add"}
      </Button>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Next Class</TableCell>
              <TableCell>Next Assignment</TableCell>
              <TableCell>Final Avg</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((c, idx) => (
              <TableRow key={idx}>
                <TableCell>{c.courseName}</TableCell>
                <TableCell>{c.lecturer}</TableCell>
                <TableCell>{c.year}</TableCell>
                <TableCell>{c.semester}</TableCell>
                <TableCell>{new Date(c.nextClass).toLocaleString("en-GB")}</TableCell>
                <TableCell>{new Date(c.nextAssignment).toLocaleString("en-GB")}</TableCell>
                <TableCell>{c.grades.finalAverage}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(idx)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(idx)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </div>
  );
}
