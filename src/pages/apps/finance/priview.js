import PropTypes from 'prop-types';
import {  useState,useEffect } from 'react';

// material-ui
import {
  useMediaQuery,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Tooltip
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';
import ListCard from './pdfDownload';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';

import { getCustomerProfile } from 'api/customer';
// assets
import { DeleteOutlined, 
    DownloadOutlined, 
    EditOutlined } from '@ant-design/icons';

const avatarImage = require.context('assets/images/finlystLogo', true);

// ==============================|| CUSTOMER - CARD PREVIEW ||============================== //
// const customerList = 
//     {
//         "id": 1,
//         "firstName": "Joe",
//         "lastName": "Schilder",
//         "name": "Joe Schilder",
//         "email": "sip@gmail.com",
//         "age": 39,
//         "gender": "Female",
//         "role": "Scientific Writer",
//         "orders": 9603,
//         "progress": 44,
//         "status": 3,
//         "aadhar": "Dispatched",
//         "contact": "(731) 342-9783",
//         "country": "Canada",
//         "location": "1631 Melgu Square, Ujdeme, Maldives - 56391",
//         "fatherName": "Isaac McGee",
//         "about": "Worbov fuggodbe uvawo za rimpewej uc wehele comi buan wam mes gacebu meb fupgop webkem gon enmile.",
//         "avatar": 8,
//         "skills": [
//             "Wireframing",
//             "Figma",
//             "Web App",
//             "ES6",
//             "UX",
//             "Javascript"
//         ],
//         "time": [
//             "2 days ago"
//         ],
//         "date": "29.07.2023"
//     }
//   ;

//   const loan= {
//     loanAmt:'250000',
//     tenureYears: '10',
//     tenureMonths: '3',
//     roI: '10.12',
//     emi: '12256',
//     emidate: '01/02/2023'
//   };
//   const vechile={
//     clientId:'123',
//     vechileNo: 'AP 27 BL 8947',
//     chassisNo: '1254 8796 3214 56',
//     engineNo: '1245 4546 4654 4565',
//     modelName: 'Honda City',
//     dofMfd: '12/06/1995',
//     insuranceCompany: 'Insurance Company ',
//     policyNo: 'PLY1230565'
//   };

  
export default function CustomerPreview({ open=true,customerId,surityId,vechilProfile,loanProfile ,editCustomer,
    activeStep,
    handleBack,
    steps,
    completed,
    handleComplete,
    totalSteps,
    completedSteps,
    handleNext}) {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [openAlert, setOpenAlert] = useState(false);
  const[customer,setCustomer] = useState();
  const[surity,setSurity] = useState();

  useEffect(() => {
    console.log(Object.keys(customerId)[0]);
     getCustomerProfile(Object.keys(customerId)[0]).then((data) => setCustomer(data.data)).catch(error => console.log(error));
     getCustomerProfile(Object.keys(surityId)[0]).then((data) => setSurity(data.data)).catch(error => console.log(error));
    },[]);
  console.log(customer);
  console.log(surity);
  console.log(customerId);
  console.log(surityId);
  console.log(vechilProfile);
  console.log(loanProfile);
const onClose =() => {
    setOpenAlert(!openAlert);
}
  const handleClose = () => {
    setOpenAlert(!openAlert);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={PopupTransition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: 1024, maxWidth: 1, m: { xs: 1.75, sm: 2.5, md: 4 } } }}
      >
       {customer ?
        <Box id="PopupPrint" sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 1 }}>
        <DialogTitle sx={{ px: 0 }}>
          <List sx={{ width: 1, p: 0 }}>
            <ListItem
              disablePadding
              secondaryAction={
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                   <PDFDownloadLink document={<ListCard customer={customer} surity={customer} vechilProfile={vechilProfile} loanProfile={loanProfile} />} fileName={`Customer-${customer.name}.pdf`}>
                    <Tooltip title="Export">
                      <IconButton color="secondary">
                        <DownloadOutlined />
                      </IconButton>
                    </Tooltip>
                  </PDFDownloadLink> 
                  <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={editCustomer}>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" onClick={handleClose}>
                    <IconButton color="error">
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            >
              <ListItemAvatar sx={{ mr: 0.75 }}>
                <Avatar alt={customer.name} size="lg" src={avatarImage(`./finlystLogo2.png`)} />
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="h5">Finance Profile</Typography>} />
            </ListItem>
          </List>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 0 }}>
          <SimpleBar sx={{ height: 'calc(100vh - 290px)' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} xl={9}>
                <Grid container spacing={2.25}>
                  <Grid item xs={12}>
                    <MainCard title="Loan Applicants">
                      <List sx={{ py: 0 }}>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Applicant Name</Typography>
                                <Typography>{customer.name}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Father Name</Typography>
                                <Typography>{customer.fatherName}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Contact Number</Typography>
                                <Typography>
                                  <PatternFormat displayType="text" format="+91 ###-###-####" mask="_" defaultValue={customer.contact} />
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Aadhar Number </Typography>
                                <Typography>
                                  <PatternFormat displayType="text" format="####-####-####" mask="_" defaultValue={customer.aadhar} />
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={12}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Address</Typography>
                                <Typography>{customer.location}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <MainCard title="Surity for Applicants ">
                      <List sx={{ py: 0 }}>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Applicant Name</Typography>
                                <Typography>{surity.name}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Father Name</Typography>
                                <Typography>{surity.fatherName}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Contact Number</Typography>
                                <Typography>
                                  <PatternFormat displayType="text" format="+91 ###-###-####" mask="_" defaultValue={surity.contact} />
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Aadhar Number </Typography>
                                <Typography>
                                  <PatternFormat displayType="text" format="####-####-####" mask="_" defaultValue={surity.aadhar} />
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={12}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Address</Typography>
                                <Typography>{surity.location}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <MainCard title="Vechile & Insurance Profile">
                      <List sx={{ py: 0 }}>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Vechile Number</Typography>
                                <Typography>{vechilProfile.vechileNo}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Chassis Number </Typography>
                                <Typography>{vechilProfile.chassisNo}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Engine Number</Typography>
                                <Typography>{vechilProfile.engineNo}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Model Name </Typography>
                                <Typography>{vechilProfile.modelName}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Date for Manufatured Number</Typography>
                                <Typography>{vechilProfile.dofMfd}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider>
                          <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Insurance Company</Typography>
                                <Typography>{vechilProfile.insuranceCompany}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Policy Number </Typography>
                                <Typography>{vechilProfile.policyNo}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </MainCard>
                  </Grid>
                  
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} xl={3}>
                <MainCard title="Loan Profile">
                  <Stack spacing={2}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Loan Amount</Typography>
                      <Typography >{loanProfile.loanAmt}</Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Tenure</Typography>
                      <Typography>
                        Years : {loanProfile.tenureYears}, Months : {loanProfile.tenureMonths}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Rate Of Interest</Typography>
                      <Typography>
                        <PatternFormat displayType="text" format="##-## %" mask="_" defaultValue={loanProfile.roi} />
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Emi Start Date</Typography>
                      <Typography >{loanProfile.emidate}</Typography>
                    </Stack>
                   
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </SimpleBar>
        </DialogContent>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button variant="outlined" disabled={activeStep === 0} onClick={() => handleBack()} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep !== steps &&
              (completed[activeStep] ? (
                <Button color="success">Step {activeStep + 1} already completed</Button>
              ) : (
                <Button onClick={() => handleComplete()} color="success" variant={activeStep === totalSteps() - 1 ? 'contained' : 'outlined'}>
                  {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                </Button>
              ))}
            <Button disabled={activeStep === steps - 1} onClick={() => handleNext()} sx={{ ml: 1 }} variant="contained" color="primary">
              Next
            </Button>
          </Box>
        
      </Box>
        : 'No customer selected'} 
      </Dialog>
      {customer ? <AlertCustomerDelete id={customer.id} title={customer.name} open={openAlert} handleClose={handleClose} />   : 'No customer selected'} 
     
    </>
  );
}

CustomerPreview.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  editCustomer: PropTypes.func
};
