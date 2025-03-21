import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Typography, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi, updateApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';

const CustomerForm = ({ open, handleClose, customer, fetchCustomer }) => {
  const isEdit = Boolean(customer);

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First Name is required')
      .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters')
      .max(50, 'First Name cannot be more than 50 characters'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    phoneNumber: yup
      .string(),
    status: yup.string().required('Status is required'),
    address: yup
      .string()
      .max(100, 'Address cannot be more than 100 characters'),
  });

  const initialValues = {
    firstName: '',
    email: '',
    address: '',
    phoneNumber: '',
    status: 'Active',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        await updateApi(urls.customer.update.replace(":id", customer._id), values);
        toast.success("Customer updated successfully!");
      } else {
        await postApi(urls.customer.create, values);
        toast.success("Customer added successfully!");
      }
      await fetchCustomer();
      handleClose();
    },
  });

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        firstName: customer?.firstName || 'N/A',
        email: customer?.email || 'N/A',
        address: customer?.address || 'N/A',
        phoneNumber: customer?.phoneNumber || 'N/A',
        status: customer?.status || 'Active',
      });
    } else {
      formik.resetForm();
    }
  }, [customer, open]);

  return (
    <Dialog open={open} aria-labelledby="customer-dialog-title">
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{isEdit ? 'Update Customer' : 'Create Customer'}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onInput={(e) => {
                    const regex = /^[A-Za-z\s]*$/; 
                    if (!regex.test(e.target.value)) {
                      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                    }
                    formik.setFieldValue("firstName", e.target.value);
                  }}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Phone Number</FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                    if(sanitizedValue.length <= 10){
                    formik.setFieldValue("phoneNumber", sanitizedValue);
                    }
                  }}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select id="status" name="status" size="small" fullWidth value={formik.values.status} onChange={formik.handleChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Blocked">Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" onClick={formik.handleSubmit} 
            sx={{
              backgroundColor: '#6A9C89',
              color: '#ffff',
              '&:hover': {
                backgroundColor: '#8DB3A8'
              }
            }}>
          {isEdit ? 'Update' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={handleClose} color="error"  sx={{
            border: '1px solid #6A9C89',
            color: '#6A9C89',
            '&:hover': {
              border: '1px solid #6A9C89',
              color: '#6A9C89'
            }
          }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;
