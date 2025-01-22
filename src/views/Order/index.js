import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Container,
  Breadcrumbs,
  Typography,
  Paper,
  Avatar,
  ListItemAvatar,
  IconButton,
  Button,
  Box,
  CardActions,
  CardMedia,
  Card,
  Grid,
  Divider
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2';
import { urls } from 'views/Api/constant.js';
import { postApi } from 'views/Api/comman.js';
import PolicyManagement from 'views/ProductType';

const Checkout = () => {
  const [order, setOrder] = useState([]);

  

  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);


 
  const selectedCustomer = location.state?.selectedCustomer || null;

  const navigate = useNavigate();

  const deleteAll = () => {
    setCartItems([]);
  };

  const handleDecrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    );
  };

  const handleIncrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) => (cartItem._id === _id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    );
  };

  const removeItem = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleInvoice = () => {
  
    navigate('/dashboard/productType', { state: { cartItems, selectedCustomer } });
  };

  const handleCreateInvoice = async () => {
   
    const values = await cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      productPrice: item.price,
      quantity: item.quantity
    }));
    setCartItems(values);
    await postApi(urls.order.create, values);
    deleteAll();
    handleInvoice();
  };

 


  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Stack spacing={2} direction="row" sx={{ height: '10vh', width: '100%', mb: '15px', backgroundColor: 'white' }}>
            <Box className="boxStyle">
              <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '20px' }}>
                <HomeIcon sx={{ color: '#2067db', mr: '-4px' }} fontSize="large" onClick={handleClick} />
                <Typography variant="h5" className='font'>
                  Card
                </Typography>
              </Breadcrumbs>
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ width: '100%', height: '70vh', backgroundColor: '#fff', flex: 1, overflowY: 'auto' }}>
                <Grid container spacing={2}>
                  {cartItems.map((cartItem) => (
                    <Grid item xs={12} key={cartItem._id}>
                      <Card classname="boxStyle1">
                        <CardMedia
                          component="img"
                          image={cartItem.image}
                          sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', mr: 2 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {cartItem.productName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {cartItem.price}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={() => handleIncrementQuantity(cartItem._id)} size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                          {cartItem.quantity}
                          <IconButton onClick={() => handleDecrementQuantity(cartItem._id)} size="small">
                            <RemoveIcon fontSize="small" />
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
                          Remove
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Price Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">Price: ₹{totalPrice.toFixed(2)}</Typography>
                  <Typography variant="body1">Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box>
                  <Typography variant="h6">Total Payable: ₹{totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    sx={{
                      backgroundColor: '#0d8929',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#0d8929',
                        color: '#fff'
                      }
                    }}
                    onClick={handleCreateInvoice}
                  >
                    Create Invoice
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: '#7011bc',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#7011bc',
                        color: '#fff'
                      }
                    }}
                    onClick={deleteAll}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Price Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">Price: ₹{totalPrice.toFixed(2)}</Typography>
                  <Typography variant="body1">Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box>
                  <Typography variant="h6">Total Payable: ₹{totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    classname="buttonStyle"
                    onClick={handleCreateInvoice}
                  >
                    Create Invoice
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: '#7011bc',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#7011bc',
                        color: '#fff'
                      }
                    }}
                    onClick={deleteAll}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
  }
}

export default Checkout;
