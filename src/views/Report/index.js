import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Box, Typography, Breadcrumbs, Tab, TableHead, TableContainer,
  TableBody, TableRow, Table, TableCell, Paper, MenuItem, Select, FormControl,Stack,Card,Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Home as HomeIcon } from '@mui/icons-material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const Checkout = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("1");
  const [product, setProduct] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [filter, setFilter] = useState("daily"); 
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [product, purchase, filter]);

  const fetchData = async () => {
    const orderResponse = await getApi(urls.order.get);
    const purchaseResponse = await getApi(urls.purchase.get);

    setProduct(orderResponse?.data?.data || []);
    setPurchase(purchaseResponse?.data?.data || []);
  };

  const filterData = () => {
    const now = new Date();
  
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    let startDate;
    if (filter === "daily") {
      startDate = startOfDay;
    } else if (filter === "weekly") {
      startDate = oneWeekAgo;
    } else {
      startDate = oneMonthAgo;
    }

    setFilteredProduct(product.filter(item => new Date(item.createdAt) >= startDate));
    setFilteredPurchase(purchase.filter(item => new Date(item.createdAt) >= startDate));
  };

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  return (
    <Grid >
      <TabContext value={tabValue}>
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
            <Breadcrumbs aria-label="breadcrumb">
              <HomeIcon sx={{ color: '#2067db' }}  onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Report
              </Typography>
            </Breadcrumbs>

       </Box>
        </Stack>

       
<Box sx={{marginTop:'-65px' ,backgroundColor: 'white', borderRadius: '10px',}}>
        <Grid container spacing={2} direction="column">
         
          <Box display="flex" alignItems="center" justifyContent="space-between">
          <TabList indicatorColor="none" onChange={(event, newValue) => setTabValue(newValue)}>
    <Tab
      value="1" 
      sx={{ fontWeight: 'bold' }}
      label={
        <Box display="flex" alignItems="center">
          <ShoppingCartIcon sx={{ fontSize: '20px',marginLeft:'5px'}} /> Sales
        </Box>
      }
    />
    <Tab
      value="2"
      label={
        <Box display="flex" alignItems="center">
          <InventoryIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> Purchase
        </Box>
      }
    />
  </TabList>

  
     <Select value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ marginLeft: 'auto', mt:'10px' , mr:'10px' }}>
    <MenuItem value="daily">Daily</MenuItem>
    <MenuItem value="weekly">Weekly</MenuItem>
    <MenuItem value="monthly">Monthly</MenuItem>
     </Select>
      </Box>


          
            <TabPanel value='1'>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#9053bc' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white' }}>Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Customer</TableCell>
                      <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                      <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProduct.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{item?.customerName}</TableCell>
                        <TableCell>{item?.customerPhone}</TableCell>
                        <TableCell>{item?.products?.[0]?.productName}</TableCell>
                        <TableCell>{item?.products?.[0]?.quantity}</TableCell>
                        <TableCell>{item?.totalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            
            <TabPanel value='2'>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#9053bc' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white' }}>Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Supplier</TableCell>
                      <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                      <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPurchase.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{item?.CompanyName?.[0]?.companyName}</TableCell>
                        <TableCell>{item?.CompanyName?.[0]?.phoneNumber}</TableCell>
                        <TableCell>{item?.productName?.[0]?.productName}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>{item?.totalPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
         
        </Grid> </Box>
      </TabContext>
    </Grid>
  );
};

export default Checkout;
