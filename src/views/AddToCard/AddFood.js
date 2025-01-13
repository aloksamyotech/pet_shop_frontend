import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, CardMedia, CardActions, Breadcrumbs, Grid, getAccordionActionsUtilityClass } from '@mui/material';
import FoodCart from './Compontent/FoodCart';
import Cart from './Compontent/Cart';
import Food from './Compontent/Food';
import FoodGrid from './Compontent/FoodGrid';
import ItemGrid from './Compontent/ItemGrid';
import Dashboard from '../dashboard/Default/index';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

import Iconify from '../../ui-component/iconify';
import { useEffect } from 'react';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const AddFood = () => {
  const navigate = useNavigate();
  const [categoryData , setCategoryData] = useState([]);


const fetchCategory = async () => {
  const response = await getApi(urls.category.get);
  setCategoryData(response.data?.data);
}
  
useEffect(()=>{
  fetchCategory();
},[])



  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const [food, setFood] = useState([]);
  const [item, setItem] = useState([]);

  const categories = [
    {
      name: 'Food',
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4='
    },
    {
      name: 'Cat',
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0='
    },

    { name: 'Dog', image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg' },
    {
      name: 'Medicine',
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o='
    },
    {
      name: 'Food',
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4='
    },
    {
      name: 'Cat',
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0='
    },

    { name: 'Dog', image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg' },
    {
      name: 'Medicine',
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o='
    },
    {
      name: 'Cat',
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0='
    },

    { name: 'Dog', image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg' },
    {
      name: 'Medicine',
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o='
    },
    {
      name: 'Cat',
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0='
    },

    { name: 'Dog', image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg' },
    {
      name: 'Medicine',
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o='
    }
  ];

  const Food = [
    {
      id: 1,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',

      category: 'Food'
    },
    {
      id: 2,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 3,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 4,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 5,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 6,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 7,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 8,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 9,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 10,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 11,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 12,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.gettyimages.com/id/165907425/photo/dog-food.jpg?s=612x612&w=gi&k=20&c=w4NtYD_1ry0J8I87voqOqWoC8421qxE5hA5QkV8Hoe4=',
      category: 'Food'
    },
    {
      id: 13,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Food'
    },
    {
      id: 14,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Food'
    },
    {
      id: 15,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Food'
    },
    {
      id: 16,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Food'
    },
    {
      id: 17,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 18,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 19,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 20,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    }
  ];

  const Cat = [
    {
      id: 17,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 18,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 19,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 20,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 21,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 22,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 23,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 24,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    },
    {
      id: 25,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0=',
      category: 'Cat'
    }
  ];

  const Dog = [
    {
      id: 26,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 199,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 133,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 244,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 243,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 21,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 23,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 24,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    },
    {
      id: 25,
      title: 'Dog Food',
      price: 120.0,
      image: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
      category: 'Dog'
    }
  ];

  const Medicine = [
    {
      id: 170,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 183,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 192,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 201,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 212,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 222,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 231,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 241,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    },
    {
      id: 251,
      title: 'Dog Food',
      price: 120.0,
      image:
        'https://media.istockphoto.com/id/1347122902/photo/pet-dog-taking-cbd-hemp-oil-canine-licking-cannabis-dropper-for-anxiety-treatment.jpg?s=612x612&w=0&k=20&c=YW-wnE8ZN0Z9kbbycLTD9NBfjYFbeb9XRt-WAVL866o=',
      category: 'Medicine'
    }
  ];

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

  const [selectedCategory, setSelectedCategory] = useState('Food');

  const filteredItem =
    selectedCategory === 'Food' ? Food : selectedCategory === 'Cat' ? Cat : selectedCategory === 'Medicine' ? Medicine : Dog;

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
            <Box sx={{ flex: 1, overflowY: 'auto', height: '80vh', width: '100%', ml: '-5px' }}>
              {categories.map((category) => (
                <Card
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  variant={selectedCategory === category.name ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: 'white',
                    mt: '4px',
                    transition: 'box-shadow 1.3s, transform 1.3s',
                    border: '1px solid black',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.2)',
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
            <FoodGrid Food={filteredItem} onAddToCart={handleAddToCart} />
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
