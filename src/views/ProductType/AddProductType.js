/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import Palette from '../../ui-component/ThemePalette';

const AddProduct = (props) => {
  const { open, handleClose } = props;

  
// -----------  validationSchema
  const validationSchema = yup.object({
    productId:yup.string().matches(/^[0-9]{4}$/, 'Product Id is invalid').required('Product id is required'),
    personName: yup.string().required('Person Name is required'),
    productType: yup.string().required('Product Type is required'),
  date: yup.date().required('Date is required'),
    payments: yup.string().required('Payment Type is required'),
    premiumPayments: yup.string().required('PremiumPayments  is required'),

      });

  // -----------   initialValues
  const initialValues = {
    productId: '',
    personName: '',
    productType: '',
    date: '',
    payments: '',
    premiumPayments:'',


  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      
      console.log('values', values);
      toast.success('Product  Add successfully');
      handleClose();
      formik.resetForm();
    }
  });

 
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
           
          }}
        >
          <Typography variant="h6">Add New  Product</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Product Details
              </Typography>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Person ID</FormLabel>
                  <TextField
                    id="productId"
                    name="productId"
                    size="small"
                    fullWidth
                    value={formik.values.productId}
                    onChange={formik.handleChange}
                    error={formik.touched.productId && Boolean(formik.errors.productId)}
                      helperText={formik.touched.productId && formik.errors.productId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Product type</FormLabel>
                    <Select

                      id="productType"
                      name="productType"
                      size="small"
                      fullWidth
                      value={formik.values.productType}
                      onChange={formik.handleChange}
                      error={formik.touched.productType && Boolean(formik.errors.productType)}
                      helperText={formik.touched.productType && formik.errors.productType}
                    >

                      <MenuItem value="Wet canned food">Wet canned food
                      </MenuItem>
                      <MenuItem value="Freeze-dried or raw food">Freeze-dried or raw food
                      </MenuItem>
                      <MenuItem value="Treats and snacks">Treats and snacks
                      </MenuItem>
                      <MenuItem value="Vitamins and minerals">Vitamins and minerals

                      </MenuItem>


                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.productType && formik.errors.productType}
                    </FormHelperText>
                  </FormControl>
                  </Grid>
                </Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    size="small"
                    fullWidth
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Person Name</FormLabel>
                  <TextField
                    id="personName"
                    name="personName"
                    size="small"
                    fullWidth
                    value={formik.values.personName}
                    onChange={formik.handleChange}
                    error={formik.touched.personName && Boolean(formik.errors.personName)}
                      helperText={formik.touched.personName && formik.errors.personName}
                  />
                </Grid>


              </Grid>


      <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Payment Type</FormLabel>
                  <Select
                      
                      id="payments"
                      name="payments"
                      label=""
                      size="small"
                      value={formik.values.payments}
                      onChange={formik.handleChange}
                      error={formik.touched.payments && Boolean(formik.errors.payments)}
                      helperText={formik.touched.payments && formik.errors.payments}
                    >
                      <MenuItem value="Online">Online</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Premium Payments</FormLabel>
                    <Select

                      id="premiumPayments"
                      name="premiumPayments"
                      label=""
                      size="small"
                      value={formik.values.premiumPayments}
                      onChange={formik.handleChange}
                      error={formik.touched.premiumPayments && Boolean(formik.errors.premiumPayments)}
                      helperText={formik.touched.premiumPayments && formik.errors.premiumPayments}
                    >
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Annually">Annually </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>


            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
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

export default AddProduct;
