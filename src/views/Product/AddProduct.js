import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import { getApi, postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const AddLead = (props) => {
  const { open, handleClose, fetchProduct } = props;

  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);

    setCategories(response?.data?.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const validationSchema = yup.object({
    productName: yup
      .string()
      .required('Product Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Product Name must only contain letters'),

    categoryId: yup.string().required('category  is required'),

    price: yup.number().required('Price is required').typeError('Price must be a number').positive('Price must be greater than zero'),

    discount: yup.number().typeError('Discount must be a number').max(100, 'Discount cannot exceed 100%')
  });

  const initialValues = {
    productName: '',
    categoryId: '',
    price: '',
    discount: '0'
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await postApi(urls.product.create, values);
      fetchProduct();
      formik.resetForm();
      handleClose();
      toast.success('Product Add successfully');
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fetchProduct={fetchProduct}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography variant="h6" style={{ marginBottom: '65px' }}>
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} style={{ marginBottom: '15px' }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    id="productName"
                    name="productName"
                    type="text"
                    size="small"
                    fullWidth
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    id="categoryId"
                    name="categoryId"
                    size="small"
                    fullWidth
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                    MenuProps={{
                                          PaperProps:{
                                            style:{
                                              maxHeight : 200,
                                            }
                    
                                          }
                                          ,
                    
                                        }}
                  >
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Product Price</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    size="small"
                    fullWidth
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Discount(%)</FormLabel>
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
