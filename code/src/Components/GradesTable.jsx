// src/Components/GradesTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import './App.css';

export default function GradesTable({ grades, onRemove }) {
  // חישוב ממוצע משוקלל
  const weightedAvg = grades.length
    ? grades
        .reduce(
          (sum, g) =>
            sum + (Number(g.grade) * Number(g.weight)) / 100,
          0
        )
        .toFixed(2)
    : null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#eee" }}>
            <TableCell>Description</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Weight (%)</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {grades.map((g, idx) => (
            <TableRow key={idx}>
              <TableCell>{g.description}</TableCell>
              <TableCell>{g.grade}</TableCell>
              <TableCell>{g.weight}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onRemove(idx)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {weightedAvg !== null && (
            <TableRow>
              {/* תווית בשורה הראשונה */}
              <TableCell><strong>Weighted Avg</strong></TableCell>
              {/* ממוצע משוקלל מתחת לעמודת ה-Grade */}
              <TableCell><strong>{weightedAvg}</strong></TableCell>
              {/* שתי תאים ריקים ל־Weight ו־Action */}
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
