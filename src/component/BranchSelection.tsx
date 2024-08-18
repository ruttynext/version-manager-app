import React, {useEffect} from 'react';
import { Select, MenuItem } from '@mui/material';

interface BranchSelectionProps {
  branches: string[], 
  selectedBranch: string; 
  setSelectedBranch: (branch: string) => void;
  updateValidity: (isValid: boolean) => void;// Callback to update the validity of the step

}


const BranchSelection: React.FC<BranchSelectionProps> = ({branches, selectedBranch, setSelectedBranch,  updateValidity }) => {
 
  useEffect(() => {
    updateValidity(!!selectedBranch);
  }, [selectedBranch, updateValidity]);

  return (
    <div>
      <Select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value as string)}
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
