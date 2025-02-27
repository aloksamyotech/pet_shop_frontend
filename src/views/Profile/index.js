import HomeIcon from '@mui/icons-material/Home';
import { Stack, Button, Box, Grid, Breadcrumbs, Avatar, Typography, Divider, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTask from './AddProfile';

const User = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  const storedName = localStorage.getItem('name') || '';
  const storedEmail = localStorage.getItem('email') || '';
  const storedCompany = localStorage.getItem('company') || '';
  const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleOpenAdd = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <AddTask
        open={openForm}
        handleClose={handleCloseForm}
        userData={{
          firstname: storedName,
          email: storedEmail,
          company: storedCompany,
          phoneNumber: storedPhoneNumber
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: 'white',
                height: '50px',
                width: '100%',
                display: 'flex',
                borderRadius: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 25px'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
                Profile
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <Breadcrumbs aria-label="breadcrumb">
                  <HomeIcon sx={{ color: '#2067db' }} fontSize="medium" onClick={handleClick} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
                    Profile Information
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px'
            }}
          >
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} sm={4} display="flex" height="auto">
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>Profile Picture</Typography>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Avatar
                      alt="Profile Image"
                      src={
                        'https://png.pngtree.com/png-clipart/20240702/original/pngtree-indian-office-girl-wearing-formal-black-and-white-dress-with-long-png-image_15465282.png'
                      }
                      sx={{
                        width: 130,
                        height: 130,
                        borderRadius: '50%',
                        backgroundColor: '#7760f6'
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: 'gray', fontSize: '12px', marginBottom: '10px' }}>Admin</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>Account Details</Typography>
                  <Divider />

                  <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="First Name" variant="outlined" defaultValue={storedName} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField fullWidth label="Email Address" variant="outlined" defaultValue={storedEmail} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Company" variant="outlined" defaultValue={storedCompany} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone Number" variant="outlined" defaultValue={storedPhoneNumber} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
