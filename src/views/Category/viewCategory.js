import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider, Grid, Box } from '@mui/material';


const ViewCategory = ({ open, handleClose, category }) => {
  if (!category) return null; 

  console.log("category", category)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" >
     
      <DialogTitle variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Category Details
      </DialogTitle>
      <Divider />

     
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
       
          <Grid item xs={12} sm={5} display="flex" justifyContent="center">
            <Box
              component="img"
              src={category.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
              alt={category.name || 'Category Image'}
              sx={{
                width: '100%',
                maxWidth: 100,
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

        
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">
              <strong>Name:</strong>  {category.name || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {category.description || 'No description available.'}
              </Typography>
            </Box>
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

export default ViewCategory;
