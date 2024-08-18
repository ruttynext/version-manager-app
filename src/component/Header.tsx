import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

// Define prop types using an interface
interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Version Manager
        </Typography>
        {/* Display the Log Out button only if the user is authenticated */}
        {isAuthenticated && (
          <IconButton color="inherit" onClick={onLogout} aria-label="logout">
            Log Out
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
