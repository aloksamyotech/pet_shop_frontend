import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper, Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ViewEmployee = ({ open, handleClose, customer }) => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    const currencySymbol = userObj.currencySymbol;

  

   
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">


<DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
     <Typography variant="h5"> Employee Details</Typography> 
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />

  <DialogContent sx={{ p: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            
          
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgColor: 'primary.main', fontSize: 32 }}>
                {customer?.name.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>

           
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{customer?.name || 'N/A'}</Typography>
              <Typography variant="body1" color="textSecondary">{customer?.email || 'N/A'}</Typography>
              <Typography variant="body1" color="textSecondary">{customer?.phoneNumber || 'N/A'}</Typography>
              <Typography variant="body1" color="textSecondary">{customer?.address || 'N/A'}</Typography>
            
            </Grid>

          
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h5'>salary</Typography>
              <Typography variant="body1" sx={{color:"#39b2e9"}}>{currencySymbol} {customer?.salary || 'No description available'}
              
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

     
    </Dialog>
  );
};

export default ViewEmployee;
