import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
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
    Modal
  } from '@mui/material';
  import { Remove, Add, Delete } from '@mui/icons-material';
  import { useState } from 'react';

const Checkout = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] }; 
  
  const [cart, setCartItems] = useState(cartItems);
  

  
 const [add, setAdd] = useState();
  
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
  
    const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

    const handleDecrementQuantity = (id) => {
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem?.id === id && cartItem?.quantity > 1 ? { ...cartItem, quantity: cartItem?.quantity - 1 } : cartItem
        )
      );
    };
  
    const handleIncrementQuantity = (id) => {
      setCartItems((prevCart) => prevCart.map((cartItem) => (cartItem?.id === id ? { ...cartItem, quantity: cartItem?.quantity + 1 } : cartItem)));
      console.log("hc")
    };
    return (
        <Grid container spacing={2} direction="row"> 
        <Grid item xs={6}>
    
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
    {cartItems?.length === 0 ? (
      <>Cart is Em</>
    ) : (
      <>
        <Grid container spacing={2} direction="column">
          {cartItems.map((cartItem, index) => (
            <Card key={index} sx={{ border: '1px solid', width: '100%', cursor: 'pointer', m: '3px', minHeight: '70px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    height="70px"
                    image={cartItem.image}
                    sx={{ objectFit: 'cover', width: '50%', p: '4px', borderRadius: '8px' }}
                    onClick={() => handleItemClick(cartItem)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ p: '3px', color: '#190e08', fontWeight: '300px', font: 'bold' }}>{cartItem.title}</Typography>
                  <Typography sx={{ p: '3px', color: '#190e08', fontWeight: '300px', font: 'bold' }}>{cartItem.price}</Typography>
                </Grid>
              </Grid>

              <Grid container direction="row">
                <Grid item sm={3} xs={12}>
             <IconButton onClick={() => handleIncrementQuantity(cartItem?.id)} size="small">
                                      <Add fontSize="small" />
                                    </IconButton>
                                    
                                    {cartItem?.quantity}
            
                                    <IconButton onClick={() => handleDecrementQuantity(cartItem?.id)} size="small">
                                      <Remove fontSize="small" />
                                    </IconButton>
              

                  <Grid />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>
      </>
    )}
  </Box>
  </Grid>


  <Grid item xs={6}>
    <Box sx={{height:'50vh' , width:'100%', backgroundColor:'white'}}>

  </Box>
  </Grid>

  </Grid>
 

  );
};

export default Checkout;
