import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  Divider,
  Table,
  Typography,
  Card,
  Box,
  Grid,
  Breadcrumbs,
  TableCell,
  Stack,
  IconButton,
  TextField,
  Avatar
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import TableStyle from '../../ui-component/TableStyle';
import { Email } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useLocation, useParams } from 'react-router';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


const CustomerDetail = () => {
  const [value, setValue] = useState('1');
  const [orderList, setOrderList] = useState([]);
  const [orderDate, setOrderDate] = useState();
  const location = useLocation();

  const navigate = useNavigate();
  const date = new Date(orderDate);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  const DataCustomer = location.state?.customer || null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrder = async () => {
    try {
      const response = await getApi(urls.order.get);
      const DataOrder = response?.data?.data;
      const filteredOrders = DataOrder.filter((order) => order.customerId === DataCustomer?._id);
      setOrderList(filteredOrders);
      setOrderDate(response.data.data[0].createdAt);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (DataCustomer?._id) {
      fetchOrder();
    }
  }, [DataCustomer]);

  return (
    <Grid container>
      <TabContext value={value}>
        <Grid sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" mb={5}>
          <Box
            sx={{
              backgroundColor: 'white',
              height: '50px',
              width: '100%',
              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 25px',
             mb:'40px'
            }}
          >
            
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                  <HomeIcon />
                </IconButton>
                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />

                <Typography
                  onClick={() => navigate(-1)}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '15px',
                    mx: 1,
                    '&:hover': { color: '#2067db' }
                  }}
                >
                  Customer
                </Typography>

                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
                <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>
                  View Customer
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid spacing={2} container md={12} direction="column">
          <Box sx={{ width: 'auto', height: 'auto', p: '4px', backgroundColor: 'white', borderRadius: '10px', ml: '20px', marginTop: '-50px',mr:'-15px' }}>
            <Box sx={{ borderBottom: 1, border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <TabList onChange={handleChange} indicatorColor="primary">
                <Tab
                  icon={<AccountCircleIcon sx={{ fontWeight: 'bold' }} />}
                  iconPosition="start"
                  label="Profile"
                  value="1"
                  sx={{ fontWeight: 'bold' }}
                />
                <Tab icon={<ReceiptLongIcon />} iconPosition="start" label="Order list" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">

            <Grid container spacing={3} alignItems="stretch">
                  <Grid item xs={12} sm={4} display="flex" height="auto">
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        width: '100%'
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>Customer Picture</Typography>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <Avatar
                          alt="Profile Image"
                          src={
                            'https://png.pngtree.com/png-clipart/20240702/original/pngtree-indian-office-girl-wearing-formal-black-and-white-dress-with-long-png-image_15465282.png'
                          }
                          sx={{
                            width: 130,
                            height: 130,
                            borderRadius: '50%',
                            backgroundColor: '#7760f6'
                          }}
                        />
                      </Box>
                      <Typography sx={{ color: 'gray', fontSize: '12px', marginBottom: '10px' }}>Admin</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>Account Details</Typography>
                      <Divider />

                      <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            defaultValue= {DataCustomer?.firstName} 
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            defaultValue= {DataCustomer?.email}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            defaultValue={DataCustomer?.address || 'No Address Provided'}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            defaultValue={DataCustomer?.phoneNumber || 'N/A'}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>




              {/* <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      textAlign: 'center'
                    }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 80, color: 'gray' }} />

                    <Typography variant="h5" fontWeight="bold" mt={2}>
                      {DataCustomer?.firstName} {DataCustomer?.lastName}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1} justifyContent="center" mt={1}>
                      <Email sx={{ fontSize: 20, color: 'gray' }} />
                      <Typography variant="body1" color="gray">
                        {DataCustomer?.email}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                      <PhoneIcon sx={{ fontSize: 20, color: 'gray' }} />
                      <Typography variant="body1">{DataCustomer?.phoneNumber || 'N/A'}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} justifyContent="center" mt={1}>
                      <LocationOnIcon sx={{ fontSize: 20, color: 'gray' }} />
                      <Typography variant="body1">{DataCustomer?.address || 'No Address Provided'}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid> */}
            </TabPanel>

            <TabPanel value="2">
              <Box
                sx={{
                  overflowY: 'auto',
                  maxHeight: '60vh',
                  padding: 0,
                  margin: 0
                }}
              >
                {Array.isArray(orderList) && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#9053bc' }}>
                        <TableRow sx={{ fontWeight: 'bold' }}>
                          <TableCell sx={{ color: 'white' }}>Date</TableCell>
                          <TableCell sx={{ color: 'white' }}>Product Name</TableCell>

                          <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                          <TableCell sx={{ color: 'white' }}>totalAmount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderList.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{formattedDate}</TableCell>
                            <TableCell>{item?.products?.[0]?.productName}</TableCell>
                            <TableCell>{item?.products?.[0]?.quantity}</TableCell>
                            <TableCell>{item?.totalAmount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </TabPanel>
          </Box>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default CustomerDetail;
