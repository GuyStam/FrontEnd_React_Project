import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import MessageIcon from '@mui/icons-material/Message';

const HomeCards = ({ nextAssignment, averageGPA, sinceStart, untilEnd, lecturerMessage }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Upcoming Assignments Card */}
        <Grid item xs={12} md={4}>
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
            <AssignmentIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Upcoming Assignments
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>
              {nextAssignment ? `Next due: ${nextAssignment}` : 'None'}
            </Typography>
          </Paper>
        </Grid>

        {/* Current GPA Card */}
        <Grid item xs={12} md={4}>
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
            <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Current GPA
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>
              {averageGPA || 'N/A'}
            </Typography>
          </Paper>
        </Grid>

        {/* Upcoming Exams Card */}
        <Grid item xs={12} md={4}>
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
            <CalendarTodayIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Upcoming Exams
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>
              {nextAssignment ? `Exam on: ${nextAssignment}` : 'None'}
            </Typography>
          </Paper>
        </Grid>

        {/* Days Since Start Card */}
        <Grid item xs={12} md={4}>
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
            <TimerIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Days Since Start
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>
              {`${sinceStart} days since start`}
            </Typography>
          </Paper>
        </Grid>

        {/* Days Until End Card */}
        <Grid item xs={12} md={4}>
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
            <TimerIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Days Until End
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>{untilEnd}</Typography>
          </Paper>
        </Grid>

        {/* Lecturer Message Card */}
        <Grid item xs={12} md={4}>
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
            <MessageIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Assistant', fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              Lecturer Message
            </Typography>
            <Typography sx={{ textAlign: 'center', color: 'white' }}>
              {lecturerMessage || 'No message'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeCards;
