interface StepInfo {
    label: string;
    description: string;
  }
  
  interface Vdd {
    versionNumber: string;
    releaseDate: string;
    recentFixes: string[];
  }
  
  interface ConfigJson {
    selectedBranch: string;
    vdd: Vdd;
  }
  interface Credentials {
    username: string;
    password: string;
  }