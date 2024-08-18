import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

interface Credentials {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    if (username.trim() && password.trim()) {
      setIsAuthenticated(true);
      setError(''); // נקה את הודעת השגיאה במקרה של התחברות מוצלחת
    } else {
      setError('Username and password cannot be empty');
    }
  };

  return (
    <Box className="login-box">
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        size="small" // Make input fields smaller
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        size="small" // Make input fields smaller
      />
      {error && <Typography color="error" variant="body2">{error}</Typography>} {/* Smaller error text */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }} // Add margin-top for spacing
        size="small" // Make button smaller
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
