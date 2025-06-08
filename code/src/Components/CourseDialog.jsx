import React, { forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Slide, Typography, Box } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CourseDialog({ open, onClose, course }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          minWidth: 380,
          maxWidth: '90vw',
          boxShadow: 10,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Assistant',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          pb: 1,
          textAlign: 'center',
        }}
      >
        Course Details
      </DialogTitle>
      <DialogContent
        sx={{
          fontFamily: 'Assistant',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pt: 1,
        }}
      >
        {course && (
          <>
            <Typography fontSize="1.1rem">
              <strong>Course Name:</strong> {course.courseName}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Lecturer:</strong> {course.lecturer}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Year:</strong> {course.year}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Semester:</strong> {course.semester}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Next Class:</strong> {formatDate(course.nextClass)}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Next Assignment:</strong> {formatDate(course.nextAssignment)}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Final Average:</strong> {course.grades?.finalAverage ?? 'N/A'}
            </Typography>
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                ID: {course.id ?? 'N/A'}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
