export interface StepInfo {
    label: string;
    description: string;
  }
  
  interface Vdd {
    versionNumber: string;
    releaseDate: string;
    recentFixes: string[];
  }
  

  interface Credentials {
    username: string;
    password: string;
  }


  
export interface Configuration {

  selectedBranch: string;
  
  copyToTarget: {
    targetDirectory: string;
  };
  vdd: {
    versionNumber: string;
    releaseDate: string;
    recentFixes: string[];
  };
}



