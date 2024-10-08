# Version Release Management Application

## Objective
This React application is designed to manage the version release process for a customer. It allows the user to:
1. **Access Configuration Manager**: Connect and authenticate with the configuration manager.
2. **Branch Selection**: Choose a branch for the release.
3. **Build**: Execute the build process for the selected branch.
4. **Copy to Target Directory**: Copy the built files to the target directory.

Additionally, it includes an **optional feature** to generate a **Version Description Document (VDD)**, which includes:
- Version number
- Release date
- Recent fixes (user input)

## Features
- **React with TypeScript**: The application is built using React with TypeScript to ensure type safety and a better development experience.
- **Material-UI (MUI)**: MUI is used to create an intuitive and user-friendly interface.
- **Configuration File Management**: Reads from and saves changes to a JSON configuration file.
- **Optional VDD Generation**: The user can input version details, which are saved back to the configuration file.

## Project Structure
- **src/components**: Contains all React components used for the various steps (Access Configuration, Branch Selection, Build, and Copy).
- **src/services**: Contains functions to read and write to the JSON configuration file.
- **src/types**: Defines TypeScript types for the configuration structure.

## Configuration File
The application reads and writes to a JSON configuration file. An example of the structure is as follows:

## json
{
    "selectedBranch": "main"
  },
  "copyToTarget": {
    "targetDirectory": "/var/www/html/"
  },
  "vdd": {
    "versionNumber": "1.0.0",
    "releaseDate": "2024-08-09",
    "recentFixes": [
      "Fixed login issue",
      "Updated API endpoints"
    ]
  }
}
## Installation
To install and run the application locally, follow these steps:

Clone the repository:

git clone https://github.com/ruttynext/version-release-management.git
Navigate to the project directory:

cd version-release-management
Install dependencies:

npm install
Run the application:

npm start
The application will open in your default browser at http://localhost:3000.
