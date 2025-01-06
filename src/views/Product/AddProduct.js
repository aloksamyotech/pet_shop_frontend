
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  FormLabel,
  Grid,
MenuItem,
Select,
  TextField
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import axios from 'axios';

import Palette from '../../ui-component/ThemePalette';

const AddLead = (props) => {
  const { open, handleClose } = props;


 

  // -----------  validationSchema
  const validationSchema = yup.object({
    productName: yup
        .string()
        .required('Product Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Product Name must only contain letters'),
    
    type: yup
        .string()
        .required('Product Type is required')
        .matches(/^[A-Za-z\s]+$/, 'Product Type must only contain letters'),
    
    price: yup
        .number()
        .required('Price is required')
        .typeError('Price must be a number') // Custom error for non-numeric input
        .positive('Price must be greater than zero'),
    
    discount: yup
        .number()
        .required('Discount is required')
        .typeError('Discount must be a number') // Custom error for non-numeric input
        .min(0, 'Discount cannot be negative') // Additional validation for discount
        .max(100, 'Discount cannot exceed 100%'), // Example constraint for max discount
});


  // -----------   initialValues
  const initialValues = {
  productName:'',
  type:'',
  price:'',
  discount:''
    
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post('http://localhost:7200/product/save',values);
      console.log('Product Value', response);
      handleClose();
      toast.success('Product Add successfully');
    
    }
  });
 

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
       
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
           
          }}
        >
          <Typography variant="h6">Add New Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography variant="h6" style={{ marginBottom: '65px' }}>
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} style={{ marginBottom: '15px' }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
               
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    id="productName"
                    name="productName"
                    type="text"
                    size="small"
                    fullWidth
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Type</FormLabel>
                  <Select id="type" name="type" size="small" fullWidth value={formik.values.type}    onChange={formik.handleChange}
                    >
                      <MenuItem value="20">20</MenuItem>
                      <MenuItem value="40">40</MenuItem>
                      <MenuItem value="60">60</MenuItem>
                      <MenuItem value="80">80</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Price</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    size="small"
                    fullWidth
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Discount(%)</FormLabel>
                    <Select id="discount" name="discount" size="small" fullWidth value={formik.values.discount}    onChange={formik.handleChange}
                    >
                      <MenuItem value="20">20</MenuItem>
                      <MenuItem value="40">40</MenuItem>
                      <MenuItem value="60">60</MenuItem>
                      <MenuItem value="80">80</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

             
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLead;
