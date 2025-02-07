import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Tab,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  Paper
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Home as HomeIcon } from '@mui/icons-material';
import History from 'views/History';
import Purchase from 'views/Purchase';
import { useEffect } from 'react';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import TableStyle from '../../ui-component/TableStyle';

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("1");
  const [product,setProduct] = useState([]);
    const [orderDate, setOrderDate] = useState();
    const [purchaseDate , setPurchaseDate] = useState()
    const [purchase,setPurchase] = useState([])


    const fetchProduct = async () => {
      const response = await getApi(urls.order.get);
   setProduct(response?.data?.data);
   setOrderDate(response.data.data[0].createdAt);
       };


       const fetchPurchase = async () => {
        const response = await getApi(urls.purchase.get);
        setPurchase(response?.data?.data);
     setPurchaseDate(response.data.data[0].createdAt);
         };

       console.log("product",purchase)

       const dateOrder = new Date(orderDate);
       const formattedDateOrder = `${dateOrder.getMonth() + 1}/${dateOrder.getDate()}/${dateOrder.getFullYear()}`;


       const datePurchase = new Date(purchaseDate);
       const formattedDatePurchase = `${datePurchase.getMonth() + 1}/${datePurchase.getDate()}/${datePurchase.getFullYear()}`;

  const handleClick = () => {
    navigate('/dashboard/default');
  };


useEffect(() =>{
  fetchProduct()
  fetchPurchase()

},[])



  return (
    <Grid maxWidth="xl">
      <TabContext value={tabValue}> 
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '25px',
            height: '50px',
            width: '100%',
            display: 'flex',
            borderRadius: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '-7px',
            border: '1px solid #d3d3d3',
           
          }}
        >
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>Report</Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <HomeIcon sx={{ color: '#2067db', cursor: 'pointer' }} fontSize="medium" onClick={handleClick} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
              Card
            </Typography>
          </Breadcrumbs>
        </Box>


        <Grid spacing={2} container md={12} direction="column">
          <Box sx={{ width: 'auto', height: 'auto', p: '4px', backgroundColor: 'white', borderRadius: '10px' ,marginTop:'50px',ml:'30px'}}>
            <Box sx={{ borderBottom: 1, border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <TabList 
                indicatorColor="none" 
                onChange={(event, newValue) => setTabValue(newValue)}
              >
                
                <Tab 
    value="1" 
    sx={{ fontWeight: 'bold' }} 
    label={
      <Box display="flex" alignItems="center">
        <ShoppingCartIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
        Sales
      </Box>
    } 
  />
     <Tab 
    value="2" 
    label={
      <Box display="flex" alignItems="center">
        <InventoryIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
        Purchase
      </Box>
    } 
  /> 
              </TabList>
            </Box>

          
          
            <TabPanel value='1'>
            <Box
            sx={{
              overflowY: 'auto',
              maxHeight: '60vh',
              padding: 0,
              margin: 0
            }}
          >
           
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#9053bc' }}>
                    <TableRow sx={{ fontWeight: 'bold' }}>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Customer</TableCell>
                    <TableCell sx={{ color: 'white' }}>Phone</TableCell>

                      <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                      
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>totalAmount</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{formattedDateOrder}</TableCell>
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
          

           
          </Box>
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
           
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#9053bc' }}>
                    <TableRow sx={{ fontWeight: 'bold' }}>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Supplier</TableCell>
                    <TableCell sx={{ color: 'white' }}>Phone</TableCell>

                      <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                      
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>totalAmount</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchase.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{formattedDatePurchase}</TableCell>
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
          

           
          </Box>
            </TabPanel>  
          </Box>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default Checkout;
