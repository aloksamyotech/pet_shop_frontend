import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box, Paper } from '@mui/material';

const ViewCompany = ({ open, handleClose, supplier }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Supplier Details
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>

            
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', p: 1, m: 1 }}>
                <Typography variant="h6"><strong>{supplier?.companyName || 'N/A'}</strong></Typography>
                <Typography variant="body1">{supplier?.email || 'N/A'}</Typography>
              </Box>
            </Grid>

           
            <Grid item xs={6}>
              <Box sx={{ p: 1, m: 1 }}>
                <Typography variant="body1"><strong>Address:</strong> {supplier?.address || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {supplier?.status || 'N/A'}</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ p: 1, m: 1 }}>
                <Typography variant="body1"><strong>Phone:</strong> {supplier?.phoneNumber || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Description:</strong> {supplier?.description || 'N/A'}</Typography>
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

export default ViewCompany;
