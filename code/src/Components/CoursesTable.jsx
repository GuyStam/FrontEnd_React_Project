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
  Button,
  CircularProgress,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { listCourses, addCourse, deleteCourse } from "../assets/firebase/Courses";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

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

  const navigate = useNavigate();
  const location = useLocation();
  const isManagement = location.pathname.startsWith("/management");

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveNewCourse = async () => {
    if (!newCourse.courseName || !newCourse.lecturer) return;
    const newId = await addCourse(newCourse);
    setCourses((prev) => [...prev, { id: newId, ...newCourse }]);
    setNewCourse({ courseName: "", lecturer: "", year: "", semester: "" });
  };

  const filtered = courses.filter((c) =>
    Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal =
      typeof a[orderBy] === "string"
        ? a[orderBy].toLowerCase()
        : a[orderBy] ?? "";
    const bVal =
      typeof b[orderBy] === "string"
        ? b[orderBy].toLowerCase()
        : b[orderBy] ?? "";
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isManagement ? "ניהול קורסים" : "רשימת קורסים"}
      </Typography>

      <TextField
        label="חיפוש כללי (Ctrl+F)"
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
                {[
                  { id: "courseName", label: "שם קורס" },
                  { id: "lecturer", label: "מרצה" },
                  { id: "year", label: "שנה" },
                  { id: "semester", label: "סמסטר" },
                ].map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? orderDirection : "asc"}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {isManagement && <TableCell>פעולות</TableCell>}
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
                      placeholder="שם קורס"
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
                      placeholder="מרצה"
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
                      placeholder="שנה"
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
                      placeholder="סמסטר"
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
                  <TableCell>{c.courseName}</TableCell>
                  <TableCell>{c.lecturer}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>{c.semester}</TableCell>
                  {isManagement && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigate(`/management/courses/${c.id}`)
                        }
                        sx={{ mr: 1 }}
                      >
                        ערוך
                      </Button>
                      <IconButton
                        onClick={() => handleDelete(c.id)}
                        color="error"
                      >
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
    </Box>
  );
}
