import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
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
  CircularProgress
} from "@mui/material";
import {
  listGrades,
  addGrade,
  updateGrade,
  deleteGrade
} from "../assets/firebase/Grades";

export default function GradesManagement() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGrade, setNewGrade] = useState({
    courseName: "",
    examGrade: "",
    assignmentGrade: "",
    finalAverage: ""
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await listGrades();
      setGrades(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { courseName, examGrade, assignmentGrade, finalAverage } = newGrade;
    if (!courseName || !examGrade || !assignmentGrade || !finalAverage) {
      setMessage("All fields are required");
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        await updateGrade(editId, newGrade);
        setMessage("Grade updated");
      } else {
        await addGrade(newGrade);
        setMessage("Grade added");
      }
      const updated = await listGrades();
      setGrades(updated);
      setEditId(null);
      setNewGrade({ courseName: "", examGrade: "", assignmentGrade: "", finalAverage: "" });
    } catch (err) {
      console.error(err);
      setMessage("Error saving grade");
    }
    setLoading(false);
  };

  const handleEdit = (grade) => {
    setEditId(grade.id);
    setNewGrade({
      courseName: grade.courseName,
      examGrade: grade.examGrade,
      assignmentGrade: grade.assignmentGrade,
      finalAverage: grade.finalAverage
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteGrade(id);
      const updated = await listGrades();
      setGrades(updated);
      setMessage("Grade deleted");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting grade");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 2 }}>
        Grades Management
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          label="Course Name"
          name="courseName"
          value={newGrade.courseName}
          onChange={handleChange}
        />
        <TextField
          label="Exam Grade"
          name="examGrade"
          type="number"
          value={newGrade.examGrade}
          onChange={handleChange}
        />
        <TextField
          label="Assignment Grade"
          name="assignmentGrade"
          type="number"
          value={newGrade.assignmentGrade}
          onChange={handleChange}
        />
        <TextField
          label="Final Average"
          name="finalAverage"
          type="number"
          value={newGrade.finalAverage}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#7FC243', alignSelf: 'center', height: 40 }}
          disabled={loading}
        >
          {editId ? 'Update' : 'Add'}
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#eafaf1' }}>
              <TableRow>
                {['Course', 'Exam', 'Assignment', 'Average', 'Actions'].map((h) => (
                  <TableCell key={h} sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>{g.courseName}</TableCell>
                  <TableCell>{g.examGrade}</TableCell>
                  <TableCell>{g.assignmentGrade}</TableCell>
                  <TableCell>{g.finalAverage}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(g)} sx={{ mr: 1 }}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(g.id)}>Delete</Button>
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
