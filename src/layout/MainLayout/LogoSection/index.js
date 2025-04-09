import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBase, Typography } from '@mui/material';
import Pet from 'assets/images/pet-logo.jpg';
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  return (
    <ButtonBase>
      <img
        alt="Company Logo"
        src={userObj?.imageUrl || Pet}
        style={{
          height: '50px',
          width: '180px',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </ButtonBase>
  );
};

export default LogoSection;
