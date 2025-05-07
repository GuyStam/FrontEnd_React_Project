// CoursesList.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { listCourses } from "./firebase/courses";
import CoursesTable from "./CoursesTable";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listCourses().then(fetched => {
      setCourses(fetched);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    );
  }

  return (
    <CoursesTable
      courses={courses}
      onEdit={() => {}}
      onRemove={() => {}}
    />
  );
}
