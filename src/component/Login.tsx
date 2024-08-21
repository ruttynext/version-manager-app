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
      setError(''); 
    } else {
      setError('Username and password cannot be empty');
    }
  };

  const isFormValid = credentials.username.trim() && credentials.password.trim(); 

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
        size="small" 
        error={credentials.username === ''}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        size="small" 
        error={credentials.password === ''}
      />
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }} 
        size="small" 
        disabled={!isFormValid} // Disable button if form is invalid
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
