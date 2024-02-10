import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Alert, Box, Button, Step, Stepper, StepButton } from '@mui/material';

import CustomerListPage from './list';
import LoanProfile from './loan';
import FinancePriview from './priview';
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
  const [loanProfile,setLoanProfile]= useState({});
  const [vechileNdInsurenceProfile, setVechileNdInsuranceProfile] = useState({});


  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();
  const selectedCustomers=(userIds) => {
    console.log('index .js ')
    console.log(userIds);
    setCustomers(userIds);
  }
  const selectedSurity = (userIds) => {
    setSurity(userIds)
  }
 

  //stepper methods 
  const handleNext = (stepNo,stepData) => {
    if(stepNo===0){
      setCustomers(stepData);
    }else if(stepNo ===1){
      setSurity(stepData);
    }else if(stepNo ===2){
      setVechileNdInsuranceProfile(stepData);
    }else if(stepNo ===3){
      setLoanProfile(stepData); 
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = (stepNo,stepData) => {
    if(stepNo===0){
      setCustomers(stepData);
    }else if(stepNo ===1){
      setSurity(stepData);
    }else if(stepNo ===2){
      setVechileNdInsuranceProfile(stepData);
    }else if(stepNo ===3){
      setLoanProfile(stepData); 
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = (stepNo,stepData) => {
    if(stepNo===0){
      setCustomers(stepData);
    }else if(stepNo ===1){
      setSurity(stepData);
    }else if(stepNo ===2){
      setVechileNdInsuranceProfile(stepData);
    }else if(stepNo ===3){
      setLoanProfile(stepData); 
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext()
    if(completedSteps() === totalSteps()){
      console.log('finished clicked ')
      console.log('customer data')
      console.log(customers)
      console.log('security  data')
      console.log(surity)
      console.log('vechle data')
      console.log(vechileNdInsurenceProfile)
      console.log('loan data')
      console.log(loanProfile)


    } 
    
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
             <CustomerListPage selectedCustomers={selectedCustomers}
             customers = {customers}
             activeStep={activeStep}  
             handleBack={handleBack} 
             steps={steps.length} 
             completed={completed} 
             handleComplete={handleComplete} 
             totalSteps={totalSteps} 
             completedSteps={completedSteps}
             handleNext={handleNext}
             />
            </StepWrapper>
            <StepWrapper value={activeStep} index={1}>
            <CustomerListPage selectedCustomers = {selectedSurity}
             customers = {surity}
             activeStep={activeStep}  
             handleBack={handleBack} 
             steps={steps.length} 
             completed={completed} 
             handleComplete={handleComplete} 
             totalSteps={totalSteps} 
             completedSteps={completedSteps}
             handleNext={handleNext}
             />
            </StepWrapper>
            <StepWrapper value={activeStep} index={2}>
              <VechileProfile vechile={vechileNdInsurenceProfile}
               activeStep={activeStep}  
               handleBack={handleBack} 
               steps={steps.length} 
               completed={completed} 
               handleComplete={handleComplete} 
               totalSteps={totalSteps} 
               completedSteps={completedSteps}
               handleNext={handleNext}/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={3}>
            {/* <InsuranceProfile/> */}
            <LoanProfile
             loan={loanProfile}
             activeStep={activeStep}  
             handleBack={handleBack} 
             steps={steps.length} 
             completed={completed} 
             handleComplete={handleComplete} 
             totalSteps={totalSteps} 
             completedSteps={completedSteps}
             handleNext={handleNext}/>
            </StepWrapper>
            <StepWrapper value={activeStep} index={4}>
          <FinancePriview 
          customerId={customers}
          surityId={surity}
          loanProfile={loanProfile}
          vechilProfile={vechileNdInsurenceProfile}
           activeStep={activeStep}  
           handleBack={handleBack} 
           steps={steps.length} 
           completed={completed} 
           handleComplete={handleComplete} 
           totalSteps={totalSteps} 
           completedSteps={completedSteps}
           handleNext={handleNext}/>
            </StepWrapper>
            
          </>
        )}
      </div>
    </MainCard>
  );
}
