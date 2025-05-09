import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { getApi, postApiRegistration, updateApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const BookingDialog = ({ open, handleClose, fetchData, booking }) => {
  const isEditing = Boolean(booking);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pacKage, setPackage] = useState([]);
  const [petType, setPetType] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(15, 'Maximum 15 characters allowed'),
    city: Yup.string()
      .required('City is required')
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(15, 'Maximum 15 characters allowed'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const fetchDataPackage = async () => {
    try {
      const res = await getApi(urls.package.get);
      setPackage(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchDataPetType = async () => {
    try {
      const res = await getApi(urls.petType.get);
      setPetType(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching pet types:', error);
    }
  };

  useEffect(() => {
    fetchDataPackage();
    fetchDataPetType();
  }, []);

  useEffect(() => {
    if (isEditing && booking) {
      setStartDate(new Date(booking.startDate));
      setEndDate(new Date(booking.endDate));
    } else {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [booking]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        await updateApi(urls.registration.update.replace(':id', booking._id), values);
        toast.success('Booking updated successfully!');
      } else {
        await postApiRegistration(urls.registration.create, values, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success('Booking successful!');
      }

      await fetchData();
      resetForm();
      setStartDate(new Date());
      setEndDate(new Date());
      handleClose();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const initialValues = isEditing
    ? {
        ...booking,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
      }
    : {
        name: '',
        email: '',
        city: '',
        phone: '',
        petType: '',
        pacKage: '',
        gender: '',
        petAge: '',
        size: '',
        service: '',
        pickupLocation: '',
        startDate: startDate,
        endDate: endDate,
      };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">{isEditing ? 'Edit Booking' : 'Book Now'}</Typography>
        <ClearIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                {[
                  { name: 'name', label: 'Name' },
                  { name: 'email', label: 'Email' },
                  { name: 'city', label: 'City' },
                  { name: 'phone', label: 'Phone Number' }
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <TextField
                      fullWidth
                      size="small"
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (field.name === 'name' || field.name === 'city') {
                          val = val.replace(/[^A-Za-z\s]/g, '').slice(0, 15);
                        }
                        if (field.name === 'phone') {
                          val = val.replace(/[^0-9]/g, '').slice(0, 10);
                        }
                        setFieldValue(field.name, val);
                      }}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  </Grid>
                ))}

                {[
                  { name: 'petType', label: 'Pet Type', options: petType.map((p) => ({ value: p.name, label: p.name })) },
                  { name: 'pacKage', label: 'Package', options: pacKage.map((p) => ({ value: p._id, label: p.name })) },
                  { name: 'gender', label: 'Gender', options: ['Male', 'Female'].map((v) => ({ value: v.toLowerCase(), label: v })) },
                  {
                    name: 'petAge',
                    label: 'Pet Age',
                    options: ['1-6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'].map((v) => ({ value: v, label: v }))
                  },
                  {
                    name: 'size',
                    label: 'Pet Size',
                    options: ['Small', 'Medium', 'Large', 'Extra Large'].map((v) => ({ value: v.toLowerCase().replace(' ', '-'), label: v }))
                  },
                  {
                    name: 'service',
                    label: 'Service',
                    options: ['Self', 'Staff'].map((v) => ({ value: v.toLowerCase(), label: v }))
                  }
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <FormControl fullWidth size="small">
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        label={field.label}
                      >
                        <MenuItem value="">Select {field.label}</MenuItem>
                        {field.options.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="error">
                        <ErrorMessage name={field.name} />
                      </Typography>
                    </FormControl>
                  </Grid>
                ))}

                {values.service === 'staff' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      name="pickupLocation"
                      label="Pickup Location"
                      value={values.pickupLocation}
                      onChange={handleChange}
                      error={touched.pickupLocation && Boolean(errors.pickupLocation)}
                      helperText={touched.pickupLocation && errors.pickupLocation}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setFieldValue('startDate', date);
                    }}
                    showTimeSelect
                    minDate={new Date()}
                    minTime={new Date()}
                    maxTime={new Date().setHours(23, 59)}
                    dateFormat="Pp"
                    customInput={
                      <TextField
                        label="Start Date"
                        size="small"
                        fullWidth
                        error={touched.startDate && Boolean(errors.startDate)}
                        helperText={touched.startDate && errors.startDate}
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      setFieldValue('endDate', date);
                    }}
                    showTimeSelect
                    minDate={startDate || new Date()}
                    filterTime={(time) => {
                      if (startDate && new Date(time).toDateString() === startDate.toDateString()) {
                        return new Date(time).getTime() > startDate.getTime();
                      }
                      return true;
                    }}
                    dateFormat="Pp"
                    customInput={
                      <TextField
                        label="End Date"
                        size="small"
                        fullWidth
                        error={touched.endDate && Boolean(errors.endDate)}
                        helperText={touched.endDate && errors.endDate}
                      />
                    }
                  />
                </Grid>
              </Grid>

              <DialogActions sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" 
                   sx={{
                    backgroundColor: '#6A9C89',
                    color: '#ffff',
                    '&:hover': {
                      backgroundColor: '#8DB3A8'
                    }
                  }}
                >
                  {isEditing ? 'Update' : 'Submit'}
                </Button>
                <Button variant="outlined" onClick={handleClose} 
                 sx={{
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
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
