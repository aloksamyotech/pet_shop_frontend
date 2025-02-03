import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';

const ViewProduct = ({ open, handleClose, product }) => {
  if (!product) return null; 

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
     
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Product Details
      </DialogTitle>
      <Divider />

    
      <DialogContent sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
      
            <Grid item xs={12} sm={4}>
              <Box
                component="img"
                src={product?.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                alt={product?.productName || 'Product'}
                sx={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid #ddd',
                }}
              />
            </Grid>

           
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">
                  <strong>Name:</strong> {product?.productName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Category:</strong> {product?.category?.[0].name || 'N/A'}
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

      
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProduct;
