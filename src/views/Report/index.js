import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Tab,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  Paper,
  MenuItem,
  Select,
  TextField,
  Button
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
  const [tabValue, setTabValue] = useState('1');
  const [product, setProduct] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj?.currencySymbol || '$';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orderResponse = await getApi(urls.order.get);
    const purchaseResponse = await getApi(urls.purchase.get);

    const orders = orderResponse?.data?.data || [];
    const purchases = purchaseResponse?.data?.data || [];

    setProduct(orders);
    setPurchase(purchases);
    setFilteredProduct(orders);
    setFilteredPurchase(purchases);
  };

  const filterData = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    const filteredProducts = product.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    const filteredPurchases = purchase.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    setFilteredProduct(filteredProducts);
    setFilteredPurchase(filteredPurchases);
  };

  const isFilterDisabled = !startDate || !endDate;


  return (
    <Grid>
      <TabContext value={tabValue}>
        <Box
          sx={{
            backgroundColor: 'white',
            height: '50px',
            display: 'flex',
            borderRadius: '10px',
            alignItems: 'center',
            padding: '0 25px',
            mb: '15px'
          }}
        >
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
            <HomeIcon />
          </IconButton>
          <ArrowBackIosNewRoundedIcon
            sx={{
              transform: 'rotate(180deg)',
              fontSize: '18px',
              color: 'black',
              mr: 1
            }}
          />
          <Typography variant="h5">Report</Typography>
        </Box>

   
        <Box
  sx={{
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    mb: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 2,
  }}
>
  <TextField
    label="Start Date"
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
  />

  <TextField
    label="End Date"
    type="date"
    value={endDate}
    onChange={(e) => {
      const selectedEndDate = new Date(e.target.value);
      const selectedStartDate = new Date(startDate);
      if (selectedEndDate >= selectedStartDate) {
        setEndDate(e.target.value);
      }
    }}
    InputLabelProps={{ shrink: true }}
  />

  <Button
    variant="contained"
    disabled={isFilterDisabled}
    sx={{
      backgroundColor: isFilterDisabled ? '#ddd' : '#6A9C89',
      color: '#fff',
      '&:hover': {
        backgroundColor: isFilterDisabled ? '#ddd' : '#8DB3A8',
      },
    }}
    onClick={filterData}
  >
    Apply Filter
  </Button>

  <Button
    variant="outlined"
    sx={{
      color: '#6A9C89',
      borderColor: '#6A9C89',
      '&:hover': {
        borderColor: '#8DB3A8',
        color: '#8DB3A8',
      },
    }}
    onClick={() => {
      setStartDate('');
      setEndDate('');
      setFilteredPurchase(purchase);
      setFilteredProduct(orders);
    }}
  >
    Clear Filter
  </Button>
</Box>


      
        <Box sx={{ backgroundColor: '#fff' }}>
        <TabList
  sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: '#6A9C89', 
    },
    '& .MuiTab-root': {
      color: '#B0B0B0', 
    },
    '& .Mui-selected': {
      color: '#6A9C89', 
      fontWeight: 'bold', 
    },
  }}
  onChange={(event, newValue) => setTabValue(newValue)}
>
  <Tab
    value="1"
    label={
      <Box display="flex" alignItems="center " sx={{color:'#6A9C89'}}>
        <ShoppingCartIcon sx={{ fontSize: '20px', mr: 1 }} /> Sales
      </Box>
    }
  />
  <Tab
    value="2"
    label={
      <Box display="flex" alignItems="center" sx={{color:'#6A9C89'}}>
        <InventoryIcon sx={{ fontSize: '20px', mr: 1 }} /> Purchase
      </Box>
    }
  />
</TabList>




          <TabPanel value="1">
            <TableContainer component={Paper}>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
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
                      <TableCell>{currencySymbol} {item?.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value="2">
            <TableContainer component={Paper}>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
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
                      <TableCell>{currencySymbol} {item?.totalPrice}</TableCell>
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
