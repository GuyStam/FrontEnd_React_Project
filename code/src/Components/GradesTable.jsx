import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  listGrades,
  addGrade,
  deleteGrade,
} from "../assets/firebase/Grades";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

export default function GradesTable() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [newGrade, setNewGrade] = useState({
    courseName: "",
    examGrade: "",
    assignmentGrade: "",
    finalAverage: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith("/management");

  useEffect(() => {
    listGrades()
      .then(setGrades)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleDelete = async (id) => {
    await deleteGrade(id);
    setGrades((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSaveNewGrade = async () => {
    if (!newGrade.courseName || !newGrade.examGrade) return;
    const newId = await addGrade(newGrade);
    setGrades((prev) => [...prev, { id: newId, ...newGrade }]);
    setNewGrade({
      courseName: "",
      examGrade: "",
      assignmentGrade: "",
      finalAverage: "",
    });
  };

  const filtered = grades.filter((g) =>
    Object.values(g)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal =
      typeof a[orderBy] === "string"
        ? a[orderBy].toLowerCase()
        : a[orderBy] ?? "";
    const bVal =
      typeof b[orderBy] === "string"
        ? b[orderBy].toLowerCase()
        : b[orderBy] ?? "";
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isManagement ? "ניהול ציונים" : "טבלת ציונים"}
      </Typography>

      <TextField
        label="חיפוש כללי (Ctrl+F)"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {[
                  { id: "courseName", label: "שם קורס" },
                  { id: "examGrade", label: "מבחן" },
                  { id: "assignmentGrade", label: "עבודה" },
                  { id: "finalAverage", label: "ממוצע" },
                ].map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : "asc"}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {isManagement && <TableCell>פעולות</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {isManagement && (
                <TableRow>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newGrade.courseName}
                      onChange={(e) =>
                        setNewGrade((prev) => ({
                          ...prev,
                          courseName: e.target.value,
                        }))
                      }
                      placeholder="שם קורס"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newGrade.examGrade}
                      onChange={(e) =>
                        setNewGrade((prev) => ({
                          ...prev,
                          examGrade: e.target.value,
                        }))
                      }
                      placeholder="מבחן"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newGrade.assignmentGrade}
                      onChange={(e) =>
                        setNewGrade((prev) => ({
                          ...prev,
                          assignmentGrade: e.target.value,
                        }))
                      }
                      placeholder="עבודה"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newGrade.finalAverage}
                      onChange={(e) =>
                        setNewGrade((prev) => ({
                          ...prev,
                          finalAverage: e.target.value,
                        }))
                      }
                      placeholder="ממוצע"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleSaveNewGrade} color="primary">
                      <SaveIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}

              {sorted.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>{g.courseName}</TableCell>
                  <TableCell>{g.examGrade}</TableCell>
                  <TableCell>{g.assignmentGrade}</TableCell>
                  <TableCell>{g.finalAverage}</TableCell>
                  {isManagement && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigate(`/management/grades/${g.id}`)
                        }
                        sx={{ mr: 1 }}
                      >
                        ערוך
                      </Button>
                      <IconButton
                        onClick={() => handleDelete(g.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
