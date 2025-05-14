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
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import {
  listGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../assets/firebase/Grades";

export default function GradesManagement() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newGrade, setNewGrade] = useState({
    courseName: "",
    examGrade: "",
    assignmentGrade: "",
    finalAverage: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const seedGrades = [
    { courseName: "Database Systems", examGrade: 85, assignmentGrade: 90, finalAverage: 88 },
    { courseName: "Information Security", examGrade: 92, assignmentGrade: 87, finalAverage: 90 },
    { courseName: "Project Management", examGrade: 80, assignmentGrade: 85, finalAverage: 82 },
    { courseName: "ERP Systems", examGrade: 78, assignmentGrade: 81, finalAverage: 80 },
    { courseName: "Business Intelligence", examGrade: 88, assignmentGrade: 84, finalAverage: 86 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const all = await listGrades();
      if (all.length === 0) {
        for (let g of seedGrades) await addGrade(g);
        setGrades(await listGrades());
      } else {
        setGrades(all);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { courseName, examGrade, assignmentGrade, finalAverage } = newGrade;
    if (!courseName || !examGrade || !assignmentGrade || !finalAverage) {
      setMessage("All fields are required");
      return;
    }
    setLoading(true);
    try {
      if (isEditMode) {
        await updateGrade(editId, {
          courseName,
          examGrade: Number(examGrade),
          assignmentGrade: Number(assignmentGrade),
          finalAverage: Number(finalAverage),
        });
        setMessage("Grade updated");
      } else {
        await addGrade({
          courseName,
          examGrade: Number(examGrade),
          assignmentGrade: Number(assignmentGrade),
          finalAverage: Number(finalAverage),
        });
        setMessage("Grade added");
      }
      const updated = await listGrades();
      setGrades(updated);
      setEditId(null);
      setIsEditMode(false);
      setNewGrade({ courseName: "", examGrade: "", assignmentGrade: "", finalAverage: "" });
    } catch (err) {
      console.error(err);
      setMessage("Error saving grade");
    }
    setLoading(false);
  };

  const handleEdit = (grade) => {
    setLoading(true);
    setIsEditMode(true);
    setEditId(grade.id);
    setTimeout(() => {
      setNewGrade({
        courseName: grade.courseName,
        examGrade: grade.examGrade.toString(),
        assignmentGrade: grade.assignmentGrade.toString(),
        finalAverage: grade.finalAverage.toString(),
      });
      setLoading(false);
    }, 300);
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

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField label="Course Name" name="courseName" value={newGrade.courseName} onChange={handleChange} />
        <TextField label="Exam Grade" name="examGrade" type="number" value={newGrade.examGrade} onChange={handleChange} />
        <TextField label="Assignment Grade" name="assignmentGrade" type="number" value={newGrade.assignmentGrade} onChange={handleChange} />
        <TextField label="Final Average" name="finalAverage" type="number" value={newGrade.finalAverage} onChange={handleChange} />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#7FC243', alignSelf: 'center', height: 40 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Update' : 'Add')}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress />
        </Box>
      )}

      {!loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#eafaf1' }}>
              <TableRow>
                {['Course', 'Exam', 'Assignment', 'Average', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map(g => (
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
