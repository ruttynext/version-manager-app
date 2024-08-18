import { Configuration, StepInfo } from "../types/types";

export const steps: StepInfo[] = [
  { label: 'Branch Selection', description: 'Select the branch you want to release.' },
  { label: 'Build', description: 'Perform the build process for the selected branch.' },
  { label: 'Copy to Target Directory', description: 'Copy the built files to the target directory.' },
  { label: 'VDD', description: 'Fill out the version description document.' }
];

// Simulated configuration data (as an example)
export const configData: Configuration = {
 
  selectedBranch: '',
  
  copyToTarget: {
    targetDirectory: '',
  },
  vdd: {
    versionNumber: '',
    releaseDate: '',
    recentFixes: [],
  },
};