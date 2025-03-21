import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
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
import { getApi, updateApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';

const Employee = ({ open, handleClose, customer, fetchCustomer,currencySymbol }) => {
  const isEdit = Boolean(customer);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('First Name is required')
      .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters')
      .max(50, 'First Name cannot be more than 50 characters'),
    email: yup.string().required('Email is required').email('Invalid email address'),
   
    EId: yup
    .string()
    .required('Id is required'),
    address: yup.string().required('Address is required').max(100, 'Address cannot be more than 100 characters'),
    salary: yup.string().required('Salary is required')
  });

  const initialValues = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    salary: '',
    EId:''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        await updateApi(urls.employee.update.replace(':id', customer._id), values);
        toast.success('employee updated successfully!');
      } else {
        await postApi(urls.employee.create, values);
        toast.success('employee added successfully!');
      }
      await fetchCustomer();
      handleClose();
    }
  });

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        name: customer?.name || '',
        email: customer?.email || '',
        address: customer?.address || '',
        phoneNumber: customer?.phoneNumber || '',
        salary: customer?.salary || '',
        EId: customer?.EId || '',
      });
    } else {
      formik.resetForm();
    }
  }, [customer, open]);

  return (
    <Dialog open={open} aria-labelledby="customer-dialog-title">
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{isEdit ? 'Update Customer' : 'Create Employee'}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Employee Id</FormLabel>
                <TextField
                  id="EId"
                  EId="EId"
                  size="small"
                  fullWidth
                  value={formik.values.EId}
                  onChange={formik.handleChange}
                  error={formik.touched.EId && Boolean(formik.errors.EId)}
                  helperText={formik.touched.EId && formik.errors.EId}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  size="small"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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
                    formik.setFieldValue('phoneNumber', sanitizedValue);
                  }}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Salary ({currencySymbol})</FormLabel>
                <TextField
                  id="salary"
                  name="salary"
                  size="small"
                  fullWidth
                  value={formik.values.salary}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                    formik.setFieldValue('salary', sanitizedValue);
                  }}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  helperText={formik.touched.salary && formik.errors.salary}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" onClick={formik.handleSubmit}   sx={{
              backgroundColor: '#6A9C89',
              color: '#ffff',
              '&:hover': {
                backgroundColor: '#8DB3A8'
              }
            }}>
          {isEdit ? 'Update' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={handleClose}  sx={{
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

export default Employee;
