import React, { forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Slide, Typography, Box } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function GradeDialog({ open, onClose, grade }) {
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
        Grade Details
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
        {grade && (
          <>
            <Typography fontSize="1.1rem">
              <strong>Course Name:</strong> {grade.courseName}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Lecturer:</strong> {grade.lecturer}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Year:</strong> {grade.year}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Semester:</strong> {grade.semester}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Exam Grade:</strong> {grade.examGrade ?? 'N/A'}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Assignment Grade:</strong> {grade.assignmentGrade ?? 'N/A'}
            </Typography>
            <Typography fontSize="1.1rem">
              <strong>Final Average:</strong> {grade.finalAverage ?? 'N/A'}
            </Typography>
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                ID: {grade.id ?? 'N/A'}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
