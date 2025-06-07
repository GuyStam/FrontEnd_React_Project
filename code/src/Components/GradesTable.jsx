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
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import { listGrades } from "../assets/firebase/Grades";
import GradeRow from "./GradeRow";
import GradeDialog from "./GradeDialog";

export default function GradesTable() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await listGrades();
      if (mounted) setGrades(data);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleOpenDialog = (grade) => {
    setSelectedGrade(grade);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedGrade(null);
    setOpen(false);
  };

  const filtered = grades.filter((g) =>
    Object.values(g).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = typeof a[orderBy] === "string" ? a[orderBy].toLowerCase() : a[orderBy] ?? "";
    const bVal = typeof b[orderBy] === "string" ? b[orderBy].toLowerCase() : b[orderBy] ?? "";
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
      >
        My Grades
      </Typography>

      <TextField
        label="Search"
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
                {["courseName", "lecturer", "year", "semester", "examGrade", "assignmentGrade", "finalAverage"].map(
                  (col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? orderDirection : "asc"}
                        onClick={() => handleSort(col)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((g) => (
                <GradeRow key={g.id} grade={g} onView={handleOpenDialog} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <GradeDialog open={open} onClose={handleCloseDialog} grade={selectedGrade} />
    </Box>
  );
}
