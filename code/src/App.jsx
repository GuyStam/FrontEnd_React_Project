import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';
import HomePage from './HomePage';
import Forms from './Components/Forms';
import Management from './Components/Managements';
import Help from './Components/Help';
import Info from './Components/Info';
import Icons from './Components/Icons';

import CoursesTable from './Components/CoursesTable';
import CoursesForm from './Components/CoursesForm';

export default function App() {
  return (
    <>
      <Header />
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/management" element={<Management />} />
          <Route path="/help" element={<Help />} />
          <Route path="/info" element={<Info />} />
          <Route path="/icons" element={<Icons />} />

          <Route path="/courses" element={<CoursesTable />} />
          <Route path="/add-course" element={<CoursesForm />} />
        </Routes>
      </Container>
    </>
  );
}
