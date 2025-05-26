import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getGrade, updateGrade } from "../assets/firebase/Grades";

export default function GradesManagement() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    courseName: "",
    examGrade: "",
    assignmentGrade: "",
    finalAverage: "",
  });

  useEffect(() => {
    if (gradeId) {
      getGrade(gradeId)
        .then(data => {
          if (data) setValues(data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [gradeId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateGrade(gradeId, values)
      .then(() => navigate("/management/grades"))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>עריכת ציון</Typography>
      <TextField fullWidth margin="normal" label="שם קורס" name="courseName" value={values.courseName} onChange={handleChange} />
      <TextField fullWidth margin="normal" label="ציון במבחן" name="examGrade" value={values.examGrade} onChange={handleChange} />
      <TextField fullWidth margin="normal" label="ציון בעבודה" name="assignmentGrade" value={values.assignmentGrade} onChange={handleChange} />
      <TextField fullWidth margin="normal" label="ממוצע סופי" name="finalAverage" value={values.finalAverage} onChange={handleChange} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>שמור</Button>
    </Box>
  );
}
