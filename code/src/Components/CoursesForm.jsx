// CoursesForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import CoursesTable from "./CoursesTable";

export default function CoursesForm() {
  // מערך הקורסים (לטבלה)
  const [courses, setCourses] = useState([]);

  // שדות הטופס
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
    nextClass: "",
    nextAssignment: ""
  });

  // טעינה חד-פעמית מ-localStorage
  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  // שינוי בשדה אחד של הטופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  // שמירה בלחיצה על "Save"
  const handleSubmit = () => {
    const updatedCourses = [...courses, newCourse];
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setCourses(updatedCourses);

    // איפוס השדות של הטופס
    setNewCourse({
      courseName: "",
      lecturer: "",
      year: "",
      semester: "",
      nextClass: "",
      nextAssignment: ""
    });
  };

  // מחיקת קורס לפי אינדקס
  const handleRemoveCourse = (indexToRemove) => {
    const updated = [...courses];
    updated.splice(indexToRemove, 1);
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
  };

  return (
    <div>
      <h1>Courses Form</h1>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Add New Course</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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

        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: "1rem" }} sx={{backgroundColor: "#7FC242"}}>
          Save
        </Button>
      </div>

      {/* הצגת טבלת הקורסים */}
      <CoursesTable courses={courses} onRemove={handleRemoveCourse} />
    </div>
  );
}
