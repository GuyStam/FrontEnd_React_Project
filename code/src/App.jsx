import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import "./app.css";

import Header from "./Header";
import HomePage from "./HomePage";
import HomeCards from "./Components/HomeCards";
import Forms from "./Components/Forms";
import CoursesList from "./Components/CoursesList";
import CoursesForm from "./Components/CoursesForm";
import GradeForm from "./Components/GradeForm";
import Management from "./Components/Management";
import CoursesManagement from "./Components/CoursesManagement";
import GradesManagement from "./Components/GradesManagement";
import Help from "./Components/Help";
import Info from "./Components/Info";

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/HomeCards" element={<HomeCards />} />

          {/* Generic Forms landing */}
          <Route path="/forms" element={<Forms />} />

          {/* Courses list / detail */}
          <Route path="/forms/courses" element={<CoursesList />} />
          <Route path="/forms/courses/:courseId" element={<CoursesForm />} />

          {/* Grades form */}
          <Route path="/forms/grades" element={<GradeForm />} />
          <Route path="/forms/grades/:gradeId" element={<GradeForm />} />

          {/* Management modules */}
          <Route path="/management" element={<Management />} />
          <Route path="/management/courses" element={<CoursesManagement />} />
          <Route path="/management/grades" element={<GradesManagement />} />

          {/* Help & Info */}
          <Route path="/help" element={<Help />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Container>
    </>
  );
}
