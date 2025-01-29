import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions, Divider ,Grid,Box} from '@mui/material';
import '../Category/category.css'


const ViewCompany = ({ open, handleClose, supplier }) => {
 console.log("supplier date ",supplier)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle variant='h5'>View Supplier Details</DialogTitle>
      <Divider></Divider>
    
      <DialogContent>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={4}>
           <Box  className="Margin">
          <Typography className="Margin"><strong>Name:</strong>{supplier?.companyName}</Typography>
          <Typography className="Margin"><strong>Email:</strong>{supplier?.email}</Typography>
          <Typography className="Margin"><strong>Address:</strong>{supplier?.address}</Typography>
          <Typography className="Margin"><strong>Phone:</strong>{supplier?.phoneNumber}</Typography> <Typography className="Margin"><strong>Status:</strong>{supplier?.status}</Typography>
          <Typography className="Margin"><strong>Description:</strong>{supplier?.description}</Typography>

          </Box>



        </Grid>
        <Grid item xs={12} sm={8}>
          <Box  className="Box">
       
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

export default ViewCompany;
