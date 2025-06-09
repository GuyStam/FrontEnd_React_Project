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
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  listCourses,
  addCourse,
  deleteCourse,
  seedAllCoursesIfEmpty,
} from '../assets/firebase/Courses';
import AddCourseRow from './AddCourseRow';
import CourseRow from './CourseRow';
import CourseDialog from './CourseDialog';

function CoursesTable() {
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

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith('/management');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await listCourses();

        if (data.length === 0) {
          await seedAllCoursesIfEmpty();
          const seeded = await listCourses();
          if (mounted) setCourses(seeded);
        } else {
          if (mounted) setCourses(data);
        }
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

  const handleSaveNewCourse = async () => {
    if (!newCourse.courseName || !newCourse.lecturer) return;
    const newId = await addCourse(newCourse);
    if (newId) {
      setCourses((prev) => [...prev, { id: newId, ...newCourse }]);
    }
    setNewCourse({
      courseName: '',
      lecturer: '',
      year: '',
      semester: '',
      nextClass: '',
      nextAssignment: '',
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
                {filterUniqueByName(sorted).map((c) => (
                  <CourseRow
                    key={c.id}
                    course={c}
                    isManagement={isManagement}
                    onClick={handleOpenDialog}
                    onDelete={handleOpenDeleteDialog}
                    onEdit={() => navigate(`/management/courses/${c.id}`)}
                  />
                ))}
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
    </Box>
  );
}

export default CoursesTable;
