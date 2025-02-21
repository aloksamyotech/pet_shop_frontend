import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  FormControl,
  IconButton,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const ProductAdd = (props) => {
  const { open, handleClose, fetchPurchase } = props;
  const [product, setProduct] = useState([]);
  const [company, setCompany] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const initialValues = {
    productId: '',
    quantity: '1', // Default to 1 for better UX
    totalPrice: '',
    discount: '0',
    paymentStatus: 'Pending',
    productPrice: '',
    companyId: ''
  };

  const validationSchema = yup.object({
    productId: yup.string().required('Product Name is required'),
    quantity: yup
      .number()
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer')
      .required('Quantity is required')
      .max(1000, 'Max 1000 quantity'),
    totalPrice: yup.number().positive('Total Price must be greater than 0').required('Total Price is required'),
    discount: yup.number().integer('Discount must be an integer'),
    paymentStatus: yup.string().required('Payment Status is required'),
    productPrice: yup.number().positive('Product Price must be a positive number').required('Product Price is required'),
    companyId: yup.string().required('Company is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await postApi(urls.purchase.create, values);
      await fetchPurchase();
      toast.success('Product added successfully');
      formik.resetForm();
      handleClose();
    }
  });

  const calculateAmount = (quantity, discount) => {
    const selectedProduct = product.find((p) => p._id === formik.values.productId);
    const price = selectedProduct ? selectedProduct.price : 0;
    formik.setFieldValue('productPrice', price);
    return price * quantity - discount;
  };

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
    setProduct(response?.data?.data);
  };

  const fetchCompany = async () => {
    const response = await getApi(urls.company.get);
    setCompany(response?.data?.data);
  };

  useEffect(() => {
    fetchProduct();
    fetchCompany();
  }, []);

  useEffect(() => {
    const quantity = formik.values.quantity || 1;
    const discount = formik.values.discount || 0;
    const dataPrice = calculateAmount(quantity, discount);
    formik.setFieldValue('totalPrice', dataPrice);
  }, [formik.values.quantity, formik.values.discount, formik.values.productId]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title">
      <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Add Purchase</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <DialogContentText id="scroll-dialog-description">
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Autocomplete
                  options={product}
                  getOptionLabel={(option) => option.productName}
                  value={product.find((p) => p._id === formik.values.productId) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('productId', newValue ? newValue._id : '');
                    formik.setFieldValue('productPrice', newValue ? newValue.price : 0);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Name"
                      size="small"
                      fullWidth
                      error={formik.touched.productId && Boolean(formik.errors.productId)}
                      helperText={formik.touched.productId && formik.errors.productId}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Autocomplete
                  options={company}
                  getOptionLabel={(option) => option.companyName}
                  value={company.find((c) => c._id === formik.values.companyId) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('companyId', newValue ? newValue._id : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company Name"
                      size="small"
                      fullWidth
                      error={formik.touched.companyId && Boolean(formik.errors.companyId)}
                      helperText={formik.touched.companyId && formik.errors.companyId}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Quantity</FormLabel>
                <TextField
                  id="quantity"
                  name="quantity"
                  size="small"
                  fullWidth
                  type="number"
                  value={formik.values.quantity}
                  onChange={(e) => {
                    formik.setFieldValue('quantity', Math.max(parseInt(e.target.value, 10) || 1, 1));
                  }}
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Product Price</FormLabel>
                <TextField id="productPrice" name="productPrice" size="small" fullWidth value={formik.values.productPrice} disabled />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Discount</FormLabel>
                <TextField
                  id="discount"
                  name="discount"
                  size="small"
                  fullWidth
                  type="number"
                  value={formik.values.discount}
                  onChange={(e) => {
                    const discount = parseFloat(e.target.value) || 0;
                    if (discount <= formik.values.totalPrice) {
                      formik.setFieldValue('discount', discount);
                    } else {
                      toast.warning('Discount cannot be greater than total price');
                    }
                  }}
                  error={formik.touched.discount && Boolean(formik.errors.discount)}
                  helperText={formik.touched.discount && formik.errors.discount}
                />
              </Grid>

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
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DialogContentText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={formik.handleSubmit} variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>
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
  );
};

export default ProductAdd;
