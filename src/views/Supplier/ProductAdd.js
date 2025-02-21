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
import { postApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const ProductAdd = (props) => {
  const { open, handleClose, fetchSupplier } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    companyName: yup
  .string()
  .required('Company Name is required')
  .matches(/^[A-Za-z\s]+$/, 'Company Name must only contain letters and spaces')
  .max(20, 'Company Name cannot be more than 20 characters'),


    address: yup.string().required('Address is required').max(10, 'Address must be at least 10 characters long')
    .max(50 , 'company Name cannot be more then 50'),

    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number')
      .required('Phone Number is required'),

    email: yup.string().email('Invalid email format').required('Email is required'),

    status: yup.string().required('Status is required'),

   

    description: yup.string().required('Description is required').max(70 , 'Description cannot be more then 70'),
  });

  const initialValues = {
    companyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    status: 'Active',
    
    description: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await postApi(urls.company.create, values);
      await fetchSupplier();
      formik.resetForm();
      toast.success('Company Add successfully');
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
          <Typography variant="h4">Add Supplier</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
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
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^0-9]/g,'');
                      formik.setFieldValue("phoneNumber",sanitizedValue);

                    }}
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
                  <FormLabel>Status</FormLabel>
                  <Select id="status" name="status" size="small" fullWidth value={formik.values.status} onChange={formik.handleChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Blocked">Blocked</MenuItem>
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
