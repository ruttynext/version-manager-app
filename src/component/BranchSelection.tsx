import React from 'react';
import { Select, MenuItem } from '@mui/material';

interface BranchSelectionProps {
  branches: string[], 
  selectedBranch: string; 
  setSelectedBranch: (branch: string) => void;
}

const BranchSelection: React.FC<BranchSelectionProps> = ({ selectedBranch, setSelectedBranch, branches }) => {
 
  return (
    <div>
      <Select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        fullWidth
      >
        {branches.map((branch) => (
          <MenuItem key={branch} value={branch}>
            {branch}
          </MenuItem>
        ))}
      </Select>
  
    </div>
  );
};

export default BranchSelection;
