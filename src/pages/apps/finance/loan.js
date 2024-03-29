import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PatternFormat ,NumericFormat } from 'react-number-format';
// material-ui
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Button
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { useRef } from 'react';

// import { insertloan, updateloan ,uploadPhoto as loanPhotoUpload ,loansListUpdate} from 'api/loan';

// assets



// constant
const getInitialValues = (loan) => {
  const newloan = {
    loanAmt:'',
    tenureYears: '',
    tenureMonths: '',
    roi: '',
    emi: '',
    emidate: null
  };

  if (loan) {
    return _.merge({}, newloan, loan);
  }

  return newloan;
};



// ==============================|| loan ADD / EDIT - FORM ||============================== //

const LoanProfile = ({loan, indexloanProfileHander,
  activeStep,
  handleBack,
  steps,
  completed,
  handleComplete,
  totalSteps,
  completedSteps,
  handleNext}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emiFeilds, setEmiFeilds]= useState({p:0,r:'00.00 %',t:0,m:0});
  const t = useRef(0);
  const m = useRef(0);
  const loanProfileHander=(profile) => {
    indexloanProfileHander(profile);
  }
  


  useEffect(() => {
    setLoading(false);
  }, []);

  const loanSchema = Yup.object().shape({
    loanAmt: Yup.string().max(255).required('Loan Amount is required'),
    tenure: Yup.string().max(255).required('Tenure is required'),
    // roi:Yup.string().max(255).required('Rate of interest is required'),
    // emi: Yup.string().max(255).required('Engine Number is required'),
    emidate: Yup.string().max(255).required('Emi Date is required'),
  });

  

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  
  const formik = useFormik({
    initialValues: getInitialValues(loan),
    validationSchema: loanSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      loanProfileHander(values);
      setSubmitting(true);
      handleAlertClose();
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  

  if (loading)
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularWithPath />
        </Stack>
      </Box>
    );

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{loan ? 'Edit loan' : 'New loan'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
               
                <Grid item xs={12} md={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="loan-loanAmt">Loan Amount</InputLabel>
                        <NumericFormat  thousandSeparator="," fullWidth customInput={TextField} placeholder="Loan amount" 
                        id="loan-loanAmt"
                        {...getFieldProps('loanAmt')}
                        onValueChange={value => setEmiFeilds({...emiFeilds,p:value.value})}
                        error={Boolean(touched.loanAmt && errors.loanAmt)}
                        helperText={touched.loanAmt && errors.loanAmt}/>
                        
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel>Rate of Interest(per yr)</InputLabel>
                        <PatternFormat format=" ##.## %" mask="_" fullWidth customInput={TextField} placeholder="Rate of Interest" 
                        id="loan-roi"
                        {...getFieldProps('roi')}
                        error={Boolean(touched.roi && errors.roi)}
                        helperText={touched.roi && errors.roi}
                        onChange={value => {setEmiFeilds({...emiFeilds,r:value.target.value}),formik.setFieldValue("roi",value.target.value)}}/>
                     
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="loan-tenureYears">Tenure Years </InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="loan-tenureYears"
                          placeholder="Tenure in Years"
                          {...getFieldProps('tenureYears')}
                          error={Boolean(touched.tenureYears && errors.tenureYears)}
                          helperText={touched.tenureYears && errors.tenureYears}
                          inputRef={t}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="loan-tenureMonths">Months</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="loan-tenureMonths"
                          placeholder="Added Tenure in Months"
                          {...getFieldProps('tenureMonths')}
                          error={Boolean(touched.tenureMonths && errors.tenureMonths)}
                          helperText={touched.tenureMonths && errors.tenureMonths}
                          inputRef={m}
                        />
                      </Stack>
                    </Grid>
                    
                    
                    
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="loan-emidate">Emi Start Date</InputLabel>
                        <DatePicker 
                        id="loan-emidate"
                        type="date"
                        format='dd/MM/yyyy'
                        onChange={(value) => {formik.setFieldValue("emidate",value.toLocaleDateString())}}
                        // {...getFieldProps('emidate')}
                        />
                      </Stack>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel>Monthly Emi Amount (Rs)</InputLabel>
                        <NumericFormat  thousandSeparator="," fullWidth customInput={TextField} 
                        placeholder={((parseInt(emiFeilds.p) * (parseFloat(emiFeilds.r.substring(0,6))/100))/12)+ (parseInt(emiFeilds.p) / (parseInt(t.current.value) * 12  + parseInt(m.current.value))) + ' /-'}
                        
                        id="loan-emi"
                        {...getFieldProps('emi')}
                        error={Boolean(touched.emi && errors.emi)}
                        helperText={touched.emi && errors.emi}/>
                      </Stack>
                    </Grid>
                    
                    
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
           
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button variant="outlined" disabled={activeStep === 0} onClick={() => handleBack(activeStep,formik.values)} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep !== steps &&
                (completed[activeStep] ? (
                  <Button color="success">Step {activeStep + 1} already completed</Button>
                ) : (
                  <Button onClick={() => handleComplete(activeStep,formik.values)} color="success" variant={activeStep === totalSteps() - 1 ? 'contained' : 'outlined'}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
              <Button disabled={activeStep === steps - 1} onClick={() => handleNext(activeStep,formik.values)} sx={{ ml: 1 }} variant="contained" color="primary">
                Next
              </Button>
            </Box>
    </>
  );
};

LoanProfile.propTypes = {
  loan: PropTypes.object,
  closeModal: PropTypes.func
};

export default LoanProfile;
