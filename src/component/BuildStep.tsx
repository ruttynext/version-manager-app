import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';


interface BuildStepProps {
  selectedBranch: string;
}

const BuildStep: React.FC<BuildStepProps> = ({ selectedBranch }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

    /**
   * This function simulates the build process for the selected branch.
   * In a real application, you would replace this simulation with
     a call to an external function or service that performs the actual build.
   */
  const handleBuild = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage(`Build process for branch "${selectedBranch}" completed!`);

    }, 2000); 
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBuild}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Build'}
      </Button>
      <Box mt={2}> {/* מוסיף רווח מעל להודעה */}
        {message && (
          <Typography variant="body1" color="success.main">
            {message}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default BuildStep;
