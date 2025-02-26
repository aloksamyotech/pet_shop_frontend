import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getApi, postApi, updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import ClearIcon from '@mui/icons-material/Clear';

const PurchaseForm = ({ open, handleClose, purchase, fetchPurchase }) => {
  const [product, setProduct] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCompany();
  }, []);

  useEffect(() => {
    if (purchase) {
      formik.setValues({
        productId: purchase.productId?._id || '',
        companyId: purchase.companyId?._id || '',
        quantity: purchase.quantity || '',
        totalPrice: purchase.totalPrice || '',
        discount: purchase.discount || '0',
        paymentStatus: purchase.paymentStatus || 'Pending',
        productPrice: purchase.productPrice || '',
      });
    }
  }, [purchase]);

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
    setProduct(response?.data?.data || []);
  };

  const fetchCompany = async () => {
    const response = await getApi(urls.company.get);
    setCompany(response?.data?.data || []);
  };

  const validationSchema = yup.object({
    productId: yup.string().required('Product Name is required'),
    companyId: yup.string().required('Company is required'),
    quantity: yup
      .number()
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer')
      .required('Quantity is required')
      .max(1000, "Max 1000 quantity allowed"),
    totalPrice: yup.number().positive('Total Price must be greater than 0').required('Total Price is required'),
    discount: yup.number().integer('Discount must be an integer'),
    paymentStatus: yup.string().required('Payment Status is required'),
    productPrice: yup.number().positive('Product Price must be a positive number').required('Product Price is required'),
  });

  const initialValues = {
    productId: '',
    companyId: '',
    quantity: '',
    totalPrice: '',
    discount: '0',
    paymentStatus: 'Pending',
    productPrice: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (purchase) {
         
          await updateApi(urls.purchase.update.replace(':id', purchase._id), values);
          toast.success('Purchase updated successfully!');
        } else {
       
          await postApi(urls.purchase.create, values);
          toast.success('Purchase added successfully!');
        }
        await fetchPurchase();
        handleClose();
      } catch (error) {
        toast.error("Failed to save purchase.");
      }
    },
  });

  useEffect(() => {
    const selectedProduct = product.find(p => p._id === formik.values.productId);
    const productPrice = selectedProduct ? selectedProduct.price : 0;
    const totalPrice = Math.max((formik.values.quantity * productPrice) - formik.values.discount, 0);

    formik.setFieldValue('productPrice', productPrice);
    formik.setFieldValue('totalPrice', totalPrice);
  }, [formik.values.productId, formik.values.quantity, formik.values.discount, product]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="purchase-dialog-title">
      <DialogTitle id="purchase-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{purchase ? 'Edit Purchase' : 'Add Purchase'}</Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                {product.map(p => (
                  <MenuItem key={p._id} value={p._id}>{p.productName}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>Company</FormLabel>
              <Select
                id="companyId"
                name="companyId"
                size="small"
                fullWidth
                value={formik.values.companyId}
                onChange={formik.handleChange}
                error={formik.touched.companyId && Boolean(formik.errors.companyId)}
              >
                {company.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.companyName}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>Quantity</FormLabel>
              <TextField
                id="quantity"
                name="quantity"
                size="small"
                fullWidth
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.errors.quantity}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>Discount</FormLabel>
              <TextField
                id="discount"
                name="discount"
                size="small"
                fullWidth
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.errors.discount}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
          {purchase ? 'Update' : 'Save'}
        </Button>
        <Button onClick={() => { formik.resetForm(); handleClose(); }} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseForm;
