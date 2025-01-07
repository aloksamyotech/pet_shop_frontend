/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

import Palette from '../../ui-component/ThemePalette';


const ProductAdd = (props) => {
  const { open, handleClose } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    companyName: yup
      .string()
      .required('Company Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Comapny Name must only contain letters'), 

    
    address: yup
            .string()
            .required('Address is required')
            .max(10, 'Address must be at least 10 characters long'), 
    
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number')
      .required('Phone Number is required'),
    
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    
    status: yup
      .string()
      .required('Status is required')
      .oneOf(["active", "inactive", "blocked"], 'Payment Status must be "active", "inactive", "blocked"'),
    

    
    companyType: yup
      .string()
      .required('Company Type is required')
      .oneOf(["regular", "premium", "business"], 'Payment Status must be "regular", "premium", "business"'),
    
    description: yup
      .string()
      .required('Description is required'),
  });
  


  

  // -----------   initialValues
  const initialValues = {
    companyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    status: '',
    companyType: '',
    description: ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post("http://localhost:7200/company/save", values)

      console.log('values======', response);
      toast.success('Product  Add successfully');
      handleClose();
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add Supplier</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Supplier Details
              </Typography>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Company Name</FormLabel>
                  <TextField
                    id="companyName"
                    name="companyName"
                    size="small"
                    fullWidth
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      id="email"
                      name="email"
                      size="small"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField
                    name="phoneNumber"
                    type="phoneNumber"
                    size="small"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    size="small"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    size="small"
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Company Type</FormLabel>
                 <Select
                                      id="companyType"
                                      name="companyType"
                                      size="small"
                                      fullWidth
                                      value={formik.values.companyType}
                                      onChange={formik.handleChange}
                                    >
                                      <MenuItem value="regular">regular</MenuItem>
                                      <MenuItem value="premium">premium</MenuItem>
                                      <MenuItem value="business">business</MenuItem>
                                      </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Status</FormLabel>
                <Select
                                      id="status"
                                      name="status"
                                      size="small"
                                      fullWidth
                                      value={formik.values.status}
                                      onChange={formik.handleChange}
                                    >
                                      <MenuItem value="active">active</MenuItem>
                                      <MenuItem value="inactive">inactive</MenuItem>
                                      </Select>
                                
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
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

export default ProductAdd;
