import React from 'react';
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
import { useState } from 'react';
import { Remove, Add, Delete } from '@mui/icons-material';
import AddModifiers from './AddModifiers';
import AddEdit from './AddEdit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { shadows } from '@mui/system';
import Swal from 'sweetalert2';

const Cart = ({ cartItems, setCartItems }) => {
  const [add, setAdd] = useState();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  };

  const RemoveItem = (id) => {
    const updateCart = cartItems.filter((item) => item.id != id);
    setCartItems(updateCart);
  };

  const deleteAll = () => {
    setCartItems([]);
  };

  return (
    <>
      <Paper sx={{ display: 'flex', flexDirection: 'column', height: '480px', borderRadius: '8px', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {cartItems?.length === 0 ? (
            <></>
          ) : (
            <>
              <Grid container spacing={2} direction="column">
                {cartItems.map((cartItem, index) => (
                  <Card key={index} sx={{ border: '1px solid', width: '100%', cursor: 'pointer', m: '3px', minHeight: '70px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CardMedia
                          component="img"
                          height="90px"
                          image={cartItem.image}
                          sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }}
                          onClick={() => handleItemClick(cartItem)}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ p: '3px', color: '#190e08', fontWeight: '300px', font: 'bold' }}>{cartItem.title}</Typography>
                        <Typography sx={{ p: '3px', color: '#190e08', fontWeight: '300px', font: 'bold' }}>{cartItem.price}</Typography>
                      </Grid>
                    </Grid>

                    <Grid container direction="row">
                      <AddModifiers open={open} handleClose={handleClose} />
                      <AddEdit open={open} handleClose={handleClose} />

                      <Grid item sm={3} xs={12}>
                        <IconButton onClick={() => handleIncrementQuantity(cartItem?.id)} size="small">
                          <Add fontSize="small" />
                        </IconButton>
                        
                        {cartItem?.quantity}

                        <IconButton onClick={() => handleDecrementQuantity(cartItem?.id)} size="small">
                          <Remove fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <Button onClick={handleOpen}>Modifiers</Button>
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <Button onClick={handleOpen}>Edit/Note</Button>
                      </Grid>
                      <Grid item sm={3} xs={12}>
                      <Button
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
        RemoveItem(cartItem.id); 
        Swal.fire('Removed!', 'The item has been removed.', 'success');
      }
    });
  }}
>
  Remove
</Button>;

                        <Grid />
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Grid>
            </>
          )}
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #ccc',
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9'
          }}
        >
          <Typography variant="h6" color="secondary">
            Total: Rs.{totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" color="secondary" onClick={deleteAll}>
            Clear Cart
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Cart;
