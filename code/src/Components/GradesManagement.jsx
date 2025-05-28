import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  listGrades,
  deleteGrade,
  updateGrade,
  addGrade,
} from "../assets/firebase/Grades";

export default function GradesManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newGrade, setNewGrade] = useState({
    courseName: "",
    examGrade: "",
    assignmentGrade: "",
    grades: { finalAverage: "" },
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    listGrades()
      .then(setGrades)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const calculateFinal = (exam, assignment) => {
    const ex = parseFloat(exam);
    const ass = parseFloat(assignment);
    if (!isNaN(ex) && !isNaN(ass)) {
      return ((ex + ass) / 2).toFixed(2);
    }
    return "";
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updated = [...grades];
      updated[index][name] = value;
      updated[index].grades.finalAverage = calculateFinal(updated[index].examGrade, updated[index].assignmentGrade);
      setGrades(updated);
    } else {
      const updated = {
        ...newGrade,
        [name]: value,
      };
      updated.grades.finalAverage = calculateFinal(updated.examGrade, updated.assignmentGrade);
      setNewGrade(updated);
    }
  };

  const handleSave = (index) => {
    setLoading(true);
    updateGrade(grades[index].id, grades[index])
      .then(() => {
        setEditIndex(null);
        setSnackbar({ open: true, message: "Grade Updated" });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      setLoading(true);
      deleteGrade(id)
        .then(() => {
          setGrades(grades.filter((g) => g.id !== id));
          setSnackbar({ open: true, message: "Grade Deleted" });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleAdd = () => {
    setLoading(true);
    addGrade(newGrade)
      .then(() => {
        setNewGrade({
          courseName: "",
          examGrade: "",
          assignmentGrade: "",
          grades: { finalAverage: "" },
        });
        return listGrades().then(setGrades);
      })
      .then(() => setSnackbar({ open: true, message: "Grade Added" }))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const filteredGrades = grades.filter((g) =>
    Object.values(g).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" sx={{ fontFamily: "Assistant", fontWeight: "bold", mb: 3 }}>
        Manage Grades
      </Typography>

      <TextField
        label="Search"
        fullWidth
        size="small"
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ fontFamily: "Assistant", mb: 2 }}>Add New Grade</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            <TextField label="Course Name" name="courseName" value={newGrade.courseName} onChange={handleChange} />
            <TextField label="Exam Grade" name="examGrade" value={newGrade.examGrade} onChange={handleChange} />
            <TextField label="Assignment Grade" name="assignmentGrade" value={newGrade.assignmentGrade} onChange={handleChange} />
            <TextField label="Final Average" name="finalAverage" value={newGrade.grades.finalAverage} onChange={handleChange} disabled />
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add</Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#eee" }}>
                  <TableCell><strong>Course Name</strong></TableCell>
                  <TableCell><strong>Exam Grade</strong></TableCell>
                  <TableCell><strong>Assignment Grade</strong></TableCell>
                  <TableCell><strong>Final Average</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGrades.map((g, index) => (
                  <TableRow key={g.id}>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField name="courseName" value={g.courseName} onChange={(e) => handleChange(e, index)} />
                      ) : (
                        g.courseName
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField name="examGrade" value={g.examGrade} onChange={(e) => handleChange(e, index)} />
                      ) : (
                        g.examGrade ?? "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField name="assignmentGrade" value={g.assignmentGrade} onChange={(e) => handleChange(e, index)} />
                      ) : (
                        g.assignmentGrade ?? "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField name="finalAverage" value={g.grades?.finalAverage || ""} disabled />
                      ) : (
                        g.grades?.finalAverage ?? "N/A"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {editIndex === index ? (
                        <Button variant="contained" onClick={() => handleSave(index)}>Save</Button>
                      ) : (
                        <IconButton onClick={() => setEditIndex(index)}><EditIcon /></IconButton>
                      )}
                      <IconButton color="error" onClick={() => handleDelete(g.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </Box>
  );
}
