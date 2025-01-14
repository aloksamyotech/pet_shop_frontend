import HomeIcon from '@mui/icons-material/Home';

import { Stack, Button, Container, Typography, Card, Box, Grid, TextField, Breadcrumbs, Avatar } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const User = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(' Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters'),

    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number')
      .required('Phone Number is required'),

    email: yup.string().required('Email is required').email('Invalid email address'),

    registerDate: yup.date().typeError('Register date must be a valid date').required('Register date is required')
  });

  const initialValues = {
    firstName: '',
    phoneNumber: '',
    email: '',
    registerDate: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('profileValues', values);
      handleClose();
      formik.resetForm();
      toast.success('Profile Add successfully');
    }
  });

  return (
    <Grid>
      <Stack direction="row" mb={5} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: 'white',
            height: '50px',
            width: '100%',
            display: 'flex',
            borderRadius: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 25px',
            marginTop: '-7px'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black', fontFamily: '' }}>
            Profile
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <HomeIcon sx={{ color: '#2067db' }} fontSize="medium" onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Profile-Information
              </Typography>
            </Breadcrumbs>
          </Stack>
        </Box>
      </Stack>

      <Box
        sx={{
          height: '500px',
          width: '100%',
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '-30px'
        }}
      >
        <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://png.pngtree.com/png-clipart/20240702/original/pngtree-indian-office-girl-wearing-formal-black-and-white-dress-with-long-png-image_15465282.png"
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                backgroundColor: '#7760f6',
                marginBottom: '20px'
              }}
            />
          </Box>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Register Date"
              name="registerDate"
              value={formik.values.registerDate}
              onChange={formik.handleChange}
              error={formik.touched.registerDate && Boolean(formik.errors.registerDate)}
              helperText={formik.touched.registerDate && formik.errors.registerDate}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Register Date"
              name="registerDate"
              value={formik.values.registerDate}
              onChange={formik.handleChange}
              error={formik.touched.registerDate && Boolean(formik.errors.registerDate)}
              helperText={formik.touched.registerDate && formik.errors.registerDate}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant="contained" size="large" width="30px" height="30vh" onClick={formik.handleSubmit}>
            Update
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};
export default User;
