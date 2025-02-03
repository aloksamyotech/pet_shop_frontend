import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider ,Grid,Box} from '@mui/material';
import { Girl } from '@mui/icons-material';


const ViewPurchase = ({ open, handleClose, purchase }) => {
  if (!purchase) return null; 
return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle variant='h4'>View Category Details</DialogTitle>
      <Divider></Divider>
    
      <DialogContent>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={4}>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box  className="Box">
       <Typography variant="h6" >Discount: {purchase.discount}</Typography>
        <Typography variant="h6" >PaymentStatus: {purchase.paymentStatus}</Typography>
        <Typography variant="h6" >Quantity: {purchase.quantity}</Typography>
        <Typography variant="h6" >TotalPrice: {purchase.totalPrice}</Typography>
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

export default ViewPurchase;
