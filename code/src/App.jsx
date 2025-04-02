// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";
import HomePage from "./HomePage";
import Forms from "./Components/Forms";
import CoursesForm from "./Components/CoursesForm";  // <-- העמוד המלא

export default function App() {
  return (
    <>
      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/courses" element={<CoursesForm />} />
        </Routes>
      </Container>
    </>
  );
}
