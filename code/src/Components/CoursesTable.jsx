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
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { listCourses, addCourse, deleteCourse } from "../assets/firebase/Courses";
import AddCourseRow from "./AddCourseRow";
import CourseRow from "./CourseRow";
import CourseDialog from "./CourseDialog";

export default function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("courseName");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
  });

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith("/management");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await listCourses();
      if (mounted) setCourses(data);
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
    setCourses((prev) => [...prev, { id: newId, ...newCourse }]);
    setNewCourse({ courseName: "", lecturer: "", year: "", semester: "" });
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
    Object.values(c).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
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
        {isManagement ? "Manage Courses" : "My Courses"}
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
                {["courseName", "lecturer", "year", "semester"].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={orderBy === col}
                      direction={orderBy === col ? orderDirection : "asc"}
                      onClick={() => handleSort(col)}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {isManagement && <TableCell>Actions</TableCell>}
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
              {sorted.map((c) => (
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
