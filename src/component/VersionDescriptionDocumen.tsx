import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box } from '@mui/material';
import { Configuration } from '../types/types';


interface VersionDescriptionDocumentProps {
  config: Configuration
  onUpdate: (key: keyof Configuration, value: any) => void;
  updateValidity: (isValid: boolean) => void;// Callback to update the validity of the step
}


const VersionDescriptionDocument: React.FC<VersionDescriptionDocumentProps> = ({ config, onUpdate, updateValidity }) => {
  const [versionNumber, setVersionNumber] = useState<string>(config.vdd.versionNumber);
  const [releaseDate, setReleaseDate] = useState<string>(config.vdd.releaseDate);
  const [recentFixes, setRecentFixes] = useState<string>(config.vdd.recentFixes.join('\n'));

  useEffect(() => {
  
      const vddObj = {   
          versionNumber,
          releaseDate,
          recentFixes: recentFixes.split('\n')      
      }
   
    // Update the parent component with the new version description data
    onUpdate("vdd", vddObj);
    
    // Check if all fields are filled to determine validity
    const isValid = 
      versionNumber.trim() !== '' && 
      releaseDate.trim() !== '' && 
      recentFixes.trim() !== '';
    
    updateValidity(isValid);

  }, [versionNumber, releaseDate, recentFixes]);


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Version Number"
            value={versionNumber}
            onChange={(e) => setVersionNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Release Date"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <TextField
        label="Recent Fixes"
        value={recentFixes}
        onChange={(e) => setRecentFixes(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        helperText="Enter each fix on a new line"
      />
    </Box>
  );
};

export default VersionDescriptionDocument;
