import { useState, useEffect } from 'react';
import {
  Stack,
  Autocomplete,
  Button,
  InputBase,
  Grid,
  Card,
  Box,
  CardMedia,
  Typography,
  Container,
  Breadcrumbs,
  Select,
  CustomTabPanel,
  TextField,
  FormLabel,
  Tab
} from '@mui/material';


import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkout from 'views/Report/index';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import History from 'views/History';
import DeleteIcon from '@mui/icons-material/Delete';
import './cart.css';

const AddFood = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [value, setValue] = useState('1');
  const [purchaseProduct, setPurchaseProduct] = useState([]);

  const fetchPurchase = async () => {
    const response = await getApi(urls.purchase.get);
    setPurchaseProduct(response?.data?.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchCustomer = async () => {
    const response = await getApi(urls.customer.get);
    setCustomerData(response?.data?.data);
  };

  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    const customerDetails = customerData.find((customer) => customer._id === customerId);
    setSelectedCustomer(customerDetails);
  };

  const handleDecrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    );
  };

 
 const handleBuyNow = () => {
    if (!selectedCustomer) {
      Swal.fire({
        title: 'Please select a customer',
        text: 'You need to select a customer before proceeding to checkout.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }
    navigate('/dashboard/order', { state: { cartItems, selectedCustomer } });
  };

  const handleIncrementQuantity = (_id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) => {
        if (cartItem._id === _id) {
          const product = productData.find((p) => p._id === _id);
          const availableStock = product ? product.quantity : 0;

          if (cartItem.quantity < availableStock) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
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

  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const deleteAll = () => {
    setCartItems([]);
  };

  const removeItem = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
    setCategoryData(response.data?.data);
  };

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
    setProductData(response.data?.data);
  };

  const filterProduct = productData.filter((product) => {
    const matchCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    const matchSearch = product.productName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategory();
      await fetchProduct();
      await fetchCustomer();
      await fetchPurchase();
    };
    fetchData();
  }, []);
  

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  return (
    <>
      <Container>
        <Box>
          <TabContext value={value}>
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '0 25px',
                height: '50px',
                width: '100%',
                display: 'flex',
                borderRadius: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '-7px',
                border: '1px solid #d3d3d3'
              }}
            >
              <TabList onChange={handleChange}>
                <Tab label="POS" value="1" />
                <Tab label="History" value="2" />
              </TabList>

              <Breadcrumbs aria-label="breadcrumb">
                <HomeIcon sx={{ color: '#2067db' }} fontSize="medium" onClick={handleClick} />
                <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                  Card
                </Typography>
              </Breadcrumbs>
            </Box>

            <TabPanel value="1">
              <Box sx={{ backgroundColor: '#fff', p: '5px', width: '100%' }}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    height: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    border: '1px solid #d3d3d3',
                    mb: '10px',
                    borderRadius: '20px'
                  }}
                >
                  <SearchIcon />
                  <InputBase placeholder="Search Product..." onChange={handleSearch} value={search} />

                  <Autocomplete
                    options={customerData}
                    value={selectedCustomer}
                    onChange={(event, newValue) => setSelectedCustomer(newValue)}
                    getOptionLabel={(option) => `${option.firstName} (${option.email})`}
                    renderInput={(params) => <TextField {...params} label="Customer" size="small" />}
                    sx={{ width: '30%' }}
                  />

                  <TextField value={selectedCustomer ? selectedCustomer.email : ''} fullWidth readOnly size="small" sx={{ width: '30%' }} />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <Box
                      sx={{
                        flex: 1,
                        overflowY: 'auto',
                        height: '70vh',
                        width: '100%',
                        backgroundColor: '#fff',
                        border: '1px solid #d3d3d3',
                        padding: '5px'
                      }}
                    >
                      {categoryData.map((category) => (
                        <Card
                          key={category._id}
                          onClick={() => setSelectedCategory(category._id)}
                          sx={{
                            transition: 'box-shadow 1.3s, transform 1.3s',
                            border: '1px solid #d3d3d3',
                            cursor: 'pointer',
                            mt: '5px'
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="50vh"
                            image={categoryData.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                            sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }}
                          />
                          <Typography
                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '5px', color: 'black' }}
                          >
                            {category.name}
                          </Typography>
                        </Card>
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: '70vh',
                        flex: 1,
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        border: '1px solid #d3d3d3',
                        padding: '5px'
                      }}
                    >
                      <Grid container spacing={2}>
                        {filterProduct.map((product) => (
                          <Grid item xs={12} sm={4} md={4} key={product.id}>
                            <Card
                              onClick={() => handleAddToCart(product)}
                              sx={{
                                backgroundColor: 'white',
                                transition: 'box-shadow 1s, transform 1s',
                                cursor: 'pointer',
                                width: '100%',
                                height: '25vh',
                                border: '1px solid #d3d3d3'
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="70vh"
                                image={product.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                                sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }}
                              />
                              <Typography sx={{ display: 'block', p: '4px', color: 'black' }}>{product.productName}</Typography>
                              <Typography sx={{ display: 'block', p: '4px', color: '#39b2e9' }}>Rs.{product.price}</Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        height: '70vh',
                        flex: 0.5,
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        border: '1px solid #d3d3d3',
                        padding: '5px'
                      }}
                    >
                      <Grid container spacing={2}>
                        {cartItems.map((cartItem) => (
                          <Grid item xs={12} key={cartItem._id}>
                            <Card
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                transition: 'box-shadow 1s, transform 1s',
                                border: '1px solid #d3d3d3',
                                cursor: 'pointer',
                                width: 'auto',
                                height: '70px',
                                p: '2px'
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={cartItem.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                                sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '8px', mr: 2 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" sx={{ color: 'black', mb: 0.5, display: 'block' }}>
                                  {cartItem.productName}
                                </Typography>
                                <Typography variant="body2" color="#39b2e9">
                                  Rs.{cartItem.price}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => handleDecrementQuantity(cartItem._id)} size="small">
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                {cartItem.quantity}
                                <Box>
                                  <IconButton onClick={() => handleIncrementQuantity(cartItem._id)} size="small">
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Box>
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
                    <Box
                      sx={{
                        borderTop: '1px solid #ccc',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9'
                      }}
                    >
                      <Typography variant="h6" color="secondary">
                        Total: $.{totalPrice.toFixed(2)}
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: '#2067db',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#2067db',
                            color: '#fff'
                          }
                        }}
                        onClick={handleBuyNow}
                      >
                        BUY NOW
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
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <History />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default AddFood;
