import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApi, getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CustomerForm = ({ open, handleClose,fetchCustomer}) => {

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First Name is required')
      .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters')
      .max(50, 'First Name cannot be more than 50 characters'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    
  });

  
  const initialValues = {
    firstName: '',
    email: '',
   
  };

  
 
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
       await postApi(urls.customer.create, values);
        await  fetchCustomer()
        formik.resetForm();
     handleClose();
        toast.success('Customer added successfully!');
      
    },
  });



  return (
    <Dialog open={open} fullWidth maxWidth="sm" aria-labelledby="customer-dialog-title">
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Create Customer</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} >
            {['firstName', 'email'].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <FormControl fullWidth>
                  <FormLabel>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</FormLabel>
                  <TextField
                    id={field}
                    name={field}
                    size="small"
                    fullWidth
                    value={formik.values[field]}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (field === 'firstName') value = value.replace(/[^A-Za-z\s]/g, '');
                      formik.setFieldValue(field, value);
                    }}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field]}
                  />
                </FormControl>
              </Grid>
            ))}
           
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" onClick={formik.handleSubmit} sx={{ backgroundColor: '#6A9C89', color: '#fff', '&:hover': { backgroundColor: '#8DB3A8' } }}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleClose} color="error" sx={{ border: '1px solid #6A9C89', color: '#6A9C89', '&:hover': { border: '1px solid #6A9C89', color: '#6A9C89' } }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;
