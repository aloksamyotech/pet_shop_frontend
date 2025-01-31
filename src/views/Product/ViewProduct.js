import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider ,Grid,Box} from '@mui/material';
import { Girl } from '@mui/icons-material';


const ViewProduct = ({ open, handleClose, product }) => {
  if (!product) return null; 

  console.log("product",product)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle variant='h4'>View product Details</DialogTitle>
      <Divider></Divider>
    
      <DialogContent>
        <Grid container spacing={1} >
         
        <Grid item xs={12} sm={8}>
          <Box  className="Box">
         <Typography variant="h4" >{product.productName}</Typography>
        <Typography variant="h6" >Discount: {product.discount}</Typography>
        <Typography variant="h6" >Price: {product.price}</Typography>
        <Typography variant="h6" >Category: {product?.category?.name}</Typography>

        </Box>
        </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProduct;
