// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import './app.css';
import HomeCards from "./Components/HomeCards";
import Header from "./Header";
import HomePage from "./HomePage";
import Forms from "./Components/Forms";
import CoursesForm from "./Components/CoursesForm";
import GradeForm from "./Components/GradeForm";           // טופס GradesForm
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
          <Route path="/" element={<HomePage />} /> 
          <Route path="/HomeCards" element={<HomeCards />} />

          <Route path="/forms" element={<Forms />} />
          
          {/* CoursesForm */}
          <Route path="/forms/courses" element={<CoursesForm />} />
          <Route path="/forms/courses/:courseId" element={<CoursesForm />} />

          {/* GradeForm (GradesForm) */}
          <Route path="/forms/grades" element={<GradeForm />} />
          <Route path="/forms/grades/:gradeId" element={<GradeForm />} />

          <Route path="/management" element={<Management />} />
          <Route path="/management/courses" element={<CoursesManagement />} />
          <Route path="/management/grades" element={<GradesManagement />} />

          <Route path="/help" element={<Help />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Container>
    </>
  );
}
