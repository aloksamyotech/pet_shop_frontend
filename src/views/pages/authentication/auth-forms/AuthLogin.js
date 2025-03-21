import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
 import { urls } from "views/Api/constant";
 import { postApiLogin } from "views/Api/comman";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Divider,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef.js';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { filterMenuItems, dashboard } from '../../../../menu-items/dashboard.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCredentialClick = async (email, password, setFieldValue, handleSubmit) => {
    setFieldValue('email', email);
    setFieldValue('password', password);
    setTimeout(() => {
      handleSubmit();
    }, 500);
  };
  return (
    <>
         <Formik
           initialValues={{ email: "", password: "" }}
           validationSchema={Yup.object({
             email: Yup.string().email("Invalid email").required("Email is required"),
             password: Yup.string().min(6, "Password too short").required("Password is required"),
           })}
           onSubmit={async (values, { setSubmitting, setErrors }) => {
             try {
               const response = await postApiLogin(urls.login.create, values);
               const accessToken = response.data.accessToken;

               if (accessToken) {
                 console.log("Token found, redirecting to dashboard...");
                 localStorage.setItem("accessToken", accessToken);
                 localStorage.setItem("name", response.data.user.firstname);
                 localStorage.setItem("email", response.data.user.email);
                 localStorage.setItem("company", response.data.user.company);
                 localStorage.setItem("phoneNumber", response.data.user.phoneNumber);
                 localStorage.setItem("country", response.data.user.country);
                 localStorage.setItem("user", JSON.stringify(response.data.user));
                 localStorage.setItem("Id", JSON.stringify(response.data.user._id));
                 

                 window.location.href = "/";
               } else {
                 throw new Error("Access token not found");
               }

               setSubmitting(false);
             } catch (error) {
               setErrors({ submit: "Login failed. Please try again." });
               setSubmitting(false);
             }
           }}
         >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? '#000066' : ''
                  }
                },
                mb: 2
              }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
              />
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? '#000066' : ''
                  }
                }
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  p: 2
                }}
                onClick={() => handleCredentialClick('priti.sahu@samyotech.com', '12345678', setFieldValue, handleSubmit)}
              >
                <Typography variant="h5">Admin Credentials</Typography>
              </Box>
              <Divider />
              {/* <Box
                sx={{
                  cursor: 'pointer',
                  p: 2
                }}
                onClick={() => handleCredentialClick('samyotech@gmail.com', '123456', setFieldValue, handleSubmit)}
              >
                <Typography variant="h5">User Credentials</Typography>
              </Box> */}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    background: '#6A9C89',
                    borderRadius: '50px',
                    '&:hover': {
                      background: '#6A9C89',
                      boxShadow: '2'
                    }
                  }}
                >
                  {isSubmitting ? 'Logging in...' : 'Sign in'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default AuthLogin;
