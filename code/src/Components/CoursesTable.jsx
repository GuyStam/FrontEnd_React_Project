// Components/CoursesTable.jsx
import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  listCourses,
  addCourse,
  deleteCourse,
} from '../assets/firebase/Courses';
import AddCourseRow from './AddCourseRow';
import CourseRow from './CourseRow';
import CourseDialog from './CourseDialog';

export default function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('courseName');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    lecturer: '',
    year: '',
    semester: '',
    nextClass: '',
    nextAssignment: '',
  });

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith('/management');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await listCourses();
        if (mounted) setCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleOpenDialog = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCourse(null);
    setOpen(false);
  };

  const handleSaveNewCourse = async (course, errorMessage) => {
    if (!course) {
      setSnackbar({
        open: true,
        message: errorMessage || '❌ Invalid course details.',
        severity: 'error',
      });
      return;
    }

    const newId = await addCourse(course);
    if (!newId) {
      setSnackbar({
        open: true,
        message: `❌ A course named '${course.courseName}' already exists.`,
        severity: 'error',
      });
      return;
    }

    setCourses((prev) => [...prev, { id: newId, ...course }]);
    setNewCourse({
      courseName: '',
      lecturer: '',
      year: '',
      semester: '',
      nextClass: '',
      nextAssignment: '',
    });

    setSnackbar({
      open: true,
      message: `✅ Course '${course.courseName}' added successfully!`,
      severity: 'success',
    });
  };

  const handleOpenDeleteDialog = (course) => {
    setCourseToDelete(course);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setCourseToDelete(null);
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      await deleteCourse(courseToDelete.id);
      setCourses((prev) => prev.filter((c) => c.id !== courseToDelete.id));
      setOpenDeleteDialog(false);
      setSnackbar({
        open: true,
        message: `✅ Course '${courseToDelete.courseName}' deleted successfully.`,
        severity: 'success',
      });
      setCourseToDelete(null);
    }
  };

  const filtered = courses.filter((c) =>
    Object.values(c).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : (a[orderBy] ?? '');
    const bVal = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : (b[orderBy] ?? '');
    if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filterUniqueByName = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const name = item.courseName?.trim().toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Assistant', fontWeight: 'bold' }}
      >
        {isManagement ? 'Manage Courses' : 'My Courses'}
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
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ tableLayout: 'fixed', minWidth: 1000 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#eee' }}>
                  {['courseName', 'lecturer', 'year', 'semester'].map((col) => (
                    <TableCell key={col} sx={{ minWidth: 120 }}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? orderDirection : 'asc'}
                        onClick={() => handleSort(col)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  {isManagement && (
                    <>
                      <TableCell sx={{ minWidth: 160 }}>Next Class</TableCell>
                      <TableCell sx={{ minWidth: 160 }}>Next Assignment</TableCell>
                      <TableCell sx={{ minWidth: 100 }}>Actions</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {isManagement && (
                  <AddCourseRow
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                    onSave={handleSaveNewCourse}
                  />
                )}

                {filterUniqueByName(sorted).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isManagement ? 7 : 4} align="center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filterUniqueByName(sorted).map((c) => (
                    <CourseRow
                      key={c.id}
                      course={c}
                      isManagement={isManagement}
                      onClick={handleOpenDialog}
                      onDelete={handleOpenDeleteDialog}
                      onEdit={() => navigate(`/management/courses/${c.id}`)}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      )}

      <CourseDialog open={open} onClose={handleCloseDialog} course={selectedCourse} />

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
