import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "../App.css";

export default function GradesManagement() {
  const [courses, setCourses] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState("");
  const [grades, setGrades] = useState({
    examGrade: "",
    assignmentGrade: "",
    finalAverage: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) setCourses(JSON.parse(stored));
  }, []);

  const handleSelect = (e) => {
    const idx = e.target.value;
    setSelectedIdx(idx);
    setErrors({});
    if (idx !== "") {
      const g = courses[idx].grades || {};
      setGrades({
        examGrade: g.examGrade ?? "",
        assignmentGrade: g.assignmentGrade ?? "",
        finalAverage: g.finalAverage ?? "",
      });
    } else {
      setGrades({ examGrade: "", assignmentGrade: "", finalAverage: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setGrades((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (selectedIdx === "") {
      newErrors.course = "Select a course";
    }
    ["examGrade", "assignmentGrade", "finalAverage"].forEach((f) => {
      const val = grades[f];
      if (val === "") {
        newErrors[f] = "Required";
      } else {
        const num = Number(val);
        if (isNaN(num) || num < 0 || num > 100) {
          newErrors[f] = "Must be 0–100";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    const updated = [...courses];
    updated[selectedIdx].grades = {
      examGrade: Number(grades.examGrade),
      assignmentGrade: Number(grades.assignmentGrade),
      finalAverage: Number(grades.finalAverage),
    };
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
    setSuccess("Grades saved!");
  };

  const handleRemove = (idx) => {
    const updated = [...courses];
    delete updated[idx].grades;
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
    setSuccess("Grades removed");
    if (selectedIdx === String(idx)) {
      setSelectedIdx("");
      setGrades({ examGrade: "", assignmentGrade: "", finalAverage: "" });
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    save();
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: "#000", // צבע שחור
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
       Grades Management
      </Typography>

      <TextField
        select
        label="Course"
        value={selectedIdx}
        onChange={handleSelect}
        error={!!errors.course}
        helperText={errors.course}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">-- Select Course --</MenuItem>
        {courses.map((c, idx) => (
          <MenuItem key={idx} value={String(idx)}>
            {c.courseName}
          </MenuItem>
        ))}
      </TextField>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <TextField
          name="examGrade"
          label="Exam Grade"
          type="number"
          value={grades.examGrade}
          onChange={handleChange}
          error={!!errors.examGrade}
          helperText={errors.examGrade}
          required
        />
        <TextField
          name="assignmentGrade"
          label="Assignment Grade"
          type="number"
          value={grades.assignmentGrade}
          onChange={handleChange}
          error={!!errors.assignmentGrade}
          helperText={errors.assignmentGrade}
          required
        />
        <TextField
          name="finalAverage"
          label="Final Average"
          type="number"
          value={grades.finalAverage}
          onChange={handleChange}
          error={!!errors.finalAverage}
          helperText={errors.finalAverage}
          required
        />
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!selectedIdx}
        sx={{ backgroundColor: "#7FC243", mb: 3 }}
      >
        Save
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Final Avg</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((c, idx) => (
              <TableRow key={idx}>
                <TableCell>{c.courseName}</TableCell>
                <TableCell>{c.grades?.examGrade ?? "-"}</TableCell>
                <TableCell>{c.grades?.assignmentGrade ?? "-"}</TableCell>
                <TableCell>{c.grades?.finalAverage ?? "-"}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => setSelectedIdx(String(idx))}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleRemove(idx)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
}
