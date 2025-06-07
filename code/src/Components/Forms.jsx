import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function Forms() {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3, maxWidth: '900px', margin: '0 auto' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          color: '#000',
          fontFamily: 'Assistant',
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Forms Page
      </Typography>

      <Typography sx={{ mb: 3, fontFamily: 'Assistant' }}>
        This page contains quick access to view your academic information.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#7FC243', fontFamily: 'Assistant', fontWeight: 'bold' }}
          onClick={() => navigate('/forms/courses')}
        >
          View My Courses
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#7FC243', fontFamily: 'Assistant', fontWeight: 'bold' }}
          onClick={() => navigate('/forms/grades')}
        >
          View My Grades
        </Button>
      </Box>
    </Box>
  );
}
