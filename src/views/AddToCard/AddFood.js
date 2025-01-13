import { useState } from 'react';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Box,
  CardMedia,
  CardContent,
  Breadcrumbs,
  Grid,
  getAccordionActionsUtilityClass
} from '@mui/material';
import Dashboard from '../dashboard/Default/index';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../ui-component/iconify';
import { useEffect } from 'react';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import Cart from './Compontent/Cart';

const AddFood = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  console.log(selectedCategory);
  console.log(productData);

  const [food, setFood] = useState([]);
  const [item, setItem] = useState([]);

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
    setCategoryData(response.data?.data);
  };

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
    setProductData(response.data?.data);
  };

  const filterProduct = selectedCategory ? productData.filter((product) => product.categoryId == selectedCategory) : productData;

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleAddToCart = (item) => {
    setFood((prevFood) => {
      const exitFood = prevFood.findIndex((foodItem) => foodItem.id === item.id);

      if (exitFood >= 0) {
        const updateFood = [...prevFood];
        updateFood[exitFood].quantity += 1;
        return updateFood;
      } else {
        return [...prevFood, { ...item, quantity: 1 }];
      }
    });
  };

  const handleAddToItem = (item) => {
    setItem(item);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={2} direction="row" sx={{ height: '10vh', width: '103%', mb: '15px', backgroundColor: 'white' }}>
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
              marginTop: '-4px'
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '20px' }}>
              <HomeIcon sx={{ color: '#2067db', mr: '-4px' }} fontSize="large" onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black', ml: '-3px', fontSize: '15px' }}>
                Card
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Box sx={{ flex: 1, overflowY: 'auto', height: '70vh', width: '100%', ml: '-5px' }}>
              {categoryData.map((category) => (
                <Card
                  key={category.name}
                  onClick={() => setSelectedCategory(category._id)}
                  sx={{
                    backgroundColor: 'white',
                    mt: '4px',
                    transition: 'box-shadow 1.3s, transform 1.3s',
                    border: '1px solid black',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: (theme) => theme.shadows[8]
                    },
                    width: '100%',
                    height: '20vh'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="90vh"
                    image={category.image}
                    sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }}
                  />

                  <Typography sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>{category.name}</Typography>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ height: '70vh', borderRadius: '8px', flex: 1, overflowY: 'auto', backgroundColor: 'white' }}>
              <Grid container spacing={2}>
                {filterProduct.map((product) => (
                  <Grid item xs={12} sm={4} md={4} key={product.id}>
                    <Card
                      key={product.id}
                      sx={{
                        backgroundColor: 'white',
                        transition: 'box-shadow 1s, transform 1s',
                        border: '1px solid black',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: (theme) => theme.shadows[2]
                        },
                        width: '100%',
                        height: '25vh'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="90vh"
                        image={product.image}
                        sx={{ objectFit: 'cover', width: '100%', p: '4px', borderRadius: '8px' }}
                      />

                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        {product.productName}
                      </Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {product.price}  <Button sx={{backgroundColor:'#420a78', border:'20px', color:'#ffff',borderRadius:'20px' , minWidth:'auto',  padding: '4px 8px','&:hover': {
              backgroundColor: '#420a78'
            }}}>{product.discount}</Button>
                      </Typography>
                      
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ width: '110%', p: 0 }}>
              <Cart cartItems={food} setCartItems={setFood} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddFood;
