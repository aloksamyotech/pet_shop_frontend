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
import { postApi } from "views/Api/comman";

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #7962bf,#5332b9)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
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
              console.log("Login values:", values);
              await postApi(urls.login.create, values);
              setSubmitting(false);
            } catch (error) {
              console.error("Login error:", error);
              setErrors({ submit: "Login failed. Please try again." });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
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
                  onChange={handleChange}
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
