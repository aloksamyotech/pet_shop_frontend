import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Typography } from '@mui/material';
import PET from 'assets/images/pet-logo.jpg'
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
      src={userObj?.imageUrl|| PET}
     
      style={{
        height: '50px',
    width: '180px', 
        objectFit: 'cover', 
        display: 'block', 
      }}
    />
    
  </ButtonBase>
  
  
  );
};

export default LogoSection;
