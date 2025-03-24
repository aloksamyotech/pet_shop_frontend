import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, CardMedia, Typography } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useState, useEffect } from 'react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const [logo, setLogo] = useState(null);
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;

  

  return (
    <>
      <Box
        sx={{
          width: 208,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
        
        }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoSection />
        </Box>
        {/* 
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: '-20px' }}>
          <Typography sx={{ color: '#6A9C89', fontWeight: 'bold', fontSize: '20px' }}>Pet Shop</Typography>
          <Typography sx={{ fontSize: '12px', color: '#6A9C89' }}>Happy Tails Hub</Typography>
        </Box> */}
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: '#ffff !important',
              color: '#6A9C89 !important',
              '&:hover': {
                background: '#ffff !important',
                color: '#6A9C89 !important'
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      {/* heading */}
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'left',
          paddingTop: '7px'
        }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: 800, fontFamily: 'Playfair Display, serif' }}>Welcome back !</Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
          {userObj.email}
        </Typography>
      </Box>
      {/* notification & profile */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
