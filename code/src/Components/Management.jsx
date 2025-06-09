import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField, Snackbar } from '@mui/material';
import { getLecturerMessage, setLecturerMessage } from '../assets/firebase/settings';

export default function Management() {
  const navigate = useNavigate();
  const [lecturerMessage, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      const msg = await getLecturerMessage();
      setMessage(msg || '');
    };
    load();
  }, []);

  const handleUpdate = async () => {
    await setLecturerMessage(lecturerMessage);
    setSuccess(true);
  };

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
        Management Panel
      </Typography>

      <Typography sx={{ mb: 3, fontFamily: 'Assistant' }}>
        Here you can edit, add, or remove academic data.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#7FC243', fontFamily: 'Assistant', fontWeight: 'bold' }}
          onClick={() => navigate('/management/courses')}
        >
          Manage Courses
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#7FC243', fontFamily: 'Assistant', fontWeight: 'bold' }}
          onClick={() => navigate('/management/grades')}
        >
          Manage Grades
        </Button>
      </Box>

      <Box sx={{ border: '1px solid #7FC243', padding: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Assistant', fontWeight: 'bold' }}>
          Update Lecturer Message
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Lecturer Message"
          value={lecturerMessage}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2, fontFamily: 'Assistant', fontWeight: 'bold' }}
          onClick={handleUpdate}
        >
          Save Lecturer Message
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Lecturer message updated!"
      />
    </Box>
  );
}
