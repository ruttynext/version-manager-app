import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

const CopyToTargetDirectory: React.FC = () => {
  const [targetDirectory, setTargetDirectory] = useState<string>(''); // שמירת שם תיקית היעד
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  /**
   * This function simulates copying files to the target directory.
   */
  const handleCopy = async () => {
    if (!targetDirectory) {
      setMessage('Please specify a target directory.');
      return;
    }
  
    setLoading(true);
    setMessage(''); // Clear any previous message
  
    try {
      // Simulate a delay for the copy process
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate a successful copy operation
          resolve();
        }, 500); // Simulate operation duration
      });
  
      // After the simulated operation
      setMessage(`Files successfully copied to "${targetDirectory}"`);
    } catch (error) {
      setMessage('Failed to copy files.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <TextField
        label="Target Directory"
        variant="outlined"
        value={targetDirectory}
        onChange={(e) => setTargetDirectory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCopy}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Copy to Target Directory'}
      </Button>
      <Box mt={2}>
        {message && (
          <Typography variant="body1" color="success.main">
            {message}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CopyToTargetDirectory;
