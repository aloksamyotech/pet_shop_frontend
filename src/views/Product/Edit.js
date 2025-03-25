import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  DialogContentText,
  MenuItem,
  FormControl,
  FormLabel,
  Select
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi, updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useState } from 'react';

const AddEdit = (props) => {
  const { open, handleClose, product, fetchProduct } = props;
  const [categories, setCategories] = useState([]);
const [subcategories, setSubCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const validationSchema = yup.object({
    productName: yup
      .string()
      .required('Product Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Product Name must only contain letters')
      .max(50, 'product name cannot be more then 50 letter'),

    categoryId: yup.string().required('category  is required'),

    price: yup.number().required('Price is required').max(1000000, 'product price less then 1000000'),

    discount: yup.number().integer('discount must be an integer'),
    SubCategoryId:yup.string().required('subcategory   is required'),
  });

  const initialValues = {
    productName: '',
    categoryId: '',
    price: '',
    discount: '0',
    SubCategoryId:''
  };
  const formik = useFormik({
    
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('productName', values.productName);
      formData.append('categoryId', values.categoryId);
      formData.append('price', values.price);
      formData.append('discount', values.discount);
      formData.append('SubCategoryId',values.SubCategoryId);

     if (values.image) {
      
        formData.append('image', values.image);
      }
      await updateApi(urls.product.update.replace(':id', product._id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('product updated successfully!');
      await fetchProduct();
      await handleClose();
    }
  });

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
    setCategories(response?.data?.data);
  };
  const fetchSubCategory = async () => {
    const response = await getApi(urls.Subcategory.get);
    setSubCategories(response?.data?.data);
  };



  useEffect(() => {
    if (product) {
      formik.setValues({
        productName: product?.productName || '',
        description: product?.description || '',
        price: product?.price || '',
        categoryId: product?.categoryId || '',
        discount: product?.discount || '',
        SubCategoryId: product?.SubCategoryId || '',
        image: product?.imageUrl || null  
      });
    
      setSelectedImage(product?.imageUrl || null);  
    }
    

   fetchCategory();
    fetchSubCategory();
  }, [product, open]);


 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('image', file); 
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  


  useEffect(() => {
    return () => {
      if (selectedImage && selectedImage.startsWith('blob:')) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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
          <Typography variant="h4">Updated Product</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography variant="h6" style={{ marginBottom: '65px' }}>
                Product Information
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
                      PaperProps: {
                        style: {
                          maxHeight: 200
                        }
                      }
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
                  <FormLabel> Sub Category</FormLabel>
                  <Select
                    id="SubCategoryId"
                    name="SubCategoryId"
                    size="small"
                    fullWidth
                    value={formik.values.SubCategoryId} 
                    onChange={formik.handleChange}
                    error={formik.touched.SubCategoryId && Boolean(formik.errors.SubCategoryId)}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200
                        }
                      }
                    }}
                  >
                    {Array.isArray(subcategories) &&
                      subcategories.map((category) => (
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
                    <FormLabel>Discount</FormLabel>
                    <TextField
                      id="discount"
                      name="discount"
                      size="small"
                      fullWidth
                      value={formik.values.discount}
                      onChange={(e) => {
                        const discountPrices = parseFloat(e.target.value) || 0;
                        if (discountPrices < formik.values.price) {
                          formik.setFieldValue('discount', discountPrices);
                        } else {
                          toast('discount less then Product');
                        }
                      }}
                      error={formik.touched.discount && Boolean(formik.errors.discount)}
                      helperText={formik.touched.discount && formik.errors.discount}
                    />
                  </FormControl>
                </Grid>
                  <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
                  <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  minHeight="200px"
  border={1}
  borderColor="grey.300"
  borderRadius={1}
  bgcolor="background.paper"
  position="relative"
>
  {selectedImage ? ( // Use selectedImage, not formik.values.image
    <img src={selectedImage} alt="category preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  ) : (
    <Typography variant="body2" color="textSecondary">
      Preview Image
    </Typography>
  )}
  <Box position="absolute" left={0} bottom={0} p={2}>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleFileChange}
      style={{ display: 'block' }}
    />
  </Box>
</Box>

                                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit"    sx={{ backgroundColor: '#6A9C89',
            color: '#ffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}>
            Update
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
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
    </div>
  );
};

export default AddEdit;
