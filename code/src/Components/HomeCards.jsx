import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import MessageIcon from '@mui/icons-material/Message';

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');
};

const HomeCards = ({ nextAssignment, averageGPA, sinceStart, untilEnd, lecturerMessage }) => {
  const topRow = [
    {
      title: 'Upcoming Assignments',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: nextAssignment ? `Next due: ${formatDate(nextAssignment)}` : 'None',
    },
    {
      title: 'Upcoming Exams',
      icon: <CalendarTodayIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: nextAssignment ? `Exam on: ${formatDate(nextAssignment)}` : 'None',
    },
    {
      title: 'Current GPA',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: averageGPA || 'N/A',
    },
  ];

  const bottomRow = [
    {
      title: 'Days Since Start',
      icon: <TimerIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: `${sinceStart} days since start`,
    },
    {
      title: 'Lecturer Message',
      icon: <MessageIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: lecturerMessage || 'No message',
    },
    {
      title: 'Days Until End',
      icon: <TimerIcon sx={{ fontSize: 40, color: 'white' }} />,
      content: untilEnd,
    },
  ];

  const renderCards = (cards) =>
    cards.map((card, index) => (
      <Grid item xs={12} md={4} key={index}>
        <Paper
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#7FC243',
          }}
        >
          {card.icon}
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
          >
            {card.title}
          </Typography>
          <Typography sx={{ textAlign: 'center', color: 'white' }}>{card.content}</Typography>
        </Paper>
      </Grid>
    ));

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        {renderCards(topRow)}
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        {renderCards(bottomRow)}
      </Grid>
    </Box>
  );
};

export default HomeCards;
