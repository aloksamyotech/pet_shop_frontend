import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';

const ViewPurchase = ({ open, handleClose, purchase }) => {
  if (!purchase) return null; 

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Purchase Details
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgColor: '#f9f9f9' }}>
          <Grid container spacing={2}>
            
            
            <Grid item xs={12} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {purchase?.productName?.[0]?.productName || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {purchase?.CompanyName?.[0]?.companyName || 'N/A'}
              </Typography>
            </Grid>

            
            <Grid item xs={6}>
             <Box sx={{ p: 1 }}>      
              <Typography variant="body2" ><strong>Quantity:</strong>{purchase?.quantity || 'N/A'}</Typography>
             <Typography variant="body2"><strong>Status:</strong>{purchase?.paymentStatus || 'N/A'} </Typography>
               </Box>
            </Grid>

           
            <Grid item xs={6}>
            <Box sx={{ p: 1 }}>
                <Typography variant="body2" ><strong>Total Price:</strong>  Rs. {purchase?.totalPrice || 'N/A'}</Typography>
                <Typography variant="body2" ><strong>Discount:</strong>{purchase?.discount || 'N/A'}</Typography>
              
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
