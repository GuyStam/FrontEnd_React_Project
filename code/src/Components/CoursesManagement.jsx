// src/Components/CoursesManagement.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  listCourses,
  addCourses,
  updateCourse,
  deleteCourse,
} from "../assets/firebase/Courses";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: new Date().getFullYear(),
    semester: "A",
    nextClass: new Date().toISOString().slice(0, 16),
    nextAssignment: new Date().toISOString().slice(0, 16),
    grades: { finalAverage: "" },
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

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
    async function fetchData() {
      setLoading(true);
      const all = await listCourses();
      if (all.length === 0) {
        for (let c of seedCourses) {
          await addCourses(c);
        }
        setCourses(await listCourses());
      } else {
        setCourses(all);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "finalAverage") {
      setNewCourse(prev => ({
        ...prev,
        grades: { finalAverage: value }
      }));
    } else {
      setNewCourse(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateCourse(editId, {
          courseName: newCourse.courseName,
          lecturer: newCourse.lecturer,
          year: Number(newCourse.year),
          semester: newCourse.semester,
          nextClass: newCourse.nextClass,
          nextAssignment: newCourse.nextAssignment,
          grades: { finalAverage: Number(newCourse.grades.finalAverage) }
        });
        setMessage("Course updated");
      } else {
        await addCourses(newCourse);
        setMessage("Course added");
      }
      setCourses(await listCourses());
      setEditId(null);
      setNewCourse({
        courseName: "",
        lecturer: "",
        year: new Date().getFullYear(),
        semester: "A",
        nextClass: new Date().toISOString().slice(0, 16),
        nextAssignment: new Date().toISOString().slice(0, 16),
        grades: { finalAverage: "" },
      });
    } catch {
      setMessage("Error saving course");
    }
    setLoading(false);
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setNewCourse({
      courseName: course.courseName,
      lecturer: course.lecturer,
      year: course.year,
      semester: course.semester,
      nextClass: course.nextClass.slice(0, 16),
      nextAssignment: course.nextAssignment.slice(0, 16),
      grades: { finalAverage: course.grades?.finalAverage?.toString() ?? "" },
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteCourse(id);
      setCourses(await listCourses());
      setMessage("Course deleted");
    } catch {
      setMessage("Error deleting course");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 2 }}>
        Courses Management
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}
      >
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
          sx={{ width: 100 }}
        />
        <TextField
          select
          label="Semester"
          name="semester"
          value={newCourse.semester}
          onChange={handleChange}
          sx={{ width: 120 }}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="Summer">Summer</MenuItem>
        </TextField>
        <TextField
          label="Next Class"
          name="nextClass"
          type="datetime-local"
          value={newCourse.nextClass}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Next Assignment"
          name="nextAssignment"
          type="datetime-local"
          value={newCourse.nextAssignment}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Final Average"
          name="finalAverage"
          type="number"
          value={newCourse.grades.finalAverage}
          onChange={handleChange}
          sx={{ width: 140 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: '#7FC243', alignSelf: 'center', height: 40 }}
        >
          {editId ? 'Update' : 'Add'}
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#eafaf1' }}>
              <TableRow>
                {["Name","Lecturer","Year","Semester","Next Class","Next Assignment","Avg","Actions"].map(h => (
                  <TableCell key={h} sx={{ fontFamily:'Assistant', fontWeight:'bold' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.courseName}</TableCell>
                  <TableCell>{c.lecturer}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>{c.semester}</TableCell>
                  <TableCell>
                    {new Date(c.nextClass).toLocaleString('en-GB', { hour12: false })}
                  </TableCell>
                  <TableCell>
                    {new Date(c.nextAssignment).toLocaleString('en-GB', { hour12: false })}
                  </TableCell>
                  <TableCell>{c.grades?.finalAverage ?? "N/A"}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(c)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(c.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')}>
        <Alert severity="info">{message}</Alert>
      </Snackbar>
    </Box>
  );
}
