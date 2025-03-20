import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';
import HomePage from './HomePage';
import Forms from './Components/Forms';
import Management from './Components/Managements';
import Help from './Components/Help';
import Info from './Components/Info';

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
          <Route path="/info" element={<Info />} />
        </Routes>
      </Container>
    </>
  );
}