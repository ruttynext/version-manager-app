import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Container, StepButton, Typography, CardContent, Card, Box } from '@mui/material';
import BranchSelection from './BranchSelection';
import BuildStep from './BuildStep';
import CopyToTargetDirectory from './CopyToTargetDirectory';
import VersionDescriptionDocument from './VersionDescriptionDocumen';
import initialConfig from '../config.json';
import Completion from './Completion';
import { steps } from '../data/appData';


const VersionManager = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);
  const [config, setConfig] = useState<ConfigJson>(initialConfig);
  const [completed, setCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); 

    // Simulate fetching branches from an API
    useEffect(() => {
      const fetchedBranches: string[] = ['master', 'development', 'feature/new-ui', 'bugfix/issue-123'];
      setBranches(fetchedBranches);

    }, []);

  const handleNext = (newData: Partial<ConfigJson>) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleUpdateConfig = (updatedData: Partial<ConfigJson>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...updatedData }));
  };

  const handleFinish = async () => {
    if (selectedBranch) {
      const success = true; //await saveConfigToFile(config, selectedBranch);
  
      if (success) {
        setCompleted(true);
      } else {
        setMessage('Failed to save configuration.');
      }
    } else {
      setMessage('No branch selected.');
    }
  };
  

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <BranchSelection branches ={branches} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />;
      case 1:
        return <BuildStep selectedBranch={selectedBranch}/>;
      case 2:
        return <CopyToTargetDirectory />;
      case 3:
        return <VersionDescriptionDocument config={config} onUpdate={handleUpdateConfig} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Version Management Process</Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <StepLabel>{step.label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {completed ? (
          <Completion />
        ) : (
          <>
            <Card sx={{ backgroundColor: 'white', boxShadow: 1, mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {steps[activeStep].description}
                </Typography>
                {getStepContent(activeStep)}
              </CardContent>
            </Card>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px'}}>
              <Button disabled={activeStep === 0} color="primary" variant="contained" onClick={handleBack}>
                Back
              </Button>
              {activeStep < steps.length - 1 && (
                <Button variant="contained" color="primary" onClick={() => handleNext({})} style={{ marginLeft: '20px' }}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFinish}
                  style={{ marginLeft: '20px' }}
                >
                  Finish
                </Button>
              )}
            </div>
            
            {message && (
              <Box mt={2}>
                <Typography variant="body1" color="error.main">
                  {message}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default VersionManager;