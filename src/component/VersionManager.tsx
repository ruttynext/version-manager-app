import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Container, StepButton, Typography, CardContent, Card, Box } from '@mui/material';
import BranchSelection from './BranchSelection';
import BuildStep from './BuildStep';
import CopyToTargetDirectory from './CopyToTargetDirectory';
import VersionDescriptionDocument from './VersionDescriptionDocumen';
import Completion from './Completion';
import { configData, steps } from '../data/appData';
import { fetchBranches, readConfiguration, saveConfiguration } from '../services/service';
import { Configuration } from '../types/types';


const VersionManager = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);
  const [config, setConfig] = useState<Configuration>(configData);
  const [completed, setCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); 
  const [stepValidity, setStepValidity] = useState<boolean[]>(steps.map(() => false));

    useEffect(() => {
     
      const getBranches = async () => {
        try {
          const branchesList = await fetchBranches();
          setBranches(branchesList);
        } catch (err) {
          setMessage('Failed to fetch branches');
        } finally {
         // setLoading(false);
        }
      };
  
      getBranches();
    }, []);

    
    useEffect(() => {

      const fetchConfigAndUpdate = async () => {
        try {
          const result = await readConfiguration(selectedBranch);
          setConfig(result);
    
          if (selectedBranch) {
            handleUpdateConfig("selectedBranch", selectedBranch);
          } // סוגרים את ה-if
        } catch (error) {
          console.error('Error fetching config:', error);
        }
      };
    
      fetchConfigAndUpdate(); 
    }, [selectedBranch]); 
    
    const handleUpdateStepValidity = (isValid: boolean) => {
      setStepValidity(prev => {
        const newValidity = [...prev];
        newValidity[activeStep] = isValid;
        return newValidity;
      });
    };

    const handleNext = (newData: Partial<Configuration>) => {
      if (stepValidity[activeStep]) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
  
        if (activeStep === steps.length - 1) {
          setCompleted(true);
        }
      } else {
        setMessage('Please fill in all required fields before proceeding.');
      }
    };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };


  const handleUpdateConfig = (key: keyof Configuration, value: any) => {

    const configObj = {
      ...config,
      [key]: value
    };
    setConfig((prevConfig) => ({ ...prevConfig, ...configObj }));
    console.log("handleUpdateConfig");
  };
 

  const handleFinish = async () => {
   
    if (selectedBranch) {
      try {
        await saveConfiguration(selectedBranch, config);
        setCompleted(true);
      } catch (error) {
        setMessage('Failed to save configuration.');
      }
    }
  };
  

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <BranchSelection branches ={branches} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} updateValidity={handleUpdateStepValidity}/>;
      case 1:
        return <BuildStep selectedBranch={selectedBranch} updateValidity={handleUpdateStepValidity}/>;
      case 2:
        return <CopyToTargetDirectory selectedBranch={selectedBranch} onUpdate={handleUpdateConfig} updateValidity={handleUpdateStepValidity}/>;
      case 3:
        return <VersionDescriptionDocument config={config} onUpdate={handleUpdateConfig} updateValidity={handleUpdateStepValidity}/>;
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
                <Button variant="contained" color="primary" onClick={() => handleNext({})} disabled={!stepValidity[activeStep]}
                style={{ marginLeft: '20px' }}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFinish}
                  style={{ marginLeft: '20px' }}
                  disabled={!stepValidity[steps.length - 1]}
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