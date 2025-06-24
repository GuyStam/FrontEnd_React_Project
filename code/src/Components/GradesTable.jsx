import React, { useEffect, useState } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { listGrades } from '../assets/firebase/Grades';

export default function GradesTable() {
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('courseName');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await listGrades();
      if (mounted) {
        const unique = [];
        const seen = new Set();
        for (const g of data) {
          if (!seen.has(g.courseName)) {
            unique.push(g);
            seen.add(g.courseName);
          }
        }
        setGrades(unique);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const sorted = [...grades].sort((a, b) => {
    if (typeof a[sortColumn] === 'number') {
      return sortDirection === 'asc'
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }
    return sortDirection === 'asc'
      ? a[sortColumn].localeCompare(b[sortColumn])
      : b[sortColumn].localeCompare(a[sortColumn]);
  });

  const filtered = sorted.filter((g) =>
    Object.values(g).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {['courseName', 'examGrade', 'assignmentGrade', 'finalAverage'].map((key) => (
                <TableCell
                  key={key}
                  sx={{ fontFamily: 'Assistant', fontWeight: 'bold', minWidth: 140 }}
                >
                  <TableSortLabel
                    active={sortColumn === key}
                    direction={sortColumn === key ? sortDirection : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontFamily: 'Assistant' }}>
                  No grades found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.courseName}</TableCell>
                  <TableCell>{grade.examGrade}</TableCell>
                  <TableCell>{grade.assignmentGrade}</TableCell>
                  <TableCell>{grade.finalAverage}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
