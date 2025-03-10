import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper, Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const ViewPurchase = ({ open, handleClose, purchase }) => {
  if (!purchase) return null;
  const Values =purchase?.productName

 return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>

<DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
     <Typography variant="h5">Purchase Details</Typography> 
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />

     

      <DialogContent sx={{ p: 3 }}>
        <Paper  sx={{ p: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
          <Grid container spacing={2}>
          
            <Grid item xs={6} textAlign="center">
              <Avatar sx={{ bgColor: 'primary.main', color: 'white', width: 50, height: 50, mx: 'auto' }}>
              {/* {supplier?.companyName ? supplier.companyName.charAt(0).toUpperCase() : '?'} */}
              {/* {Values?.chatAt(0).toUpperCase()} */}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
              {purchase?.productName?.[0]?.productName || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{mt: 1 }}  color={purchase?.paymentStatus === 'Success' ? 'green' : 'red'}>
                <strong>Status:</strong> {purchase?.paymentStatus || 'N/A'}
              </Typography>
            </Grid>
            
          
            <Grid item xs={6}>
              <Typography variant="body1" sx={{}}>
                <strong>Company:</strong>  {purchase?.CompanyName?.[0]?.companyName || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Quantity:</strong>{purchase?.quantity || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Discount:</strong> {purchase?.discount || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                <strong>Total Price:</strong>  <Typography component="span" variant="body1" color="#39b2e9" sx={{ fontWeight: 'bold' }}> Rs. {purchase?.totalPrice || 'N/A'}</Typography> 
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      
    </Dialog>
  );
};

export default ViewPurchase;