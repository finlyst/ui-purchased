import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

// import { insertvechile, updatevechile ,uploadPhoto as vechilePhotoUpload ,vechilesListUpdate} from 'api/vechile';

// assets



// constant
const getInitialValues = (vechile) => {
  const newVechile = {
    clientId:'',
    vechileNo: '',
    chassisNo: '',
    engineNo: '',
    modelName: '',
    dofMfd: null,
    insuranceCompany: '',
    policyNo: ''
  };

  if (vechile) {
    return _.merge({}, newVechile, vechile);
  }

  return newVechile;
};



// ==============================|| vechile ADD / EDIT - FORM ||============================== //

const FormVechileProfile = ({vechile, indexvechileProfileHander,
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

  const vechileProfileHander=(profile) => {
    indexvechileProfileHander(profile);
  }
  


  useEffect(() => {
    setLoading(false);
  }, []);

  const VechileSchema = Yup.object().shape({
    vechileNo: Yup.string().max(255).required('Vechile No Name is required'),
    chassisNo: Yup.string().max(255).required('Chassis Number is required'),
    engineNo: Yup.string().max(255).required('Engine Number is required'),
    modelName: Yup.string().max(255).required('Model Name is required'),
    dofMfd: Yup.string().max(255).required('Date of Manufatured is required'),
    insuranceCompany: Yup.string().max(255).required('Company is required'),
    policyNo: Yup.string().max(255).required('Policy number is required')
  });

  

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  
  const formik = useFormik({
    initialValues: getInitialValues(vechile),
    validationSchema: VechileSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      vechileProfileHander(values);
      setSubmitting(true);
      handleAlertClose();
    }
  });

  // const handleChildSubmit= () => {
  //   console.log('formik values')
  //   console.log(formik.values);
  //   handleNext(activeStep, formik.values);
  // }
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
            <DialogTitle>{vechile ? 'Edit Vechile' : 'New Vechile'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-vechileNo">Vechile Number</InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-vechileNo"
                          placeholder="Enter Vechile no"
                          {...getFieldProps('vechileNo')}
                          error={Boolean(touched.vechileNo && errors.vechileNo)}
                          helperText={touched.vechileNo && errors.vechileNo}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-chassisNo">Chassis No </InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-chassisNo"
                          placeholder="Enter Chassis Number"
                          {...getFieldProps('chassisNo')}
                          error={Boolean(touched.chassisNo && errors.chassisNo)}
                          helperText={touched.chassisNo && errors.chassisNo}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-engineNo">Engine Number</InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-engineNo"
                          placeholder="Enter vechile engineNo"
                          {...getFieldProps('engineNo')}
                          error={Boolean(touched.engineNo && errors.engineNo)}
                          helperText={touched.engineNo && errors.engineNo}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-modelName">Model Name</InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-modelName"
                          placeholder="Enter Model Name"
                          {...getFieldProps('modelName')}
                          error={Boolean(touched.modelName && errors.modelName)}
                          helperText={touched.modelName && errors.modelName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-dofMfd">Date of Manufatured</InputLabel>
                        <DatePicker
                          id="vechile-dofMfd"
                          type="date"
                          format="dd/MM/yyyy"
                          onChange={(value) => {
                            formik.setFieldValue('dofMfd', value.toLocaleDateString());
                          }}
                          // {...getFieldProps('dofMfd')}
                        />
                      </Stack>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sm={6} md={5}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-insuranceCompany">Insurance Company</InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-insuranceCompany"
                          placeholder="Enter insurance Company"
                          {...getFieldProps('insuranceCompany')}
                          error={Boolean(touched.insuranceCompany && errors.insuranceCompany)}
                          helperText={touched.insuranceCompany && errors.insuranceCompany}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="vechile-policyNo">Policy Number</InputLabel>
                        <TextField
                          fullWidth
                          id="vechile-policyNo"
                          placeholder="Enter vechile policy number"
                          {...getFieldProps('policyNo')}
                          error={Boolean(touched.policyNo && errors.policyNo)}
                          helperText={touched.policyNo && errors.policyNo}
                        />
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
            <Button
              onClick={() => handleComplete(activeStep,formik.values)}
              color="success"
              variant={activeStep === totalSteps() - 1 ? 'contained' : 'outlined'}
            >
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          ))}
        <Button
          disabled={activeStep === steps - 1}
          onClick={() => handleNext(activeStep,formik.values)}
          sx={{ ml: 1 }}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </Box>
    </>
  );
};

FormVechileProfile.propTypes = {
  vechile: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormVechileProfile;
