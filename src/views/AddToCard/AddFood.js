import { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  InputBase,
  Grid,
  Card,
  Box,
  CardMedia,
  Typography,
  Container,
  Breadcrumbs,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddFood = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [food, setFood] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleDecrementQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const handleIncrementQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleAddToCart = (product) => {
    setFood((prevFood) => [...prevFood, product]);
    const updatedCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCart);
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
    fetchCategory();
    fetchProduct();
  }, []);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={2} direction="row" sx={{ height: '10vh', width: '103%', mb: '15px', backgroundColor: 'white' }}>
          <Box sx={{ backgroundColor: 'white', height: '50px', width: '100%', display: 'flex', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px', marginTop: '-4px' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '20px' }}>
              <HomeIcon sx={{ color: '#2067db', mr: '-4px' }} fontSize="large" onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black', ml: '-3px', fontSize: '15px' }}>Card</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ height: '10vh', width: '100%', mb: '15px', backgroundColor: 'white', padding: '5px' }}>
          <Box sx={{ backgroundColor: 'white', height: '50px', width: '100%', display: 'flex', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <Box sx={{ width: '80%', height: '40px', border: '1px solid #ccc', borderRadius: '20px', display: 'flex', alignItems: 'center', mr: '10px', type: 'text' }}>
              <SearchIcon sx={{ ml: '8px' }} />
              <InputBase placeholder="Search Product........." sx={{ flex: 1, ml: 1 }} onChange={handleSearch} value={search} />
            </Box>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Box sx={{ flex: 1, overflowY: 'auto', height: '70vh', width: '100%', ml: '-5px', backgroundColor: '#fff' }}>
              <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, display: 'flex', justifyContent: 'center', fontSize: '20px', padding: '15px' }}>Category</Box>
              {categoryData.map((category) => (
                <Card key={category._id} onClick={() => setSelectedCategory(category._id)} sx={{ backgroundColor: 'white', mt: '4px', transition: 'box-shadow 1.3s, transform 1.3s', border: '1px solid black', cursor: 'pointer', '&:hover': { transform: 'scale(1.1)', boxShadow: (theme) => theme.shadows[8] }, width: '100%', height: '20vh' }}>
                  <CardMedia component="img" height="90vh" image={category.image} sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }} />
                  <Typography sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '5px' }}>{category.name}</Typography>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ height: '70vh', borderRadius: '8px', flex: 1, overflowY: 'auto', backgroundColor: 'white' }}>
              <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, display: 'flex', justifyContent: 'center', fontSize: '20px', padding: '15px' }}>Product</Box>
              <Grid container spacing={2}>
                {filterProduct.map((product) => (
                  <Grid item xs={12} sm={4} md={4} key={product.id}>
                    <Card onClick={() => handleAddToCart(product)} sx={{ backgroundColor: 'white', transition: 'box-shadow 1s, transform 1s', border: '1px solid black', cursor: 'pointer', '&:hover': { transform: 'scale(1.1)', boxShadow: (theme) => theme.shadows[2] }, width: '100%', height: '25vh' }}>
                      <CardMedia component="img" height="90vh" image={product.image} sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }} />
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '5px' }}>{product.productName}</Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center' }}>{product.price}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ height: '70vh', borderRadius: '8px', flex: 1, overflowY: 'auto', backgroundColor: 'white' }}>
              <Grid container spacing={2}>
                {cartItems.map((cartItem) => (
                  <Grid item xs={12} key={cartItem.id}>
                    <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', transition: 'box-shadow 1s, transform 1s', border: '1px solid black', cursor: 'pointer', '&:hover': { transform: 'scale(1.03)', boxShadow: (theme) => theme.shadows[3] }, p: 1 }}>
                      <CardMedia component="img" image={cartItem.image} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', mr: 2 }} />
                      <Box sx={{ flex: 1 }}>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>{cartItem.productName}</Typography>
                        <Typography variant="body2" color="text.secondary">₹ {cartItem.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => handleIncrementQuantity(cartItem.id)} size="small"><AddIcon fontSize="small" /></IconButton>
                        {cartItem.quantity}
                        <IconButton onClick={() => handleDecrementQuantity(cartItem.id)} size="small"><RemoveIcon fontSize="small" /></IconButton>
                      </Box>
                      <Button onClick={() => removeItem(cartItem.id)} variant="outlined" color="error">Remove</Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddFood;
