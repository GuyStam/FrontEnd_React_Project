// CoursesForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";

export default function CoursesForm() {
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
    nextClass: "",
    nextAssignment: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // טוענים קורסים קיימים (או מערך ריק אם לא קיים)
    const existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
    // מוסיפים את הקורס החדש למערך
    existingCourses.push(newCourse);
    // שומרים חזרה ל-localStorage
    localStorage.setItem("courses", JSON.stringify(existingCourses));
    // חוזרים לרשימת הקורסים
    navigate("/courses");
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <TextField
          name="courseName"
          label="Course Name"
          value={newCourse.courseName}
          onChange={handleChange}
        />
        <TextField
          name="lecturer"
          label="Lecturer"
          value={newCourse.lecturer}
          onChange={handleChange}
        />
        <TextField
          name="year"
          label="Year"
          type="number"
          value={newCourse.year}
          onChange={handleChange}
        />
        <TextField
          select
          name="semester"
          label="Semester"
          value={newCourse.semester}
          onChange={handleChange}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </TextField>
        <TextField
          name="nextClass"
          label="Next Class"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newCourse.nextClass}
          onChange={handleChange}
        />
        <TextField
          name="nextAssignment"
          label="Next Assignment"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newCourse.nextAssignment}
          onChange={handleChange}
        />
      </div>
      <Button 
        variant="contained" 
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
}
