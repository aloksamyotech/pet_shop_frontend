import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider ,Grid,Box} from '@mui/material';
import { Girl } from '@mui/icons-material';
import './category.css'

const ViewCategory = ({ open, handleClose, category }) => {
  if (!category) return null; 

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle variant='h5'>View Category Details</DialogTitle>
      <Divider></Divider>
    
      <DialogContent>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={4}>
          <img
          src={category.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
          alt={category.name}
        className="Box"
        />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box  className="Box">
       
        <Typography variant="h4" >{category.name}</Typography>
        <Typography variant="h6" >Description: {category.description}</Typography>
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

export default ViewCategory;
