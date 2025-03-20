import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/forms">
          Forms
        </Button>
        <Button color="inherit" component={RouterLink} to="/management">
          Management
        </Button>
      </Toolbar>
    </AppBar>
  );
}
