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
  Stack
} from '@mui/material';
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

const CustomerDetail = () => {
  const [value, setValue] = useState('1');
  const [orderList, setOrderList] = useState([]);
  const [orderDate, setOrderDate] = useState();
  const location = useLocation();



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
const filteredOrders = DataOrder.filter((order) => order.customerId === DataCustomer?._id);      setOrderList(filteredOrders);
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
                marginTop: '-7px'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: '600', color: 'black' }}>
                Profile
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid spacing={2} container md={12} direction="column">
          <Box sx={{ width: 'auto', height: 'auto', p: '4px', backgroundColor: 'white', borderRadius: '10px' ,ml:'30px'}}>
            <Box sx={{ borderBottom: 1, border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <TabList onChange={handleChange} indicatorColor="none">
                <Tab
                  icon={<AccountCircleIcon sx={{ fontWeight: 'bold' }} />}
                  iconPosition="start"
                  label="Profile"
                  value="1"
                  sx={{ fontWeight: 'bold' }}
                />
                <Tab icon={<ReceiptLongIcon />} iconPosition="start" label="My Order" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Grid container justifyContent="center">
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
              </Grid>
            </TabPanel>

          

            <TabPanel value='2'>
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
