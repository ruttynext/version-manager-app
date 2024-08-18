import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { simulateBuild } from '../services/service';

interface BuildStepProps {
  selectedBranch: string;
  updateValidity: (isValid: boolean) => void;// Callback to update the validity of the step
}

const BuildStep: React.FC<BuildStepProps> = ({ selectedBranch, updateValidity }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [buildResult, setBuildResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = async () => {
    setLoading(true);
    setError(null);
    setBuildResult(null);

    try {
      const result = await simulateBuild(selectedBranch);
      setBuildResult(result);
      updateValidity(true); 
    } catch (err: any) {
      setError(err.message || 'Build failed');
      updateValidity(false); 
    } finally {
      setLoading(false);
    }
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

      <Box mt={2}>
        {buildResult && (
          <Typography variant="body1" color="success.main">
            {buildResult}
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

export default BuildStep;