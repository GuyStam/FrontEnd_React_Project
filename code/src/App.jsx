import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './app.css';

import Header from './Header';
import HomePage from './HomePage';
import HomeCards from './Components/HomeCards';
import Forms from './Components/Forms';
import CoursesForm from './Components/CoursesForm';
import GradeForm from './Components/GradesForm';
import CoursesTable from './Components/CoursesTable';
import GradesTable from './Components/GradesTable';
import Management from './Components/Management';
import CoursesManagement from './Components/CoursesManagement';
import GradesManagement from './Components/GradesManagement';
import GradesForm from './Components/GradesForm'; // ✅ חדש
import Help from './Components/Help';
import Info from './Components/Info';

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/HomeCards" element={<HomeCards />} />

          {/* Forms - view only */}
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/courses" element={<CoursesTable />} />
          <Route path="/forms/courses/:courseId" element={<CoursesForm />} />
          <Route path="/forms/grades" element={<GradesTable />} />
          <Route path="/forms/grades/:gradeId" element={<GradeForm />} />

          {/* Management - full edit */}
          <Route path="/management" element={<Management />} />
          <Route path="/management/courses" element={<CoursesTable />} />
          <Route path="/management/courses/:courseId" element={<CoursesManagement />} />
          <Route path="/management/grades" element={<GradesManagement />} />
          <Route path="/management/grades/:gradeId" element={<GradesForm />} /> {/* ✅ חדש */}

          {/* Help and Info */}
          <Route path="/help" element={<Help />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Container>
    </>
  );
}
