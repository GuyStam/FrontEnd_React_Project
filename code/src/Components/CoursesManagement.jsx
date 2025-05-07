// src/Components/CoursesManagement.jsx
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
  LinearProgress,
  Box
} from "@mui/material";
import { addCourses, listCourses } from "../assets/firebase/Courses";
import "../App.css";

// 10 default MIS-related courses
const defaultCourses = [
  { courseName: "Business Information Systems", lecturer: "Dr. Smith", year: 2025, semester: "A", nextClass: "2025-09-01T10:00", nextAssignment: "2025-09-08T23:59", grades: { finalAverage: "" } },
  { courseName: "Database Management",            lecturer: "Prof. Lee",  year: 2025, semester: "A", nextClass: "2025-09-02T12:00", nextAssignment: "2025-09-09T23:59", grades: { finalAverage: "" } },
  { courseName: "ERP Systems",                    lecturer: "Dr. Patel", year: 2025, semester: "B", nextClass: "2025-10-05T09:00", nextAssignment: "2025-10-12T23:59", grades: { finalAverage: "" } },
  { courseName: "Data Analytics",                 lecturer: "Dr. Cohen", year: 2025, semester: "B", nextClass: "2025-10-06T11:00", nextAssignment: "2025-10-13T23:59", grades: { finalAverage: "" } },
  { courseName: "Systems Analysis & Design",      lecturer: "Dr. Garcia",year: 2025, semester: "A", nextClass: "2025-09-03T14:00", nextAssignment: "2025-09-10T23:59", grades: { finalAverage: "" } },
  { courseName: "Excel Modeling",                 lecturer: "Dr. Alvarez",year: 2025, semester: "A", nextClass: "2025-09-04T16:00", nextAssignment: "2025-09-11T23:59", grades: { finalAverage: "" } },
  { courseName: "Information Security",           lecturer: "Prof. Rossi",year: 2025, semester: "B", nextClass: "2025-10-07T13:00", nextAssignment: "2025-10-14T23:59", grades: { finalAverage: "" } },
  { courseName: "Web Programming",                lecturer: "Prof. Kumar",year: 2025, semester: "B", nextClass: "2025-10-08T15:00", nextAssignment: "2025-10-15T23:59", grades: { finalAverage: "" } },
  { courseName: "Decision Support Systems",       lecturer: "Prof. Wang", year: 2025, semester: "A", nextClass: "2025-09-05T09:30", nextAssignment: "2025-09-12T23:59", grades: { finalAverage: "" } },
  { courseName: "Business Process Management",    lecturer: "Prof. Nguyen",year: 2025, semester: "A", nextClass: "2025-09-06T11:30", nextAssignment: "2025-09-13T23:59", grades: { finalAverage: "" } }
];

const initialCourse = {
  courseName: "",
  lecturer: "",
  year: 2025,
  semester: "",
  nextClass: new Date().toISOString().slice(0,16),
  nextAssignment: new Date().toISOString().slice(0,16),
  grades: { finalAverage: "" }
};

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState(initialCourse);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // on mount: fetch from Firestore, merge with defaults
  useEffect(() => {
    listCourses().then(fetched => {
      const merged = [...defaultCourses, ...fetched];
      setCourses(merged);
      localStorage.setItem("courses", JSON.stringify(merged));
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewCourse(prev =>
      name === "finalAverage"
        ? { ...prev, grades: { finalAverage: value } }
        : { ...prev, [name]: value }
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    addCourses(newCourse)
      .then(() => listCourses())
      .then(fetched => {
        const merged = [...defaultCourses, ...fetched];
        setCourses(merged);
        localStorage.setItem("courses", JSON.stringify(merged));
        setSuccess("Course added");
        setNewCourse(initialCourse);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "Assistant", fontWeight: "bold", mb: 3 }}>
        Courses Management
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <TextField label="Course Name"    name="courseName"   value={newCourse.courseName}   onChange={handleChange} />
        <TextField label="Lecturer"       name="lecturer"     value={newCourse.lecturer}     onChange={handleChange} />
        <TextField label="Year"           name="year"         type="number" value={newCourse.year}        onChange={handleChange} />
        <TextField select label="Semester" name="semester"   value={newCourse.semester}     onChange={handleChange}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="Summer">Summer</MenuItem>
        </TextField>
        <TextField label="Next Class"     name="nextClass"    type="datetime-local" InputLabelProps={{ shrink:true }} 
          value={newCourse.nextClass}     onChange={handleChange} />
        <TextField label="Next Assignment" name="nextAssignment" type="datetime-local" InputLabelProps={{ shrink:true }} 
          value={newCourse.nextAssignment} onChange={handleChange} />
        <TextField label="Final Average"  name="finalAverage" type="number" value={newCourse.grades.finalAverage} onChange={handleChange} />
      </Box>

      <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#7FC243", mb: 2 }}>
        Add Course
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
// CoursesManagement.jsx