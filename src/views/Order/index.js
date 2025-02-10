import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Typography, Box, Divider, Card, CardMedia
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { urls } from 'views/Api/constant.js';
import { postApi } from 'views/Api/comman.js';

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (_id, change) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id
          ? { ...cartItem, quantity: Math.max(1, Math.min(cartItem.quantity + change, 20)) }
          : cartItem
      )
    );
  };

  const removeItem = (_id) => {
    setCartItems(cartItems.filter((item) => item._id !== _id));
  };

  const handleCreateInvoice = async () => {
    if (!selectedCustomer) {
      Swal.fire('Error', 'Please select a customer!', 'error');
      return;
    }

    const values = cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      productPrice: item.price,
      quantity: item.quantity
    }));

    const orderData = {
      products: values,
      customerId: selectedCustomer._id,
      customerName: selectedCustomer.firstName,
      customerPhone: selectedCustomer.phoneNumber,
      customerEmail: selectedCustomer.email
    };

    await postApi(urls.order.create, orderData);
    setCartItems([]);
    navigate('/dashboard/productType', { state: { cartItems, selectedCustomer } });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
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
                          image={item.imageUrl ||'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
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
                      <IconButton color="error" onClick={() => removeItem(item._id)}>
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
            <Button fullWidth variant="contained" color="primary" onClick={handleCreateInvoice}>
              Confirm Order
            </Button>
            <Button fullWidth variant="outlined" color="error" sx={{ mt: 2 }} onClick={() => setCartItems([])}>
              Cancel Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
