import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
  
   
  
  
  return (
    <ButtonBase>
    <img
      alt="Company Logo"
      src={userObj?.imageUrl||"https://www.shutterstock.com/image-vector/pet-shop-logo-template-600w-1053368123.jpg"}
      // src={"https://www.vecteezy.com/vector-art/10355753-pet-shop-logo-with-dog-rabbit-cat-birds-vector-illustration-circle-shape-petshop-logo-template"}
      style={{
        height: '50px',
      
        width: '180px', // Prevent it from growing too large
        objectFit: 'cover', // Ensure the whole image fits
        display: 'block', // Remove extra space below the image
      }}
    />
    
  </ButtonBase>
  
  
  );
};

export default LogoSection;
