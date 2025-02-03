import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';
import '../Category/category.css';

const ViewCompany = ({ open, handleClose, supplier }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
     
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Supplier Details
      </DialogTitle>
      <Divider />

     
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
        
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {supplier?.companyName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {supplier?.email || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {supplier?.address || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {supplier?.phoneNumber || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {supplier?.status || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Description:</strong> {supplier?.description || 'N/A'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCompany;
