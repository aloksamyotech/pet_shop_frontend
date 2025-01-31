import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography ,DialogContentText,FormControl,FormLabel,Select,MenuItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi,updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';


const AddEdit = (props) => {
  const { open, handleClose, customer,fetchCustomer } = props;


  
 const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First Name is required')
      .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters')
      .max(10 , 'first Name cannot be more then 10'),

    email: yup.string().required('Email is required').email('Invalid email address'),

    phoneNumber: yup
      .string()
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),

    status: yup.string().required('Status is required'),

    address: yup
      .string()
      .required('Address is required')
      .max(10, 'Address must be at least 10 characters long')
      .matches(/^[A-Za-z\s]+$/, 'address must only contain letters')
      .max(20 , 'Address cannot be more then 20'),

   
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
      const updatedCustomer = {
      firstName: values.firstName,
     email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber,
      status: values.status
    };
     await updateApi(urls.customer.update.replace(":id", customer._id), updatedCustomer); 
     toast.success("customer updated successfully!")
     await fetchCustomer(); 
      handleClose(); 
     
    },
  });
  

  useEffect(() => {
    if (customer) {
      formik.setValues({
        firstName: customer?.firstName,
     email: customer?.email,
        address: customer?.address,
        phoneNumber: customer?.phoneNumber,
        status: customer?.status
      });
      fetchCustomer();
    }
  }, [customer, open]);
  
  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4">Update Customer</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Name</FormLabel>
                    <TextField
                      id="firstName"
                      name="firstName"
                      size="small"
                      fullWidth
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                  </FormControl>
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

                <Grid item xs={12} sm={6} md={6}>
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
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      id="phoneNumber"
                      name="phoneNumber"
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
                  </FormControl>
                </Grid>
              
               
                <Grid item xs={12} sm={6} md={6}>
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
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Update
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEdit;
