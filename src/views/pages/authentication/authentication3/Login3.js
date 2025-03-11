import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box ,Avatar} from '@mui/material';
import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import AuthLogin from '../auth-forms/AuthLogin.js';
import Logo from 'layout/MainLayout/LogoSection';
import AuthFooter from 'ui-component/cards/AuthFooter.js';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { useEffect } from 'react';
import { useState } from 'react';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [logo,setLogo] = useState(null)
  
  const fetchLogo = async () => {
        const response = await getApi(urls.logo.get);
        setLogo(response?.data.data?.[0])
       };
  
  
      useEffect(() => {
        fetchLogo();
      }, []);



  return (
    <AuthWrapper1>
      <Grid container sx={{ minHeight: '100vh', backgroundColor: '#441572' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AuthCardWrapper
            sx={{
              maxWidth: 400,
              width: '100%',
              boxShadow: theme.shadows[3],
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper
            }}
          >
          <Grid container spacing={2} alignItems="center">
 
  <Grid item xs={12}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px',
      }}
    >
      <Avatar
        alt="Logo Image"
        src={ logo?.imageUrl ||"https://www.shutterstock.com/image-vector/pet-shop-logo-template-600w-1053368123.jpg"}
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
        }}
      />
    </Box>
  </Grid>


  <Grid item xs={12}>
    <Stack alignItems="center">
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', color: '#240046' }}>
        Welcome to Pet Shop
      </Typography>
      <Typography textAlign="center" variant="body2" sx={{ color: 'black' }}>
        Login to use the platform
      </Typography>
    </Stack>
  </Grid>

  
  <Grid item xs={12}>
    <AuthLogin />
  </Grid>
</Grid>

          </AuthCardWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2F124C',
              padding: '4px',
              flexDirection: 'column'
            }}
          >
            <Box
              component="img"
              src="https://img.freepik.com/free-vector/pet-shop-with-various-animals_1308-173352.jpg"
              alt="Inventory Management"
              sx={{
                maxWidth: '60%',
                maxHeight: '60%',
                objectFit: 'contain',
                borderRadius: '20px'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '16px'
              }}
            >
              Pet Shop Management System <br />
              <span style={{ fontSize: '12px' }}>Manage your pet shop with ease and efficiency</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};
export default Login;