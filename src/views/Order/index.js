import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Typography, Box, Divider, Card, CardMedia, Breadcrumbs, Stack
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { urls } from 'views/Api/constant.js';
import { postApi, getApi } from 'views/Api/comman.js';
import HomeIcon from '@mui/icons-material/Home';

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const fetchProduct = async () => {
    try {
      const response = await getApi(urls.product.get);
      setProductData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);  

  const handleQuantityChange = (_id, change) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) => {
        if (cartItem._id === _id) {
          const product = productData.find((p) => p._id === _id);
          const availableStock = product ? product.quantity : 0;

         
          if (change > 0 && cartItem.quantity < availableStock) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else if (change < 0 && cartItem.quantity > 1) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else if (change > 0 && cartItem.quantity >= availableStock) {
            Swal.fire({
              title: 'Stock Limit Reached',
              text: `Only ${availableStock} items available in stock.`,
              icon: 'warning',
              confirmButtonText: 'Okay',
            });
          }
        }
        return cartItem;
      })
    );
  };

  const removeItem = (_id) => {
    setCartItems(cartItems.filter((item) => item._id !== _id));
  };

  const removeItemWithConfirmation = (cartItem) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(cartItem._id);
        Swal.fire('Removed!', 'The item has been removed.', 'success');
      }
    });
  };

  const handleCreateInvoice = async () => {
    if (!selectedCustomer) {
      Swal.fire('Error', 'Please select a customer!', 'error');
      return;
    }

    const values = cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity
    }));

    const orderData = {
      products: values,
      customerId: selectedCustomer._id,
      customerName: selectedCustomer.firstName,
      customerPhone: selectedCustomer.phoneNumber,
      customerEmail: selectedCustomer.email
    };

    try {
      await postApi(urls.order.create, orderData);
      setCartItems([]);
      console.log("data------------order",cartItems)
      navigate('/dashboard/ProductType', { state: { cartItems, selectedCustomer } });

    } catch (error) {
      console.error("Error creating invoice:", error);
      Swal.fire('Error', 'There was an issue creating the invoice.', 'error');
    }
  };

  const Home = () => {
    navigate('/dashboard/default');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction="row" alignItems="center" mb={2}>
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
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton onClick={Home}>
              <HomeIcon sx={{ color: '#2067db' }} />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
              Checkout
            </Typography>
          </Breadcrumbs>
        </Box>
      </Stack>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Card sx={{ maxWidth: 75 }}>
                        <CardMedia
                          component="img"
                          height="75"
                          image={item.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                          alt={item.productName}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell align="center">Rs.{item.price}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleQuantityChange(item._id, -1)}>
                        <Remove />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleQuantityChange(item._id, 1)}>
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">Rs.{(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => removeItemWithConfirmation(item)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5">Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Total Price: Rs.{totalPrice.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              <Button fullWidth variant="contained" color="primary" onClick={handleCreateInvoice}>
                Confirm 
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ 
                  backgroundColor: '#FF4C4C', 
                  color: '#fff',
                  borderColor: '#FF4C4C', 
                  '&:hover': {
                    backgroundColor: '#D43F3F', 
                    borderColor: '#D43F3F'
                  }
                }} 
                onClick={() => setCartItems([])}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
