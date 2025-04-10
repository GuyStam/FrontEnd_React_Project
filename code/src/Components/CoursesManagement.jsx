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
  TableRow
} from "@mui/material";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
    nextClass: "",
    nextAssignment: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) setCourses(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const saveToStorage = (updated) => {
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
  };

  const handleSubmit = () => {
    const updated = [...courses];
    if (editIndex !== null) {
      updated[editIndex] = newCourse;
      setEditIndex(null);
      setSuccess("Course updated successfully");
    } else {
      updated.push(newCourse);
      setSuccess("Course added successfully");
    }
    saveToStorage(updated);
    setNewCourse({
      courseName: "",
      lecturer: "",
      year: "",
      semester: "",
      nextClass: "",
      nextAssignment: ""
    });
  };

  const handleEdit = (index) => {
    setNewCourse(courses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    saveToStorage(updated);
    setSuccess("Course removed successfully");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(courses, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "courses.json";
    link.click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      saveToStorage(data);
      setSuccess("Courses uploaded successfully");
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Courses Management</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        <TextField name="courseName" label="Course Name" value={newCourse.courseName} onChange={handleChange} />
        <TextField name="lecturer" label="Lecturer" value={newCourse.lecturer} onChange={handleChange} />
        <TextField name="year" label="Year" type="number" value={newCourse.year} onChange={handleChange} />
        <TextField select name="semester" label="Semester" value={newCourse.semester} onChange={handleChange}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="Summer">Summer</MenuItem>
        </TextField>
        <TextField name="nextClass" label="Next Class" type="date" InputLabelProps={{ shrink: true }} value={newCourse.nextClass} onChange={handleChange} />
        <TextField name="nextAssignment" label="Next Assignment" type="date" InputLabelProps={{ shrink: true }} value={newCourse.nextAssignment} onChange={handleChange} />
      </div>

      <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#7FC242", mr: 2 }}>
        {editIndex !== null ? "Update Course" : "Add Course"}
      </Button>

      <Button variant="outlined" component="label" sx={{ mr: 2 }}>
        Upload JSON
        <input type="file" accept=".json" hidden onChange={handleUpload} />
      </Button>

      <Button variant="outlined" onClick={handleDownload}>
        Download JSON
      </Button>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eee" }}>
              <TableCell>Course Name</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Next Class</TableCell>
              <TableCell>Next Assignment</TableCell>
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
                <TableCell>{c.nextClass}</TableCell>
                <TableCell>{c.nextAssignment}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(idx)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(idx)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success" sx={{ width: "100%" }}>{success}</Alert>
      </Snackbar>
    </div>
  );
}
