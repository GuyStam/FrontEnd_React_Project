import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getCourse, updateCourse } from "../assets/firebase/Courses";

export default function CoursesManagement() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    courseName: "",
    lecturer: "",
    year: "",
    semester: "",
    nextClass: "",
    nextAssignment: "",
    grades: { finalAverage: "" },
  });

  useEffect(() => {
    let mounted = true;
    if (courseId) {
      getCourse(courseId)
        .then((data) => {
          if (data && mounted) {
            setValues({
              courseName: data.courseName ?? "",
              lecturer: data.lecturer ?? "",
              year: data.year ?? "",
              semester: data.semester ?? "",
              nextClass: data.nextClass ?? "",
              nextAssignment: data.nextAssignment ?? "",
              grades: {
                finalAverage: data.grades?.finalAverage ?? "",
              },
            });
          }
        })
        .catch(console.error)
        .finally(() => mounted && setLoading(false));
    }
    return () => {
      mounted = false;
    };
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "finalAverage") {
      setValues((prev) => ({
        ...prev,
        grades: { ...prev.grades, finalAverage: value },
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCourse(courseId, values);
      navigate("/management/courses");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
      >
        Edit Course
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Course Name"
        name="courseName"
        value={values.courseName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Lecturer"
        name="lecturer"
        value={values.lecturer}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Year"
        name="year"
        value={values.year}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Semester"
        name="semester"
        value={values.semester}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Next Class"
        name="nextClass"
        value={values.nextClass}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Next Assignment"
        name="nextAssignment"
        value={values.nextAssignment}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Final Average"
        name="finalAverage"
        value={values.grades.finalAverage}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Save
      </Button>
    </Box>
  );
}
