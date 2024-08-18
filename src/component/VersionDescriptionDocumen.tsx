import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box } from '@mui/material';


interface VersionDescriptionDocumentProps {
  config: ConfigJson
  onUpdate: (updatedConfig: { vdd: Vdd }) => void;
}

const VersionDescriptionDocument: React.FC<VersionDescriptionDocumentProps> = ({ config, onUpdate }) => {
  const [versionNumber, setVersionNumber] = useState<string>(config.vdd.versionNumber);
  const [releaseDate, setReleaseDate] = useState<string>(config.vdd.releaseDate);
  const [recentFixes, setRecentFixes] = useState<string>(config.vdd.recentFixes.join('\n'));

  useEffect(() => {
    onUpdate({
      vdd: {
        versionNumber,
        releaseDate,
        recentFixes: recentFixes.split('\n') // המרת שורות לרשימה
      }
    });
  }, [versionNumber, releaseDate, recentFixes, onUpdate]);

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
