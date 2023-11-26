import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Alert, Box, Button, Step, Stepper, StepButton } from '@mui/material';

import CustomerListPage from './list';
import LoanProfile from './loan';
// import InsuranceProfile from './insurance';
import VechileProfile from './vechile';
// import FormCustomerAdd from 'sections/apps/customer/FormCustomerAdd';

// material-ui
import MainCard from 'components/MainCard';

const steps = ['Customer Profile', 'Surity Profile', 'Vechile & Insurance Profile','Loan Profile','Priview'];

function StepWrapper({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

StepWrapper.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

// ==============================|| STEPPER - NON LINEAR ||============================== //

export default function FinancePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [customers, setCustomers] = useState([]);
  const [surity, setSurity] = useState([]);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const selectedCustomers = (selcted) => {
    setCustomers(selcted);
    console.log('add super selcted');
    console.log(customers);
    console.log(selcted);
  }
  const selectedSurity = (selcted) => {
    console.log('add super selcted');
    setSurity(selcted);
    console.log(surity)
  }
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

 
  return (
    <MainCard title="Finance - Profile" >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Alert sx={{ my: 3 }}>All steps completed - you&apos;re finished</Alert>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} color="error" variant="contained">
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            <StepWrapper value={activeStep} index={0}>
             <CustomerListPage selectedCustomers = {selectedCustomers}/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={1}>
            <CustomerListPage selectedCustomers = {selectedSurity}/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={2}>
              <VechileProfile/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={3}>
            {/* <InsuranceProfile/> */}
            <LoanProfile/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={4}>
            <CustomerListPage selectedCustomers = {selectedCustomers}/>
            <CustomerListPage selectedCustomers = {selectedSurity}/>
            <VechileProfile/>
            <LoanProfile/>
            </StepWrapper>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Button color="success">Step {activeStep + 1} already completed</Button>
                ) : (
                  <Button onClick={handleComplete} color="success" variant={activeStep === totalSteps() - 1 ? 'contained' : 'outlined'}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
              <Button disabled={activeStep === steps.length - 1} onClick={handleNext} sx={{ ml: 1 }} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </>
        )}
      </div>
    </MainCard>
  );
}
