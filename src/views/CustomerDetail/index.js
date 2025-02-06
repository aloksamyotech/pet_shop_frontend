import React, { useState, useEffect } from 'react';
import { Stack, Box, Grid, Typography, Divider, Button, TextField } from '@mui/material';
import { Email} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useParams } from 'react-router';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

const CustomerDetail = () => {
  const [value, setValue] = useState('1');
  const [orderList, setOrderList] = useState([]);
  const location = useLocation();
  const DataCustomer = location.state?.customer || null;
 

 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrder = async () => {
    try {
      const response = await getApi(urls.order.get);
      const DataOrder = response?.data?.data;
     
      const filteredOrders = DataOrder.filter(order => order.customerId === DataCustomer?._id);
    
      setOrderList(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
                marginTop: '-7px',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: '600', color: 'black' }}>
                Profile
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid spacing={2} container md={12} direction="column">
          <Box sx={{ width: 'auto', height: 'auto', p: '4px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Box sx={{ borderBottom: 1, border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <TabList onChange={handleChange} indicatorColor="none">
                <Tab
                  icon={<AccountCircleIcon sx={{ fontWeight: 'bold' }} />}
                  iconPosition="start"
                  label="Profile"
                  value="1"
                  sx={{ fontWeight: 'bold' }}
                />
                <Tab icon={<AccountBoxIcon />} iconPosition="start" label="My Order" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <Box sx={{ width: '100%', height: '45vh', border: '1px solid #d3d3d3', borderRadius: '8px' }}>
                    <Grid>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '15vh', p: '5px' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                          {DataCustomer?.firstName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Divider sx={{ backgroundColor: 'black', borderWidth: '1px' }} />
                    <Grid direction="column" spacing={1}>
                      <Box sx={{ width: '100%', height: '10vh', display: 'flex', p: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Email style={{ fontSize: '18px' }} />
                          <Typography sx={{ fontSize: '18px' }}>Email</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '15px' }}>{DataCustomer?.email}</Typography>
                      </Box>
                    </Grid>
                    <Divider sx={{ backgroundColor: 'black', borderWidth: '1px' }} />
                    <Grid direction="column" spacing={1}>
                      <Box sx={{ width: '100%', height: '10vh', display: 'flex', p: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PhoneIcon style={{ fontSize: '18px' }} />
                          <Typography sx={{ fontSize: '18px' }}>Phone Number</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '15px' }}>{DataCustomer?.phoneNumber}</Typography>
                      </Box>
                    </Grid>
                    <Divider sx={{ backgroundColor: 'black', borderWidth: '1px' }} />
                    <Grid direction="column" spacing={1}>
                      <Box sx={{ width: '100%', height: '10vh', display: 'flex', p: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <LocationOnIcon style={{ fontSize: '18px' }} />
                          <Typography sx={{ fontSize: '18px' }}>Location</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '15px' }}>{DataCustomer?.address}</Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value="2">
              <Grid container>
                <Box sx={{ width: '100%', height: 'auto', backgroundColor: 'white', p: '20px' }}>
                  <Typography sx={{ fontFamily: '-moz-initial', fontWeight: '400px', fontSize: '18px' }}>
                    My Orders
                  </Typography>
                  <Divider sx={{ backgroundColor: 'black', borderWidth: '1px' }} />
                  {orderList?.length ? (
                    orderList.map((order) => (
                      <Box sx={{ border: '1px solid #d3d3d3', borderRadius: '8px', margin: '10px 0', padding: '15px' }} key={order.id}>
                        <Typography variant="h6">Order ID: {order.id}</Typography>
                        <Typography>Order Date: {order.date}</Typography>
                        <Typography>Total Amount: {order.totalAmount}</Typography>
                        <Typography>Status: {order.status}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>No orders found for this customer.</Typography>
                  )}
                </Box>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default CustomerDetail;
