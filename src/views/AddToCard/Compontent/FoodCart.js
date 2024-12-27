import { CardContent, CardMedia, Typography, Card } from '@mui/material';
import react from 'react';

const FoodCart = ({ title, image, price, onAddToCart }) => {
  return (
    <>
      <Card onClick={onAddToCart} sx={{ margin: '1px',   border:'1px solid black',borderRadius:'8px',transition: 'box-shadow 1.3s, transform 1.3s', 
      cursor: 'pointer',
      '&:hover': {
        transform:'scale(1.1)',
        boxShadow: (theme) => theme.shadows[8],
      },}}>
        <CardMedia component="img" height="100px" image={image} sx={{ padding: '4px', borderRadius: '8px' }}></CardMedia>
        <CardContent sx={{ height: '0', padding: '10px', textAlign: 'center', border: '1px' }}>
          <Typography>{title}</Typography>
          <Typography>{price}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FoodCart;
