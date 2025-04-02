// CoursesTable.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function CoursesTable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h2>Courses Table</h2>
      <Button 
        variant="contained" 
        onClick={() => navigate("/add-course")}
        style={{ marginBottom: "1rem" }}
      >
        Add New Course
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Next Class</TableCell>
              <TableCell>Next Assignment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, idx) => (
              <TableRow key={idx}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.lecturer}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.nextClass}</TableCell>
                <TableCell>{course.nextAssignment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
