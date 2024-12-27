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

const ProductAdd = (props) => {
  const { open, handleClose } = props;

  
// -----------  validationSchema
  const validationSchema = yup.object({
    companyId:yup.string().matches(/^[0-9]{4}$/, 'Product Id is invalid').required('company id is required'),
    productName: yup.string().required('Product Name is required'),
    quantity: yup.string().required('quantity is required'),
  date: yup.date().required('Date is required'),
  discount: yup.string().required('discount is required'),
 

      });

  // -----------   initialValues
  const initialValues = {
   
   companyId :'',
   productName :'',
   quantity:'',
   date:'',
   description:''


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
                Purchase  Details
              </Typography>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Company ID</FormLabel>
                  <TextField
                    id="companyId"
                    name="companyId"
                    size="small"
                    fullWidth
                    value={formik.values.companyId}
                    onChange={formik.handleChange}
                    error={formik.touched.companyId && Boolean(formik.errors.companyId)}
                      helperText={formik.touched.companyId && formik.errors.companyId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Product Name</FormLabel>
                    <Select

                      id="productName"
                      name="productName"
                      size="small"
                      fullWidth
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                      error={formik.touched.productName && Boolean(formik.errors.productName)}
                      helperText={formik.touched.productName && formik.errors.productName}
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
                      {formik.touched.productName && formik.errors.productName}
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
                  <FormLabel>Quantity</FormLabel>
                  <TextField
                    id="quantity"
                    name="quantity"
                    size="small"
                    fullWidth
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                      helperText={formik.touched.quantity && formik.errors.quantity}
                  />
                </Grid>


                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Discount</FormLabel>
                  <TextField
                    id="discount"
                    name="discount"
                    size="small"
                    fullWidth
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    error={formik.touched.discount && Boolean(formik.errors.discount)}
                      helperText={formik.touched.discount && formik.errors.discount}
                  />
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

export default ProductAdd;
