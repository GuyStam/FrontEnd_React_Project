// (אותו ייבוא בדיוק כמו לפני כן)
import React, { useState, useEffect, forwardRef } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { listCourses, addCourse, deleteCourse } from '../assets/firebase/Courses';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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
  });

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith('/management');

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      await deleteCourse(courseToDelete.id);
      setCourses((prev) => prev.filter((c) => c.id !== courseToDelete.id));
      setCourseToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenDeleteDialog = (course) => {
    setCourseToDelete(course);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setCourseToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleSaveNewCourse = async () => {
    if (!newCourse.courseName || !newCourse.lecturer) return;
    const newId = await addCourse(newCourse);
    setCourses((prev) => [...prev, { id: newId, ...newCourse }]);
    setNewCourse({ courseName: '', lecturer: '', year: '', semester: '' });
  };

  const handleOpenDialog = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB');
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

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Assistant' }}>
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
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eee' }}>
                {[
                  { id: 'courseName', label: 'Course Name' },
                  { id: 'lecturer', label: 'Lecturer' },
                  { id: 'year', label: 'Year' },
                  { id: 'semester', label: 'Semester' },
                ].map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : 'asc'}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {isManagement && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {isManagement && (
                <TableRow>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newCourse.courseName}
                      onChange={(e) =>
                        setNewCourse((prev) => ({
                          ...prev,
                          courseName: e.target.value,
                        }))
                      }
                      placeholder="Course Name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newCourse.lecturer}
                      onChange={(e) =>
                        setNewCourse((prev) => ({
                          ...prev,
                          lecturer: e.target.value,
                        }))
                      }
                      placeholder="Lecturer"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newCourse.year}
                      onChange={(e) =>
                        setNewCourse((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      placeholder="Year"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={newCourse.semester}
                      onChange={(e) =>
                        setNewCourse((prev) => ({
                          ...prev,
                          semester: e.target.value,
                        }))
                      }
                      placeholder="Semester"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleSaveNewCourse} color="primary">
                      <SaveIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}

              {sorted.map((c) => (
                <TableRow key={c.id}>
                  <TableCell
                    onClick={() => !isManagement && handleOpenDialog(c)}
                    sx={{
                      color: !isManagement ? '#7FC243' : 'inherit',
                      fontWeight: 'bold',
                      cursor: !isManagement ? 'pointer' : 'default',
                    }}
                  >
                    {c.courseName}
                  </TableCell>
                  <TableCell>{c.lecturer}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>{c.semester}</TableCell>
                  {isManagement && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/management/courses/${c.id}`)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <IconButton onClick={() => handleOpenDeleteDialog(c)} color="error">
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

      {/* Dialog הצגת פרטי קורס */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
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
          Course Details
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
          {selectedCourse && (
            <>
              <Typography fontSize="1.1rem">
                <strong>Course Name:</strong> {selectedCourse.courseName}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Lecturer:</strong> {selectedCourse.lecturer}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Year:</strong> {selectedCourse.year}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Semester:</strong> {selectedCourse.semester}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Next Class:</strong> {formatDate(selectedCourse.nextClass)}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Next Assignment:</strong> {formatDate(selectedCourse.nextAssignment)}
              </Typography>
              <Typography fontSize="1.1rem">
                <strong>Final Average:</strong> {selectedCourse.grades?.finalAverage ?? 'N/A'}
              </Typography>
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  ID: {selectedCourse.id ?? 'N/A'}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog אישור מחיקה */}
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
