import React, { useState } from 'react';
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../assets/firebase/config';
import { seedAllCoursesIfEmpty } from '../assets/firebase/Courses';

export default function AdminResetButton() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [resetInProgress, setResetInProgress] = useState(false);

  const handleResetConfirmed = async () => {
    setResetInProgress(true);
    try {
      const courses = await getDocs(collection(firestore, 'Courses'));
      for (let c of courses.docs) {
        await deleteDoc(doc(firestore, 'Courses', c.id));
      }

      const grades = await getDocs(collection(firestore, 'Grades'));
      for (let g of grades.docs) {
        await deleteDoc(doc(firestore, 'Grades', g.id));
      }

      await seedAllCoursesIfEmpty();

      setSnackbar({
        open: true,
        message: '✅ Courses and grades reset successfully!',
        severity: 'success',
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: '❌ Failed to reset data.',
        severity: 'error',
      });
    } finally {
      setOpenDialog(false);
      setResetInProgress(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        variant="contained"
        color="error"
        sx={{ mt: 4, fontFamily: 'Assistant', fontWeight: 'bold' }}
        disabled={resetInProgress}
      >
        Reset Courses & Grades
      </Button>

      <Dialog open={openDialog} onClose={() => !resetInProgress && setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'Assistant', textAlign: 'center' }}>
          Are you sure you want to reset all courses and grades?
        </DialogTitle>

        {resetInProgress && (
          <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body2">Resetting data, please wait...</Typography>
          </DialogContent>
        )}

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            disabled={resetInProgress}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetConfirmed}
            variant="contained"
            color="error"
            disabled={resetInProgress}
          >
            {resetInProgress ? 'Resetting...' : 'Yes, Reset'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        key={snackbar.message}
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
