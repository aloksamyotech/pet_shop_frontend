import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  Divider,
  Card,
  CardMedia,
  Breadcrumbs,
  Stack
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Remove, Add, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { urls } from 'views/Api/constant.js';
import { postApi, getApi } from 'views/Api/comman.js';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';

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
      console.error('Error fetching products:', error);
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
              confirmButtonText: 'Okay'
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
      const response = await postApi(urls.order.create, orderData);
      const Data = response.data.data;
      setCartItems([]);
      navigate('/dashboard/ProductType', { state: { Data } });
      toast.success('Order successfully!');
    } catch (error) {
      console.error('Error creating invoice:', error);
      Swal.fire('Error', 'There was an issue creating the invoice.', 'error');
    }
  };

  const Home = () => {
    navigate('/dashboard/default');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>

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
                
              }}
            >
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                  <HomeIcon />
                </IconButton>
                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />

                <Typography
                  onClick={() => navigate(-1)}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '15px',
                    mx: 1,
                    '&:hover': { color: '#2067db' }
                  }}
                >
                  POS
                </Typography>

                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
                <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>
                 Checkout Page
                </Typography>
              </Stack>
            </Box>
          </Stack>
     

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper} sx={{ mb: 3  , mt:'-20px'}}>
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

                    <TableCell align="center">
                      <Typography variant="body1" color="#39b2e9" sx={{ fontWeight: 'bold' }}>
                        Rs.{item.price}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <IconButton
                          onClick={() => handleQuantityChange(item._id, -1)}
                          size="small"
                          sx={{
                            backgroundColor: '#f1ecea',
                            color: '#75716f',
                            '&:hover': { backgroundColor: '#e0dcd9' },
                            borderRadius: '50%',
                            width: 25,
                            height: 25
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          onClick={() => handleQuantityChange(item._id, 1)}
                          size="small"
                          sx={{
                            backgroundColor: '#2067db',
                            color: 'white',
                            '&:hover': { backgroundColor: '#174ea6' },
                            borderRadius: '50%',
                            width: 25,
                            height: 25
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="body1" color="#39b2e9" sx={{ fontWeight: 'bold' }}>
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>

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
          <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 , mt:'-20px'}}>
            <Typography variant="h5">Order Summary</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h">
              Total Items:
              <Typography component="span" variant="body1" color="#39b2e9" sx={{ fontWeight: 'bold', ml: 1 }}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </Typography>
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Price:
              <Typography component="span" variant="body1" color="#39b2e9" sx={{ fontWeight: 'bold', ml: 1 }}>
                Rs.{totalPrice.toFixed(2)}
              </Typography>
            </Typography>

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
