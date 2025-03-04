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
  Tab,
  Rating
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
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

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



  console.log("data",categoryData)
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

  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
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
    const isAvailable = product.quantity > 0;
    return matchCategory && matchSearch && isAvailable;
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
             mb:'40px'
            }}
          >
              {/* <TabList onChange={handleChange}>
                <Tab label="POS" value="1" />
                <Tab label="History" value="2" />
              </TabList> */}
 <Stack direction="row" alignItems="center" >
 <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
 <HomeIcon />
 </IconButton>
                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' , mr:1 }} />
                <Typography variant='h5'>POS</Typography> </Stack></Box>
           

            
              <Box sx={{ backgroundColor: '#fff', p: '5px', width: '100%' , marginTop: '-20px'
              }}>
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

                <Grid container spacing={2} >
                  <Grid item xs={12} md={2}>
                    <Box
                      sx={{
                        flex: 1,
                        overflowY: 'auto',
                        height: '70vh',
                        width: '100%',
                        backgroundColor: '#fff',
                        border: '1px solid #d3d3d3',
                        padding: '5px',
                       
                      }}
                    >
                      {categoryData.map((category) => (
                        <Card
                        key={category._id}
                        onClick={() => setSelectedCategory(category._id)}
                        sx={{
                          transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                          border: "1px solid #d3d3d3",
                          cursor: "pointer",
                          mt: "5px",
                          "&:hover": {
                            transform: "translateY(-5px) scale(1.08)", 
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
                          },
                        }}
                      >
                      
                          <CardMedia
                            component="img"
                            height="50vh"
                            image={category.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
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
      height: "70vh",
      flex: 1,
      overflowY: "auto",
      backgroundColor: "white",
      border: "1px solid #d3d3d3",
      padding: "5px",
    }}
  >
    <Grid container spacing={2}>
      {filterProduct.map((product) => (
        <Grid item xs={12} sm={4} md={4} key={product.id}>
          <Card
            onClick={() => handleAddToCart(product)}
            sx={{
              backgroundColor: "white",
              transition: "box-shadow 1s, transform 1s",
              cursor: "pointer",
              width: "100%",
              height: "25vh",
              border: "1px solid #d3d3d3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              height="70vh"
              image={product.imageUrl || "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"}
              sx={{ objectFit: "cover", width: "100%", p: "4px", borderRadius: "8px" }}
            />

            <Box sx={{ p: "4px" }}>
              <Typography sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}>
                {product.productName}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating value={product.rating || 4} precision={0.5} readOnly size="small" />
                {/* <Typography sx={{ ml: 1, fontSize: "12px", color: "#757575" }}>
                  ({product.reviews || Math.floor(Math.random() * 500) + 1})
                </Typography> */}
              </Box>

              {/* <Typography sx={{ fontSize: "12px", color: "black" }}>
                {product?.category?.[0]?.name || "No Category"}
              </Typography> */}

              <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#39b2e9" }}>
                Rs.{product.price}
              </Typography>
            </Box>
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
                                p: '8px'
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={cartItem.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                                sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '8px', mr: 2 }}
                              />

                              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>
                                    {cartItem.productName}
                                  </Typography>

                                  <IconButton
                                    color="error"
                                    size="small"
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
                                  </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <IconButton
                                    onClick={() => handleDecrementQuantity(cartItem._id)}
                                    size="small"
                                    sx={{
                                      backgroundColor: '#f1ecea',
                                      color: '#75716f',
                                      '&:hover': { backgroundColor: '#f1ecea' },
                                      borderRadius: '50%',
                                      width: 20,
                                      height: 20,
                                      ml: 1
                                    }}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>

                                  <Typography variant="body1" sx={{ mx: 1 }}>
                                    {cartItem.quantity}
                                  </Typography>

                                  <IconButton
                                    onClick={() => handleIncrementQuantity(cartItem._id)}
                                    size="small"
                                    sx={{
                                      backgroundColor: '#2067db',
                                      color: 'white',
                                      '&:hover': { backgroundColor: '#174ea6' },
                                      borderRadius: '50%',
                                      width: 20,
                                      height: 20,
                                      ml: 1
                                    }}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>

                                  <Typography variant="body1" color="#39b2e9" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                                    Rs.{cartItem.price}
                                  </Typography>
                                </Box>
                              </Box>
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
                        backgroundColor: '#f9f9f9',
                        p: 2
                      }}
                    >
                      <Typography variant="h6" color="secondary">
                        Total: Rs.{totalPrice.toFixed(2)}
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: '#2067db',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#174ea6'
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
                            backgroundColor: '#5a0e98'
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
            

            {/* <TabPanel value="2">
              <History />
            </TabPanel> */}
         
    
     
     
    </>
  );
};

export default AddFood;
