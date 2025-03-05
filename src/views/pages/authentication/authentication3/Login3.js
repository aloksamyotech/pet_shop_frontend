  import { Link } from 'react-router-dom';

  // material-ui
  import { useTheme } from '@mui/material/styles';
  import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

  // project imports
  import AuthWrapper1 from '../AuthWrapper1';
  import AuthCardWrapper from '../AuthCardWrapper';
  import AuthLogin from '../auth-forms/AuthLogin';
  import Logo from 'ui-component/Logo';
  import AuthFooter from 'ui-component/cards/AuthFooter';

  // assets

  // ================================|| AUTH3 - LOGIN ||================================ //

  const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
      <AuthWrapper1>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                   <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
  <img
    src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg"
    alt="Login illustration"
    style={{ width: '100%', height:'100%' }}
  />
</Grid>
 </Grid>
      </AuthWrapper1>
    );
  };

  export default Login;
