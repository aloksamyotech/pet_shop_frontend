import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ViewProduct = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
     
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Product Details</Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />

     
      <DialogContent>
        <Paper sx={{ borderRadius: 2, p: 2 }}>
          <Grid container spacing={3} alignItems="center">
            
          
            <Grid item xs={12} sm={4}>
              <Box
                component="img"
                src={product?.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                alt={product?.productName || 'Product'}
                sx={{
                  width: '100%',
                  maxWidth: '150px', 
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid #ddd',
                }}
              />
            </Grid>

          
            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: { xs: 'center', sm: 'flex-start' }, 
                  gap: 1,
                  textAlign: { xs: 'center', sm: 'left' }, 
                }}
              >
                <Typography variant="body1">
                  <strong>Name:</strong> {product?.productName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Category:</strong> {product?.category?.[0].name || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {product?.quantity || '0'}
                </Typography>
                <Typography variant="body1">
                  <strong>Discount:</strong> {product?.discount || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> {product?.price ? `$${product.price}` : 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
