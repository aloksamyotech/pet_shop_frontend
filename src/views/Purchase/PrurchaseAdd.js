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
import axios from 'axios';
import { urls } from 'views/Api/constant';
import { getApi, postApi } from 'views/Api/comman.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { maxHeight } from '@mui/system';

const ProductAdd = (props) => {
  const { open, handleClose, fetchPurchase } = props;

  const validationSchema = yup.object({
    productId: yup.string().required('Product Name is required'),

    quantity: yup
      .number()
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer')
      .required('Quantity is required'),

    // totalPrice: yup.number().positive('Total Price must be a positive number').required('Total Price is required'),

    discount: yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),

    paymentStatus: yup.string().required('Payment Status is required')
  });

  const initialValues = {
    productId: '',
    quantity: '',
    // totalPrice: '',
    discount: '0',
    paymentStatus: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await postApi(urls.purchase.create, values);
      await fetchPurchase();
      toast.success('Product  Add successfully');
      handleClose();
      formik.resetForm();
    }
  });

  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);

    setProduct(response?.data?.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
          <Typography variant="h6">Information</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Purchase Details
              </Typography>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Name</FormLabel>
                  <Select
                    id="productId"
                    name="productId"
                    size="small"
                    fullWidth
                    value={formik.values.productId}
                    onChange={formik.handleChange}
                    error={formik.touched.productId && Boolean(formik.errors.productId)}
                    MenuProps={{
                      PaperProps:{
                        style:{
                          maxHeight : 200,
                        }

                      }
                      ,

                    }}
                  >
                    {Array.isArray(product) &&
                      product.map((products) => (
                        <MenuItem key={products._id} value={products._id}>
                          {products.productName}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Amount</FormLabel>
                  <TextField
                    name="totalPrice"
                    type="totalPrice"
                    size="small"
                    fullWidth
                    value={formik.values.totalPrice}
                    onChange={formik.handleChange}
                    error={formik.touched.totalPrice && Boolean(formik.errors.totalPrice)}
                    helperText={formik.touched.totalPrice && formik.errors.totalPrice}
                  />
                </Grid> */}
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
              </Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
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
                {/* <Grid item xs={12} sm={6} md={6}>
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
                </Grid> */}

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    id="paymentStatus"
                    name="paymentStatus"
                    size="small"
                    fullWidth
                    value={formik.values.paymentStatus}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Pending">
                    
                    Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                  </Select>
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
