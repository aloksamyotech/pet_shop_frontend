import HomeIcon from '@mui/icons-material/Home';
import { Stack, Button, Box, Grid, Breadcrumbs, Avatar, Typography, Divider, TextField, Tab, TablePagination } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTask from './AddProfile';
import CompanyLogoUploader from './Logo';
import { updateApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const User = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [image, setImage] = useState(
    'https://png.pngtree.com/png-clipart/20240702/original/ngtree-indian-office-girl-wearing-formal-black-and-white-dress-with-long-png-image_15465282.png'
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const storedName = localStorage.getItem('name') || '';
  const storedEmail = localStorage.getItem('email') || '';
  const storedCompany = localStorage.getItem('company') || '';
  const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleOpenAdd = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
    }
  };

  const fetchUser = async () => {
    const response = await getApi(urls.logo.get);
    setLogo(response?.data.data?.[0]);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await updateApi(urls.register.UpdateNewPassword.replace(':id', userObj._id), { currentPassword, newPassword });

      if (response.success) {
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert(response.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
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
      <TabContext value={tabValue}>
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
                borderRadius: '10px',
                mt:'-15px'
              }}
            >
              <TabList indicatorColor="none" onChange={(event, newValue) => setTabValue(newValue)}>
                <Tab
                  value="1"
                  sx={{ fontWeight: 'bold' }}
                  label={
                    <Box display="flex" alignItems="center">
                      Profile
                    </Box>
                  }
                />
                <Tab
                  value="2"
                  label={
                    <Box display="flex" alignItems="center">
                      Update Logo
                    </Box>
                  }
                />
                <Tab
                  value="3"
                  label={
                    <Box display="flex" alignItems="center">
                      Update Password
                    </Box>
                  }
                />
                
              </TabList>
              <TabPanel value="1">
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
                          <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            defaultValue={storedName}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            defaultValue={storedEmail}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Company"
                            variant="outlined"
                            defaultValue={storedCompany}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            defaultValue={storedPhoneNumber}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="2">
                <CompanyLogoUploader />
              </TabPanel>
              <TabPanel value="3">
                <Grid item xs={12} sm={12} display="flex" height="auto" justifyContent="center">
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      width: '50%'
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>Update Password</Typography>
                    <Divider />

                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Enter Current Password"
                          variant="outlined"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          type="password"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Enter New Password"
                          variant="outlined"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          type="password"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handlePasswordChange}>
                          <Button variant="contained">Update</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </TabContext>
    </>
  );
};

export default User;
