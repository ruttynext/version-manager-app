import { configData } from "../data/appData";
import { Configuration } from "../types/types";

  // Simulated branches
  const branches: string[] = ['master', 'development', 'feature/new-ui', 'bugfix/issue-123'];
  
  
  // Fetch all available branches
  export const fetchBranches = async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(branches);
      }, 1); // Simulate a delay
    });
  };
  
  // Read the configuration file for a selected branch
  export const readConfiguration = async (branch: string): Promise<Configuration> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (branches.includes(branch)) {
          resolve(configData);
        } else {
          reject(new Error('Branch not found'));
        }
      }, 1); // Simulate a delay
    });
  };
  
  // Simulate a build for the selected branch
  export const simulateBuild = async (branch: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (branches.includes(branch)) {
          resolve(`Build successful for branch ${branch}`);
        } else {
          reject(new Error('Build failed: Branch not found'));
        }
      }, 1500); // Simulate a build time
    });
  };
  
  export const copyFilesToTarget = async (branch: string, targetDirectory: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (branches.includes(branch)) {
          resolve(`Files from branch ${branch} copied to ${targetDirectory}`);
        } else {
          reject(new Error('Copy failed: Branch not found'));
        }
      }, 1000); // Simulate a copy time
    });
  };
  
  // Save the updated configuration file for the selected branch
  export const saveConfiguration = async (branch: string, updatedConfig: Configuration): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (branches.includes(branch)) {
          // Simulate saving the config (in a real app, you'd write to a file or DB)
          resolve(`Configuration for branch ${branch} saved successfully`);
        } else {
          reject(new Error('Save failed: Branch not found'));
        }
      }, 1000); // Simulate save time
    });
  };
  