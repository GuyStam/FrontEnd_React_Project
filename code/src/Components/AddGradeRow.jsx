import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { listCourses } from "../assets/firebase/Courses";
import { addGrade } from "../assets/firebase/Grades";

export default function AddGradeRow({ onAdd }) {
  const [courses, setCourses] = useState([]);
  const [newGrade, setNewGrade] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
    examGrade: "",
    assignmentGrade: "",
    finalAverage: "",
  });

  useEffect(() => {
    listCourses()
      .then((data) => setCourses(data))
      .catch(console.error);
  }, []);

  // חישוב ממוצע סופי ברגע שהשדות מתעדכנים
  useEffect(() => {
    const exam = parseFloat(newGrade.examGrade);
    const assignment = parseFloat(newGrade.assignmentGrade);

    if (!isNaN(exam) && !isNaN(assignment)) {
      const avg = ((exam + assignment) / 2).toFixed(1);
      setNewGrade((prev) => ({ ...prev, finalAverage: avg }));
    } else {
      setNewGrade((prev) => ({ ...prev, finalAverage: "" }));
    }
  }, [newGrade.examGrade, newGrade.assignmentGrade]);

  const handleChange = (field, value) => {
    setNewGrade((prev) => ({ ...prev, [field]: value }));

    // אם נבחר קורס – משלים גם מרצה, שנה, סמסטר
    if (field === "courseName") {
      const selected = courses.find((c) => c.courseName === value);
      if (selected) {
        setNewGrade((prev) => ({
          ...prev,
          courseName: selected.courseName,
          lecturer: selected.lecturer,
          year: selected.year,
          semester: selected.semester,
        }));
      }
    }
  };

  const handleSave = async () => {
    if (!newGrade.courseName || isNaN(newGrade.finalAverage)) return;

    const id = await addGrade(newGrade);
    onAdd({ id, ...newGrade });

    setNewGrade({
      courseName: "",
      lecturer: "",
      year: "",
      semester: "",
      examGrade: "",
      assignmentGrade: "",
      finalAverage: "",
    });
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          select
          size="small"
          value={newGrade.courseName}
          onChange={(e) => handleChange("courseName", e.target.value)}
          fullWidth
        >
          {courses.map((c) => (
            <MenuItem key={c.id} value={c.courseName}>
              {c.courseName}
            </MenuItem>
          ))}
        </TextField>
      </TableCell>
      <TableCell>{newGrade.lecturer}</TableCell>
      <TableCell>{newGrade.year}</TableCell>
      <TableCell>{newGrade.semester}</TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={newGrade.examGrade}
          onChange={(e) => handleChange("examGrade", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={newGrade.assignmentGrade}
          onChange={(e) => handleChange("assignmentGrade", e.target.value)}
        />
      </TableCell>
      <TableCell>{newGrade.finalAverage || "N/A"}</TableCell>
      <TableCell>
        <IconButton onClick={handleSave} color="primary">
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
