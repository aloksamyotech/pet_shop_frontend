import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper, Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ViewCompany = ({ open, handleClose, supplier }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">


<DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
     <Typography variant="h5"> Supplier Details</Typography> 
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />

  <DialogContent sx={{ p: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            
          
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgColor: 'primary.main', fontSize: 32 }}>
                {supplier?.companyName ? supplier.companyName.charAt(0).toUpperCase() : '?'}
              </Avatar>
            </Grid>

           
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{supplier?.companyName || 'N/A'}</Typography>
              <Typography variant="body1" color="textSecondary">{supplier?.email || 'N/A'}</Typography>
              <Typography variant="body1" color="textSecondary">{supplier?.phoneNumber || 'N/A'}</Typography>
              <Typography variant="body1" color={supplier?.status === 'Active' ? 'green' : 'red'}>
                <strong>Status:</strong> {supplier?.status || 'N/A'}
              </Typography>
            </Grid>

          
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                {supplier?.description || 'No description available'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

     
    </Dialog>
  );
};

export default ViewCompany;
