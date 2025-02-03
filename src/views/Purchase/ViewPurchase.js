import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';

const ViewPurchase = ({ open, handleClose, purchase }) => {
  if (!purchase) return null; 

  console.log("data----------",purchase)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
    
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Purchase Details
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
          
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body1">
                  <strong>Product Name:</strong> {purchase?.productName?.[0]?.productName|| 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Company Name:</strong> {purchase?.CompanyName?.[0]?.companyName|| 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {purchase?.quantity || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Status:</strong> {purchase?.paymentStatus || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Discount:</strong> {purchase?.discount || 'N/A'}
                </Typography>
               <Typography variant="body1">
                  <strong>Total Price:</strong> {purchase?.totalPrice || 'N/A'}
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

export default ViewPurchase;
