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
  DialogContentText,
  FormLabel,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';

const AddEdit = ({ open, handleClose, company, fetchSupplier }) => {
  const validationSchema = yup.object({
    companyName: yup
      .string()
      .required('Company Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Company Name must only contain letters')
      .max(30, 'Company Name cannot be more than 30 characters'),

    address: yup
      .string()
      .required('Address is required')
      .max(50, 'Address cannot be more than 50 characters'),

    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number')
      .required('Phone Number is required'),

    email: yup.string().email('Invalid email format').required('Email is required'),

    status: yup.string().required('Status is required'),

    description: yup
      .string()
      .required('Description is required')
      .max(50, 'Description cannot be more than 50 characters')
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
      try {
        await updateApi(urls.company.update.replace(':id', company._id), values);
        toast.success('Company updated successfully!');
        await fetchSupplier();
        handleClose();
      } catch (error) {
        toast.error('Failed to update company.');
      }
    }
  });

  useEffect(() => {
    if (company) {
      formik.setValues({
        companyName: company?.companyName || '',
        description: company?.description || '',
        status: company?.status || 'Active',
        address: company?.address || '',
        email: company?.email || '',
        phoneNumber: company?.phoneNumber || ''
      });
    }
  }, [company, open]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle
        id="dialog-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4">Update Supplier</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText tabIndex={-1}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Phone Number</FormLabel>
                <TextField
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
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <FormLabel>Status</FormLabel>
                <Select
                  id="status"
                  name="status"
                  size="small"
                  fullWidth
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Blocked">Blocked</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DialogContentText>

          <DialogActions>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#6A9C89',
            color: '#ffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}>
              Update
            </Button>
            <Button
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
              variant="outlined"
              color="error"
              sx={{
                border: '1px solid #6A9C89',
                color: '#6A9C89',
                '&:hover': {
                  border: '1px solid #6A9C89',
                  color: '#6A9C89'
                }
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEdit;
