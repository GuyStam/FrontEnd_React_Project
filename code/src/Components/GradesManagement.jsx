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
import { listGrades, deleteGrade } from '../assets/firebase/Grades';
import GradeDialog from './GradeDialog';
import AddGradeRow from './AddGradeRow';
import GradeRow from './GradeRow';
import { useNavigate } from 'react-router-dom';

const filterUniqueByCourseName = (grades) => {
  const seen = new Set();
  return grades.filter((grade) => {
    if (seen.has(grade.courseName)) return false;
    seen.add(grade.courseName);
    return true;
  });
};

export default function GradesManagement() {
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState('courseName');
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

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

  const handleEdit = (grade) => {
    navigate(`/management/grades/${grade.id}`);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const filtered = filterUniqueByCourseName(
    grades
      .filter((g) => Object.values(g).join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (typeof a[sortColumn] === 'number') {
          return sortDirection === 'asc'
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        }
        return sortDirection === 'asc'
          ? a[sortColumn].localeCompare(b[sortColumn])
          : b[sortColumn].localeCompare(a[sortColumn]);
      }),
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
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
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              {['courseName', 'examGrade', 'assignmentGrade', 'finalAverage', 'Actions'].map(
                (label) => (
                  <TableCell key={label} sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}>
                    {label !== 'Actions' ? (
                      <TableSortLabel
                        active={sortColumn === label}
                        direction={sortColumn === label ? sortDirection : 'asc'}
                        onClick={() => handleSort(label)}
                      >
                        {label.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                      </TableSortLabel>
                    ) : (
                      'Actions'
                    )}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <AddGradeRow onAdd={handleAdd} />
            {filtered.map((grade) => (
              <GradeRow key={grade.id} grade={grade} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <GradeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} grade={selectedGrade} />
    </Box>
  );
}
