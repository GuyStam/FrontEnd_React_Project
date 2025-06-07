import React, { useEffect, useState, forwardRef } from 'react';
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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@mui/material';
import { listGrades } from '../assets/firebase/Grades';

// Slide-in transition from top
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function GradesTable() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    listGrades()
      .then(setGrades)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = (grade) => {
    setSelectedGrade(grade);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGrade(null);
  };

  const filtered = grades.filter((g) =>
    Object.values(g).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 4, px: 2 }}>
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

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eee' }}>
                <TableCell>
                  <strong>Course Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Exam Grade</strong>
                </TableCell>
                <TableCell>
                  <strong>Assignment Grade</strong>
                </TableCell>
                <TableCell>
                  <strong>Final Average</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((g, index) => (
                <TableRow key={index}>
                  <TableCell
                    onClick={() => handleOpen(g)}
                    sx={{
                      color: '#7FC243',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {g.courseName}
                  </TableCell>
                  <TableCell>{g.examGrade ?? 'N/A'}</TableCell>
                  <TableCell>{g.assignmentGrade ?? 'N/A'}</TableCell>
                  <TableCell>{g.finalAverage ?? 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pop-Up with slide-down effect */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: 380,
            maxWidth: '90vw',
            boxShadow: 10,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'Assistant',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            pb: 1,
            textAlign: 'center',
          }}
        >
          Grade Details
        </DialogTitle>
        <DialogContent
          sx={{
            fontFamily: 'Assistant',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: 1,
          }}
        >
          {selectedGrade && (
            <>
              <Typography fontSize="1.1rem">
                <strong>Course Name:</strong> {selectedGrade.courseName}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Exam Grade:</strong> {selectedGrade.examGrade ?? 'N/A'}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Assignment Grade:</strong> {selectedGrade.assignmentGrade ?? 'N/A'}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Final Average:</strong> {selectedGrade.finalAverage ?? 'N/A'}
              </Typography>
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  ID: {selectedGrade.id ?? 'N/A'}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
