import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PatternFormat } from 'react-number-format';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  RadioGroup,
  Radio
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertCustomerDelete from './AlertCustomerDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { openSnackbar } from 'api/snackbar';
import { insertCustomer, updateCustomer ,uploadPhoto as customerPhotoUpload ,customersListUpdate} from 'api/customer';
import { ThemeMode } from 'config';
import { Gender } from 'data/react-table';

//auth 
import useAuth from 'hooks/useAuth';

// assets
import { CameraOutlined, DeleteFilled} from '@ant-design/icons';

const avatarImage = require.context('assets/images/users', true);


// constant
const getInitialValues = (customer) => {
  const newCustomer = {
    clientId:'',
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    avathar: 1,
    gender: Gender.FEMALE,
    dob: null,
    fatherName: '',
    aadhar: '',
    status: 2,
    address: '',
    about: '',
    age:'',
    contact:'',
    country:'india'
    
  };

  if (customer) {
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const allStatus = [
  { value: 3, label: 'Rejected' },
  { value: 1, label: 'Verified' },
  { value: 2, label: 'Pending' }
];

// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

const FormCustomerAdd = ({ customer, closeModal ,createdCustomer}) => {
  const theme = useTheme();
  const {user}=useAuth();
  console.log(user)
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    avatarImage(`./avatar-${customer && customer !== null && customer?.avatar ? customer.avatar : `1.png`}`)
  );

  const passCreatedCustomerSuper=(id) => {
    createdCustomer(id);
  }
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);


  useEffect(() => {
    setLoading(false);
  }, []);

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('First Name is required'),
    lastName: Yup.string().max(255).required('Last Name is required'),
    aadhar: Yup.string().max(14).required('Aadhar is required'),
    contact: Yup.string().max(16).required('Contact No is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    status: Yup.string().required('Status is required'),
    address: Yup.string().max(255).required('Address is required'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const onFileChange = async (file) => {
    console.log('photo uploading');
    setLoading(true);
    setSelectedImage(file);
    const formData = new FormData();
    formData.append(
        "file",
        file,
        file.name
    );
    await customerPhotoUpload(formData).then((data) => { 
      formik.setFieldValue("avathar",data.data)
      setPhotoId(data.data); console.log(data) }).catch((ex) => console.log(ex));
    console.log(photoId);
    setLoading(false);
};
  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      // values.avathar=photoId;
      values.clientId= user.userId;
      try {
        let newCustomer = values;
        newCustomer.name = newCustomer.firstName + ' ' + newCustomer.lastName;

        if (customer) {
          updateCustomer(newCustomer.id, newCustomer).then(() => {
            openSnackbar({
              open: true,
              message: 'Customer update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            closeModal();
          });
        } else {
          await insertCustomer(newCustomer).then((data) => {
            passCreatedCustomerSuper(data.data.customerId);
            customersListUpdate(data.data);
            openSnackbar({
              open: true,
              message: 'Customer added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

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
            <DialogTitle>{customer ? 'Edit Customer' : 'New Customer'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => onFileChange(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-firstName">First Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-firstName"
                          placeholder="Enter First Name"
                          {...getFieldProps('firstName')}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-lastName">Last Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-lastName"
                          placeholder="Enter Last Name"
                          {...getFieldProps('lastName')}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={8}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Customer Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-dob">Date of Birth</InputLabel>
                        <DatePicker 
                        id="customer-dob"
                        type="date"
                        onChange={(value) => {formik.setFieldValue("dob",value.toLocaleDateString())}}
                        // {...getFieldProps('dob')}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-fatherName">Father Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-fatherName"
                          placeholder="Enter Father Name"
                          {...getFieldProps('fatherName')}
                          error={Boolean(touched.fatherName && errors.fatherName)}
                          helperText={touched.fatherName && errors.fatherName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Contact Number</InputLabel>
                        <PatternFormat format="+91 ### ### ####" mask="_" fullWidth customInput={TextField} placeholder="Contact Number" 
                        id="customer-contact"
                        {...getFieldProps('contact')}
                        error={Boolean(touched.contact && errors.contact)}
                        helperText={touched.contact && errors.contact}/>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-gender">Gender</InputLabel>
                        <RadioGroup row aria-label="payment-card" {...getFieldProps('gender')}>
                          <FormControlLabel control={<Radio value={Gender.FEMALE} />} label={Gender.FEMALE} />
                          <FormControlLabel control={<Radio value={Gender.MALE} />} label={Gender.MALE} />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Aadhar Number</InputLabel>
                        <PatternFormat format="#### #### ####" mask="_" fullWidth customInput={TextField} placeholder="Aadhar Number" 
                       id="customer-aadhar"
                       {...getFieldProps('aadhar')}
                       error={Boolean(touched.aadhar && errors.aadhar)}
                       helperText={touched.aadhar && errors.aadhar}/>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-status">Status</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('status')}
                            onChange={(event) => setFieldValue('status', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Select Status</Typography>;
                              }

                              const selectedStatus = allStatus.filter((item) => item.value === Number(selected));
                              return (
                                <Typography variant="subtitle2">
                                  {selectedStatus.length > 0 ? selectedStatus[0].label : 'Pending'}
                                </Typography>
                              );
                            }}
                          >
                            {allStatus.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.status && errors.status && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.status}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-address">Address</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-address"
                          multiline
                          rows={2}
                          placeholder="Enter Address"
                          {...getFieldProps('address')}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-about">About Customer</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-about"
                          multiline
                          rows={2}
                          placeholder="Enter Customer Information"
                          {...getFieldProps('about')}
                          error={Boolean(touched.about && errors.about)}
                          helperText={touched.about && errors.about}
                        />
                      </Stack>
                    </Grid>
                    
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {customer && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {customer ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {customer && <AlertCustomerDelete id={customer.id} title={customer.name} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

FormCustomerAdd.propTypes = {
  customer: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormCustomerAdd;
