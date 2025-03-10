import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, CardMedia } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { urls } from 'views/Api/constant';
import { getApi } from 'views/Api/comman';
import { useEffect } from 'react';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useState } from 'react';


// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
const [logo,setLogo] = useState(null)




const fetchLogo = async () => {
      const response = await getApi(urls.logo.get);
      setLogo(response?.data.data?.[0].imageUrl)
     };


    useEffect(() => {
      fetchLogo();
    }, []);



  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 200,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
        <CardMedia
    component="img"
    image={logo  || "https://www.shutterstock.com/image-vector/pet-shop-logo-template-600w-1053368123.jpg"}
    alt="Description of the image"
    sx={{
      width: '50px',
      height: '50px',
      borderRadius: '50px',
    }}
  />
        
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <ProfileSection/>
     
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
