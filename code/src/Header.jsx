import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Icons from './Components/Icons'; // הוספת הייבוא של Icons

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icons name="home" sx={{ fontSize: 30 }} />
          <Typography variant="body2">Home</Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/forms" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icons name="forms" sx={{ fontSize: 30 }} />
          <Typography variant="body2">Forms</Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/management" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icons name="management" sx={{ fontSize: 30 }} />
          <Typography variant="body2">Management</Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/help" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icons name="help" sx={{ fontSize: 30 }} />
          <Typography variant="body2">Help</Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/info" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icons name="info" sx={{ fontSize: 30 }} />
          <Typography variant="body2">Info</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
