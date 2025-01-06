/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, FormLabel, Select } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddCustomer= (props) => {
  const { open, handleClose } = props;
 

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('First Name is required')
        .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters'), 
    
    lastName: yup
        .string()
        .required('Last Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Last Name must only contain letters'), 

    dateOfBirth: yup
        .date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth cannot be in the future'), 
    
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address'), 
    
    phoneNumber: yup
        .string() 
        .required('Phone Number is required')
        .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'), 
    
    status: yup
        .string()
        .required('Status is required')
        .oneOf(['active', 'inactive'], 'gender must be "male", "active", "inactive"'), 
    
    address: yup
        .string()
        .required('Address is required')
        .max(10, 'Address must be at least 10 characters long'), 
    
    gender: yup
        .string()
        .required('Gender is required')
        .oneOf(["male", "female", "other"], 'gender must be "male", "female", "other"'),
    
    customerType: yup
        .string()
        .required('Customer Type is required')
        .oneOf(['regular', 'premium', 'business'], 'customer Type must be "regular", "premium", "business"'), 
});


  // -----------   initialValues
  const initialValues = {
   firstName: "",
   lastName: "",
   email:'',
   address:"",
   phoneNumber:'',
   dateOfBirth:'',
   status:"",
   customerType:"",
   gender:''
  };

// formik
const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit: async (values) => {
    const response = await axios.post('http://localhost:7200/customer/save',values);
    console.log('Product Value', response);
    handleClose();
    toast.success('Product Add successfully');
  
  }
});








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
          <Typography variant="h6">Create Customer</Typography>
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
                   
                  <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
                    <TextField
                    id="lastName"
                    name="lastName"
                    size="small"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />

                   
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <TextField
                    id="gender"
                    name="gender"
                    size="small"
                  fullWidth
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}
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
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  />
                  
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>DOB</FormLabel>
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    size="small"
                    fullWidth
                   
                   
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  />
                  
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Customer Type </FormLabel>
                  <TextField
                    id="customerType"
                    name="customerType"
                    size="small"
                    fullWidth
                   
               
                    value={formik.values.customerType}
                    onChange={formik.handleChange}
                    error={formik.touched.customerType && Boolean(formik.errors.customerType)}
                    helperText={formik.touched.customerType && formik.errors.customerType}
                  />
                  
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Status</FormLabel>
                  <TextField
                    id="status"
                    name="status"
                    size="small"
                    fullWidth
                   
                   
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  />
                
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
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

export default AddCustomer;
