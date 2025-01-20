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

const Checkout = () => {
const location =useLocation()
 const [cartItems, setCartItems] = useState(location.state?.cartItems || []);

  const navigate = useNavigate();
const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const deleteAll = () => {
    setCartItems([]);
   };


  const handleDecrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };


  const handleIncrementQuantity = (_id) => {
    setCartItems((prevCart) =>
       prevCart.map((cartItem) =>
        
        cartItem._id === _id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const removeItem = (_id) => {
  
    const updatedCart = cartItems.filter((item) =>   item._id !== _id);
    setCartItems(updatedCart);  
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  return (
    <Container maxWidth="xl">
      <Box> 

      <Stack spacing={2} direction="row" sx={{ height: '10vh', width: '100%', mb: '15px', backgroundColor: 'white' }}>
        <Box sx={{ backgroundColor: 'white', height: '50px', width: '100%', display: 'flex', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px', marginTop: '-4px' }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '20px' }}>
            <HomeIcon sx={{ color: '#2067db', mr: '-4px' }} fontSize="large" onClick={handleClick} />
            <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black', ml: '-3px', fontSize: '15px' }}>Card</Typography>
          </Breadcrumbs>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={4} >
          <Box sx={{ width: '100%', height: '70vh', backgroundColor: '#fff', flex: 1, overflowY: 'auto',}}>
          <Grid container spacing={2}>
                {cartItems.map((cartItem) => (
                  <Grid item xs={12} key={cartItem._id}>
                    <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', transition: 'box-shadow 1s, transform 1s', border: '1px solid black', cursor: 'pointer', '&:hover': { transform: 'scale(1.03)', boxShadow: (theme) => theme.shadows[3] }, p: 1 }}>
                      <CardMedia component="img" image={cartItem.image} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', mr: 2 }} />
                      <Box sx={{ flex: 1 }}>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>{cartItem.productName}</Typography>
                        <Typography variant="body2" color="text.secondary">{cartItem.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => handleIncrementQuantity(cartItem._id)} size="small"><AddIcon fontSize="small" /></IconButton>
                        {cartItem.quantity}
                        <IconButton onClick={() => handleDecrementQuantity(cartItem._id)} size="small"><RemoveIcon fontSize="small" /></IconButton>
                      </Box>
                      <Button 
                      
                      color='error'
                      onClick={() => {
     Swal.fire({
       title: 'Are you sure?',
       text: 'Do you want to remove this item?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, remove it!',
       cancelButtonText: 'Cancel',
     }).then((result) => {
       if (result.isConfirmed) {
        removeItem(cartItem._id); 
         Swal.fire('Removed!', 'The item has been removed.', 'success');
       }
     });
   }}
>Remove</Button>
                    </Card>
                   
                  </Grid>
                ))}
              </Grid>


          </Box>


        </Grid>
        <Grid item xs={8}>
            <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 3 , width:'100%'}}>
              <Typography variant="h6" sx={{ mb: 2 }}>Price Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Price: ₹{totalPrice.toFixed(2)}</Typography>
                <Typography variant="body1">Discount: 0%</Typography>
                <Typography variant="body1">Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="h6">Total Payable: ₹{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{display:'flex', gap:'10px'}}>
              <Button  sx={{backgroundColor:'#0d8929' , color:"#fff" , '&:hover': {
            backgroundColor:'#0d8929' , color:"#fff" 
              
            },}} >
             Create Invoice
           </Button>
         <Button  sx={{backgroundColor:'#7011bc' , color:"#fff" , '&:hover': {
            backgroundColor:'#7011bc' , color:"#fff" 
              
            }, }} onClick={deleteAll}>
             Clear Cart
           </Button>
           </Box>
            </Box>
          </Grid>
      </Grid>





      </Box>
    </Container>





  );
};

export default Checkout;
