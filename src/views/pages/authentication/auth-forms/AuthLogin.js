import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { urls } from "views/Api/constant";
import { postApiLogin } from "views/Api/comman";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const email = "riya@samyotech.com";
  const password = "12345678"; 

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    
    });
  };

  return (
    <Box
    //   sx={{
    //     minHeight: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "#7962bf",
    //     padding: "20px",
    //   }}
    >
       <Box
    sx={{
      width: "100%", 
      maxWidth: "500px", 
      height: "auto", 
      padding: "20px", 
      borderRadius: "15px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      background:"#7962bf",
  
    }}
  >
        <Box sx={{ mb: 2 }}>
          <img
            src="https://marketplace.canva.com/EAGCrLxEdO8/1/0/1600w/canva-black-and-white-illustrative-pet-shop-logo-NSim_pyCK9Q.jpg"
            alt="Login illustration"
            style={{ width: "100px", height: "auto", borderRadius: "50%" }}
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
          Welcome To Pet Shop
        </Typography>

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
                localStorage.setItem("user", JSON.stringify(response.data.user));

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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 2 }}>
                <InputLabel>Email Address</InputLabel>
                <OutlinedInput
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email Address"
                  sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />
                {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 2 }}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordValue(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />
                {touched.password && errors.password && <FormHelperText>{errors.password}</FormHelperText>}
              </FormControl>

              <Typography
  sx={{
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    color: "#fff",
    mt: 1,
    "&:hover": { color: "#ffdfdf" },
  }}
  onClick={() => {
    copyToClipboard(email);
    setFieldValue("email", email); 
  }}
>
  <strong>Email: </strong> {email} <ContentCopyIcon fontSize="small" />
</Typography>


              <Typography
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  color: "#fff",
                  mt: 1,
                  "&:hover": { color: "#ffdfdf" },
                }}
                onClick={() => {
                  copyToClipboard(password);
                  setFieldValue("password", password); 
                }}
              >
                <strong>Password: </strong> {password} <ContentCopyIcon fontSize="small" />
              </Typography>

              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  background: "#fff",
                  color: "#ff758c",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  mt: 2,
                  "&:hover": {
                    background: "#ffdfdf",
                  },
                }}
              >
                Sign In
              </Button>

              {errors.submit && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errors.submit}
                </Typography>
              )}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default FirebaseLogin;
