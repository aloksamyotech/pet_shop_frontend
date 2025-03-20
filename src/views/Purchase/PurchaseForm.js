import React, { useEffect, useState } from 'react';
import {
  Button,Box,
  Dialog,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Autocomplete
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getApi, postApi, updateApi,postApiImage } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import ClearIcon from '@mui/icons-material/Clear';

const PurchaseForm = ({ open, handleClose, purchase, fetchPurchase ,currencySymbol}) => {
  const [product, setProduct] = useState([]);
  const [company, setCompany] = useState([]);
 const [selectedImage, setSelectedImage] = useState(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('PurchaseImage', file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

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

        price:purchase.price || '',
      });
    } else {
      formik.resetForm();
    }
  }, [purchase, open]);

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
      .max(10000, 'Max 10000 quantity allowed'),
    totalPrice: yup.number().positive('Total Price must be greater than 0').required('Total Price is required'),
    discount: yup
      .number()
      .integer('Discount must be an integer')
      .min(0, 'Discount cannot be negative')
      .test('discount-check', 'Discount cannot be more than the total amount', function (value) {
        const { quantity, productId } = this.parent;
        const selectedProduct = product.find((p) => p._id === productId);
        const productPrice = selectedProduct ? selectedProduct.price : 0;
        const totalAmount = quantity * productPrice;
        return value <= totalAmount;
      }),
    paymentStatus: yup.string().required('Payment Status is required'),
    price: yup.number().positive('Product Price must be a positive number').required('Product Price is required')

  });
  

  const initialValues = {
    productId: '',
    companyId: '',
    quantity: '',
    totalPrice: '',
    discount: '0',
    paymentStatus: 'Pending',
 
    price:''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  

    
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('productId', values.productId);
      formData.append('companyId', values.companyId);
      formData.append('discount', values.discount);
      formData.append('paymentStatus', values.paymentStatus);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('totalPrice', values.totalPrice);
      formData.append('PurchaseImage', values.PurchaseImage);
      try {
        if (purchase) {
          await updateApi(urls.purchase.update.replace(':id', purchase._id), values);
          toast.success('Purchase updated successfully!');
        } else {
          await postApiImage(urls.purchase.create, formData);
          toast.success('Purchase added successfully!');
        }
        await fetchPurchase();
        handleClose();
      } catch (error) {
        toast.error('Failed to save purchase.');
      }
    }
  });

  const selectedProduct = product.find((p) => p._id === formik.values.productId);
    const productPrice = selectedProduct ? selectedProduct.price : 0;
    const Amount = Math.max(formik.values.quantity * productPrice - formik.values.discount, 0);


  useEffect(() => {
    const selectedProduct = product.find((p) => p._id === formik.values.productId);
   
    const totalPrice = Math.max(formik.values.price * formik.values.quantity - formik.values.discount, 0);
    formik.setFieldValue('totalPrice', totalPrice);
  

    // formik.setFieldValue('productPrice', productPrice);
    // formik.setFieldValue('totalPrice', totalPrice);
  }, [formik.values.price, formik.values.quantity, formik.values.discount]);

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
              <Autocomplete
                id="productId"
                options={product}
                getOptionLabel={(option) => option.productName || ''}
                value={product.find((p) => p._id === formik.values.productId) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('productId', newValue ? newValue._id : '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    error={formik.touched.productId && Boolean(formik.errors.productId)}
                    helperText={formik.touched.productId && formik.errors.productId}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>Supplier</FormLabel>
              <Autocomplete
                id="companyId"
                options={company}
                getOptionLabel={(option) => option.companyName || ''}
                value={company.find((c) => c._id === formik.values.companyId) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('companyId', newValue ? newValue._id : '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    error={formik.touched.companyId && Boolean(formik.errors.companyId)}
                    helperText={formik.touched.companyId && formik.errors.companyId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Product Price ({currencySymbol})</FormLabel>
              <TextField
                id="price"
                name="price"
                size="small"
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.errors.price}
              />
            </Grid>

       <Grid item xs={12} sm={6}>
  <FormLabel>Quantity</FormLabel>
  <TextField
    id="quantity"
    name="quantity"
    size="small"
    fullWidth
    value={formik.values.quantity}
    onChange={(e) => {
     
      const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
      formik.setFieldValue('quantity', onlyNumbers);
    }}
    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
    helperText={formik.touched.quantity && formik.errors.quantity}
    InputProps={{
      style: {
        color: formik.touched.quantity && formik.errors.quantity ? 'red' : 'inherit',
      },
    }}
  />
</Grid>



            <Grid item xs={12} sm={6}>
              <FormLabel>Discount  ({currencySymbol})</FormLabel>
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
            <Grid item xs={12} sm={6}>
              <FormLabel>Total Amount ({currencySymbol})</FormLabel>
              <TextField
                id="totalPrice"
                name="totalPrice"
                size="small"
                fullWidth
                value={formik.values.totalPrice}
                onChange={formik.handleChange}
                error={formik.touched.totalPrice && Boolean(formik.errors.totalPrice)}
                helperText={formik.errors.totalPrice}
              />
            </Grid>
             
                          <Grid item xs={12} sm={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              minHeight="100px"
                              border={1}
                              borderColor="grey.300"
                              borderRadius={1}
                              position="relative"
                            >
                              {selectedImage ? (
                                <img src={selectedImage} alt="category preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                              ) : (
                                <Typography variant="body2" color="textSecondary">
                                  Preview Image
                                </Typography>
                              )}
                              <Box position="absolute" left={0} bottom={0} p={2}>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                              </Box>
                            </Box>
                          </Grid>
                        
            
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={formik.handleSubmit} variant="contained"   sx={{
            backgroundColor: '#6A9C89',
            color: '#ffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}>
          {purchase ? 'Update' : 'Save'}
        </Button>
        <Button
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
          variant="outlined"
          sx={{
            border: '1px solid #6A9C89',
            color: '#6A9C89',
            '&:hover': {
              border: '1px solid #6A9C89',
              color: '#6A9C89'
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseForm;
