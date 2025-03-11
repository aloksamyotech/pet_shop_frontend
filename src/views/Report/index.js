import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Box, Typography, IconButton, Tab, TableHead, TableContainer,
  TableBody, TableRow, Table, TableCell, Paper, MenuItem, Select, TextField, Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Home as HomeIcon } from '@mui/icons-material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Checkout = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("1");
  const [product, setProduct] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orderResponse = await getApi(urls.order.get);
    const purchaseResponse = await getApi(urls.purchase.get);
    setProduct(orderResponse?.data?.data || []);
    setPurchase(purchaseResponse?.data?.data || []);
  };

  const filterData = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    setFilteredProduct(product.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= start && itemDate <= end;
    }));
    setFilteredPurchase(purchase.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= start && itemDate <= end;
    }));
  };

  return (
    <Grid>
      <TabContext value={tabValue}>
        <Box sx={{ backgroundColor: 'white', height: '50px', display: 'flex', borderRadius: '10px', alignItems: 'center', padding: '0 25px', mb: '15px' }}>
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
            <HomeIcon />
          </IconButton>
          <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black', mr: 1 }} />
          <Typography variant='h5'>Report</Typography>
        </Box>

        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', mb: '15px' }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mr: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" sx={{backgroundColor: '#9053bc' , '&:hover': {backgroundColor: '#9053bc'}  , mt:'4px'}} onClick={filterData}> Apply Filter</Button>
        </Box>

<Box sx={{backgroundColor:'#fff'}}>
        <TabList indicatorColor="primary" onChange={(event, newValue) => setTabValue(newValue)}>
          <Tab value="1" label={<Box display="flex" alignItems="center"><ShoppingCartIcon sx={{ fontSize: '20px', mr: 1 }} /> Sales</Box>} />
          <Tab value="2" label={<Box display="flex" alignItems="center"><InventoryIcon sx={{ fontSize: '20px', mr: 1 }} /> Purchase</Box>} />
        </TabList>

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

        </Box>
      </TabContext>
    </Grid>
  );
};

export default Checkout;
