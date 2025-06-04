

import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import AnimateButton from 'ui-component/extended/AnimateButton';
import { urls } from 'views/Api/constant';
import { postApiRegistration } from 'views/Api/comman';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const validationSchema = Yup.object({
  name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('City is required'),
  phone: Yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required('Phone is required'),
  petType: Yup.string().required('Pet type is required'),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().required('Gender is required'),
  petAge: Yup.number().positive('Invalid age').integer('Invalid age').required('Pet age is required'),
  service: Yup.string().required('Service type is required'),
  size: Yup.number().positive('Invalid size').integer('Invalid size').required('Size is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  pickupLocation: Yup.string().when('service', {
    is: 'staff',
    then: Yup.string().required('Pickup location is required'),
    otherwise: Yup.string().notRequired()
  }),
  
});

const Register = () => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

const navigate = useNavigate()



  const handleCallNowClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      city: '',
      phone: '',
      petType: '',
      breed: '',
      gender: '',
      petAge: '',
      service: '',
      size: '',
      pickupLocation: '', // ✅ New field
      startDate: null,
      endDate: null,
    },
    
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Convert date fields to ISO strings if they are Date objects
      const requestData = {
        ...values,
        startDate: values.startDate instanceof Date ? values.startDate.toISOString() : values.startDate,
        endDate: values.endDate instanceof Date ? values.endDate.toISOString() : values.endDate,
      };
  
      try {
      
        const response = await postApiRegistration(urls.registration.create, requestData, {
          headers: { 'Content-Type': 'application/json' }
        });
         await navigate('/success')
        resetForm();
      } catch (error) {
       
        toast.error('Failed to register');
      }
    }
  });
  
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
   
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6A9C89',
            padding: '4px',
            flexDirection: 'column',
          }}
        >
          <Box
            component="img"
            src="https://img.freepik.com/free-vector/pet-shop-with-various-animals_1308-173352.jpg"
            alt="Pet Service"
            sx={{
              maxWidth: '60%',
              maxHeight: '60%',
              objectFit: 'contain',
              borderRadius: '20px',
            }}
          />
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: '16px' }}>
            Your Pet Deserves the Best Grooming Service!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#A6CDC6',
              marginTop: 2,
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#6A9C89',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
              },
            }}
            onClick={handleCallNowClick}
          >
            Call Now
          </Button>

          {showPhoneNumber && (
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}>
              Call us at: +1-800-123-4567
            </Typography>
          )}
        </Box>
      </Grid>

     
      <Box
        sx={{
          width: '50%',
          padding: 4,
          backgroundColor: '#A6CDC6',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'white' }}>
          Pet Service Registration
        </Typography>

        <Box sx={{ width: '80%', border: '1px solid #ccc', padding: 2, backgroundColor: '#fff', borderRadius: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
            
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

        
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

             
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>

        
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

            
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.petType && Boolean(formik.errors.petType)}>
                  <InputLabel>Pet Type</InputLabel>
                  <Select
                    name="petType"
                    value={formik.values.petType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="">Select Pet Type</MenuItem>
                    <MenuItem value="cat">cat</MenuItem>
                    <MenuItem value="dog">dogs</MenuItem>
                    <MenuItem value="small pet">Small Pet</MenuItem>
                  </Select>
                  {formik.touched.petType && formik.errors.petType && (
                    <Typography variant="caption" color="error">{formik.errors.petType}</Typography>
                  )}
                </FormControl>
              </Grid>

           
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Breed"
                  name="breed"
                  value={formik.values.breed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.breed && Boolean(formik.errors.breed)}
                  helperText={formik.touched.breed && formik.errors.breed}
                />
              </Grid>

           
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">male</MenuItem>
                    <MenuItem value="female">female</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography variant="caption" color="error">{formik.errors.gender}</Typography>
                  )}
                </FormControl>
              </Grid>

             
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pet Age"
                  name="petAge"
                  type="number"
                  value={formik.values.petAge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.petAge && Boolean(formik.errors.petAge)}
                  helperText={formik.touched.petAge && formik.errors.petAge}
                />
              </Grid>

            
              <Grid item xs={12} md={6}>
  <TextField
    select
    fullWidth
    label="Service"
    name="service"
    value={formik.values.service}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.service && Boolean(formik.errors.service)}
    helperText={formik.touched.service && formik.errors.service}
  >
    <MenuItem value="self">self</MenuItem>
    <MenuItem value="staff">staff</MenuItem>
  </TextField>
</Grid>
{formik.values.service === 'staff' && (
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Pickup Location"
      name="pickupLocation"
      value={formik.values.pickupLocation}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.pickupLocation && Boolean(formik.errors.pickupLocation)}
      helperText={formik.touched.pickupLocation && formik.errors.pickupLocation}
    />
  </Grid>
)}  



         
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Size"
                  name="size"
                  type="number"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.size && Boolean(formik.errors.size)}
                  helperText={formik.touched.size && formik.errors.size}
                />
              </Grid>

              
              <Grid item xs={12} md={6}>
                <DatePicker
                  selected={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue('startDate', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={<TextField fullWidth label="Start Date and Time" />}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <Typography variant="caption" color="error">{formik.errors.startDate}</Typography>
                )}
              </Grid>

             
              <Grid item xs={12} md={6}>
                <DatePicker
                  selected={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue('endDate', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={<TextField fullWidth label="End Date and Time" />}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <Typography variant="caption" color="error">{formik.errors.endDate}</Typography>
                )}
              </Grid>

          
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      background: '#6A9C89',
                      borderRadius: '50px',
                      '&:hover': {
                        background: '#6A9C89',
                        boxShadow: '2',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
