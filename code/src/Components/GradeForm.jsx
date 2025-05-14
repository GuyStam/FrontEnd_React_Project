// src/Components/GradesForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TableSortLabel,
  CircularProgress,
  Button,
} from "@mui/material";              // הוספנו Box
import { useNavigate, useParams } from "react-router-dom";
import { listGrades, getGrade } from "../assets/firebase/Grades";

export default function GradesForm() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");

  const navigate = useNavigate();
  const { gradeId } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (gradeId) {
        const single = await getGrade(gradeId);
        setGrades(single ? [single] : []);
      } else {
        const all = await listGrades();
        setGrades(all);
      }
      setLoading(false);
    };
    load();
  }, [gradeId]);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const valid = grades.filter(
    (g) =>
      g.examGrade !== "" &&
      g.assignmentGrade !== "" &&
      g.finalAverage !== ""
  );

  const filtered = valid.filter((g) =>
    gradeId
      ? true
      : (
          g.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.examGrade.toString().includes(searchTerm) ||
          g.assignmentGrade.toString().includes(searchTerm) ||
          g.finalAverage.toString().includes(searchTerm)
        )
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal =
      orderBy === "courseName" ? a.courseName.toLowerCase() : a[orderBy];
    const bVal =
      orderBy === "courseName" ? b.courseName.toLowerCase() : b[orderBy];
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        {gradeId ? "Grade Details" : "Grades Viewer"}
      </Typography>

      {!gradeId && (
        <TextField
          label="Search Course / Grades"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : sorted.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {gradeId ? "Grade not found." : "No grades to display."}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                {[
                  { id: "courseName", label: "Course Name" },
                  { id: "examGrade", label: "Exam Grade" },
                  { id: "assignmentGrade", label: "Assignment Grade" },
                  { id: "finalAverage", label: "Final Average" },
                ].map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={!gradeId && orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : "asc"}
                      onClick={() => !gradeId && handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => navigate(`/forms/grades/${g.id}`)}
                      sx={{ textTransform: "none" }}
                    >
                      {g.courseName}
                    </Button>
                  </TableCell>
                  <TableCell>{g.examGrade}</TableCell>
                  <TableCell>{g.assignmentGrade}</TableCell>
                  <TableCell>{g.finalAverage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
