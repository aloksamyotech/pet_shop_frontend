/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// import { useState,useEffect } from 'react';
// import { apiget, apipost } from '../../service/api';
import Palette from '../../ui-component/ThemePalette';

const AddLead = (props) => {
  const { open, handleClose } = props;
  // const [user, setUser] = useState([]);

  // const userid = localStorage.getItem('user_id');
  // const userdata = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    ProductPrice: yup.string().required('Product Price is required'),
    ProductType: yup.string().required('Product Type is required'),
    ProductName: yup.string().required('Product Name is required'),
    productId: yup
      .string()
      .matches(/^[0-9]{4}$/, 'Product ID is invalid')
      .required('Product ID is required'),
    Discount: yup.string().required('Please fill in this field')
    // assigned_agent: yup.string().required('Assigned Agent is required')
  });

  // -----------   initialValues
  const initialValues = {
    productId: '',
    ProductPrice: '',
    Discount: '',
    ProductName: '',
    ProductType: ''
  };

  // add Lead api
  // const addLead = async (values) => {
  //   const data = values;

  //   const result = await apipost('lead/add', data);
  //   setUserAction(result);

  //   if (result && result.status === 201) {
  //     formik.resetForm();
  //     handleClose();
  //     toast.success(result.data.message);
  //   }
  // };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Product Value', values);
      handleClose();
      toast.success('Product Add successfully');
    addLead(values);
    }
  });
  // user api
  // const fetchUserData = async () => {
  //   const result = await apiget('user/list');
  //   if (result && result.status === 200) {
  //     setUser(result?.data?.result);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // TransitionComponent={Transition}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Add New Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography variant="h6" style={{ marginBottom: '65px' }}>
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} style={{ marginBottom: '15px' }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product ID</FormLabel>
                  <TextField
                    id="productId"
                    name="productId"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.productId}
                    onChange={formik.handleChange}
                    error={formik.touched.productId && Boolean(formik.errors.productId)}
                    helperText={formik.touched.productId && formik.errors.productId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    id="ProductName"
                    name="ProductName"
                    type="text"
                    size="small"
                    fullWidth
                    value={formik.values.ProductName}
                    onChange={formik.handleChange}
                    error={formik.touched.ProductName && Boolean(formik.errors.ProductName)}
                    helperText={formik.touched.ProductName && formik.errors.ProductName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Type</FormLabel>
                  <TextField
                    id="ProductType"
                    name="ProductType"
                    size="small"
                    fullWidth
                    value={formik.values.ProductType}
                    onChange={formik.handleChange}
                    error={formik.touched.ProductType && Boolean(formik.errors.ProductType)}
                    helperText={formik.touched.ProductType && formik.errors.ProductType}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Price</FormLabel>
                  <TextField
                    id="ProductPrice"
                    name="ProductPrice"
                    size="small"
                    fullWidth
                    value={formik.values.ProductPrice}
                    onChange={formik.handleChange}
                    error={formik.touched.ProductPrice && Boolean(formik.errors.ProductPrice)}
                    helperText={formik.touched.ProductPrice && formik.errors.ProductPrice}
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Discount</FormLabel>
                    <Select id="Discount" name="Discount" size="small" fullWidth value={formik.values.Discount}    onChange={formik.handleChange}
                    >
                      <MenuItem value="20%">20%</MenuItem>
                      <MenuItem value="40%">40%</MenuItem>
                      <MenuItem value="60%">60%</MenuItem>
                      <MenuItem value="80%">80%</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLead;
