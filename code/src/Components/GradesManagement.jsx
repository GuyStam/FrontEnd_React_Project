import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { listGrades, deleteGrade } from "../assets/firebase/Grades";
import GradeDialog from "./GradeDialog";
import AddGradeRow from "./AddGradeRow";
import GradeRow from "./GradeRow";

export default function GradesManagement() {
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleAdd = (newGrade) => {
    setGrades((prev) => [...prev, newGrade]);
  };

  const handleDelete = async (id) => {
    await deleteGrade(id);
    setGrades((prev) => prev.filter((g) => g.id !== id));
  };

  const handleEdit = (updated) => {
    setGrades((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  const handleView = (grade) => {
    setSelectedGrade(grade);
    setDialogOpen(true);
  };

  const filtered = grades.filter((g) =>
    Object.values(g).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
      >
        Grades Management
      </Typography>

      <TextField
        label="Search"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              {[
                "Course Name",
                "Lecturer",
                "Year",
                "Semester",
                "Exam Grade",
                "Assignment Grade",
                "Final Average",
                "Actions",
              ].map((label) => (
                <TableCell
                  key={label}
                  sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <AddGradeRow onAdd={handleAdd} />
            {filtered.map((grade) => (
              <GradeRow
                key={grade.id}
                grade={grade}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <GradeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        grade={selectedGrade}
      />
    </Box>
  );
}
