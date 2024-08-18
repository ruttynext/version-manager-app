import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { copyFilesToTarget } from '../services/service';
import { Configuration } from '../types/types';

interface CopyToTargetDirectoryProps {
  selectedBranch: string
  onUpdate: (key: keyof Configuration, value: any) => void;
  updateValidity: (isValid: boolean) => void;// Callback to update the validity of the step

}
const CopyToTargetDirectory: React.FC<CopyToTargetDirectoryProps> = ({ selectedBranch, onUpdate, updateValidity }) => {
  const [targetDirectory, setTargetDirectory] = useState<string>(''); 
  const [copyResult, setCopyResult] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);


  const handleCopy = async () => {
    setLoading(true);
    setError(null);
    setCopyResult(null);

   // Create an updated configuration object with the target directory
    const updatedConfig = {
        targetDirectory: targetDirectory,   
    };
    
    // Update the parent component with the new configuration
    onUpdate("copyToTarget", updatedConfig);

    try {
      const result = await copyFilesToTarget(selectedBranch, targetDirectory); // קריאה לפונקציה עם הסניף שנבחר
      setCopyResult(result);
      updateValidity(true); 
    } catch (err: any) {
      setError(err.message || 'Copy failed');
      updateValidity(false); 
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
        {copyResult && (
          <Typography variant="body1" color="success.main">
            {copyResult}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main">
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CopyToTargetDirectory;
