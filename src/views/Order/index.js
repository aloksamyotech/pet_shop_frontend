import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Container,
  Breadcrumbs,
  Typography,
  Box,
  Card,
  CardMedia,
  Grid,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import { Remove, Add, Home as HomeIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { urls } from 'views/Api/constant.js';
import { postApi } from 'views/Api/comman.js';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const navigate = useNavigate();

  

  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const handleDecrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    );
  };

  const handleIncrementQuantity = (_id) => {
    setCartItems((prevCart) =>
   prevCart.map((cartItem) => 
    
    cartItem._id === _id ? { ...cartItem, quantity: cartItem.quantity < 20 ? cartItem.quantity +1 :cartItem.quantity } : cartItem)
    );
  };

  const removeItem = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
  };

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleInvoice = () => {
    navigate('/dashboard/productType', { state: { cartItems, selectedCustomer } });
  };

  const handleCreateInvoice = async () => {
    const values = cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      productPrice: item.price,
      quantity: item.quantity
    }));

     const orderData = {
      products: values,
      customerId: selectedCustomer._id,
      customerName : selectedCustomer.firstName,
      customerPhone : selectedCustomer.phoneNumber,
      customerEmail : selectedCustomer.email


    };
    await postApi(urls.order.create, orderData);
    setCartItems([]);
    handleInvoice();
  };

  return (
    <Grid maxWidth="xl">
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
            <Breadcrumbs
          aria-label="breadcrumb"
              sx={{ display: 'flex', alignItems: 'center' }}
            ><HomeIcon sx={{ color: '#2067db' }}  onClick={handleClick} />
               <Typography variant="h5">Order</Typography>
            </Breadcrumbs>

          </Box>
        </Stack>

      <Grid container spacing={2} sx={{mt:'-35px'}}>
      
        <Grid item xs={4}>
          <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#fff', overflowY: 'auto' }}>
         
          <Typography variant="h4" sx={{ mt: 2,padding:'5px'}}>
              ADD TO CART
            </Typography>
           
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {cartItems.map((cartItem) => (
                <Grid item xs={12} key={cartItem._id}>
                  <Card sx={{ display: 'flex', mb: 2, p: 2 }}>
                    <CardMedia
                      component="img"
                      image={cartItem.imageUrl}
                      sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {cartItem.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹ {cartItem.price} 
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleIncrementQuantity(cartItem._id)} size="small">
                        <Add fontSize="small" />
                      </IconButton>
                      {cartItem.quantity}
                      <IconButton onClick={() => handleDecrementQuantity(cartItem._id)} size="small">
                        <Remove fontSize="small" />
                      </IconButton>
                    </Box>
                    <Button
                      color="error"
                      onClick={() => {
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
                      }}
                    >
                     <DeleteIcon /> 
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Price: ₹{totalPrice.toFixed(2)} * {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
              <Typography variant="h6">Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h5">Total Payable: ₹{totalPrice.toFixed(2)}</Typography>

            <Box sx={{ display: 'flex', gap: '10px' ,mt:'10px'}}>
              <Button
               size="medium" 
                sx={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#4CAF50' }
                }}
                onClick={handleCreateInvoice}
              >
              Confirm
              </Button>
              <Button
               size="medium" 
                sx={{
                  backgroundColor: '#da2c11',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#da2c11' }
                }}
                onClick={() => setCartItems([])}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      
      </Grid>
    </Grid>
  );
};

export default Checkout;
