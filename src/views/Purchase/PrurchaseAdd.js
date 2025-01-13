import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  FormControl,
  IconButton,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const ProductAdd = (props) => {
  const { open, handleClose, fetchPurchase } = props;
 const [product, setProduct] = useState([]);

  const initialValues = {
    productId: '',
    quantity: '',
    totalPrice: '',
    discount: '',
    paymentStatus: '',
    productPrice: '',
  };

  const validationSchema = yup.object({
    productId: yup.string().required('Product Name is required'),
    quantity: yup
      .number()
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer')
      .required('Quantity is required'),
    totalPrice: yup
      .number()
      .positive('Total Price must be greater than 0   ')
      .required('Total Price is required') , 
    discount: yup.number(),
    paymentStatus: yup.string().required('Payment Status is required'),
    productPrice: yup
      .number()
      .positive('Product Price must be a positive number')
      .required('Product Price is required'),
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
    },
  });

  const calculateAmount = (quantity, discount) => {
    const selectedProduct = product.find((p) => p._id === formik.values.productId);
    const price = selectedProduct ? selectedProduct.price : 0;

    formik.setFieldValue('productPrice', price);
    return price * quantity - (discount);
    
  };

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
    setProduct(response?.data?.data);
  };

  useEffect(() => {
    const  quantity = formik.values.quantity || 1;
    const discount = formik.values.discount ||  0;
    const dataPrice = calculateAmount(quantity, discount);

  formik.setFieldValue('totalPrice', dataPrice);
  }, [formik.values.quantity, formik.values.discount, formik.values.productId]);


  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
      <DialogTitle
        id="scroll-dialog-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Add Product</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
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
                >
                  {Array.isArray(product) &&
                    product.map((products) => (
                      <MenuItem key={products._id} value={products._id}>
                        {products.productName}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Product Price</FormLabel>
                <TextField
                  id="productPrice"
                  name="productPrice"
                  size="small"
                  fullWidth
                  value={formik.values.productPrice}
                  disabled
                  error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
                  helperText={formik.touched.productPrice && formik.errors.productPrice}
                />
              </Grid>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Quantity</FormLabel>
                <TextField
                  id="quantity"
                  name="quantity"
                  size="small"
                  fullWidth
                  value={formik.values.quantity}
                  onChange={(e) => {
                    const data = parseInt(e.target.value, 10) || 0;
                  formik.setFieldValue('quantity', data);
                  }}
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Discount </FormLabel>
                <TextField
                  id="discount" 
                  name="discount"
                  size="small"
                  fullWidth
                  value={formik.values.discount}
                  onChange={(e) => {
                    const discount = parseFloat(e.target.value) || 0;
                formik.setFieldValue('discount', discount);
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
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Amount</FormLabel>
                <TextField
                id="totalPrice"
                  name="totalPrice"
                  size="small"
                  fullWidth
                  value={formik.values.totalPrice}
                  disabled
                  error={formik.touched.totalPrice && Boolean(formik.errors.totalPrice)}
                  helperText={formik.touched.totalPrice && formik.errors.totalPrice}
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
  );
};

export default ProductAdd;
