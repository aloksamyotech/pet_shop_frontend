import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import {Dialog,DialogActions,DialogContent,DialogTitle,Grid, TextField,Button,Box,Typography,DialogContentText,
  MenuItem,FormControl,FormLabel,Select
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi, updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AddEdit = (props) => {
  const { open, handleClose, product, fetchProduct } = props;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj.currencySymbol;

  const { t } = useTranslation();

  const validationSchema = yup.object({
    productName: yup
      .string()
      .required(t('Product Name is required'))
      .matches(/^[A-Za-z\s]+$/, t('Product Name must only contain letters'))
      .max(50, t('product name cannot be more then 50 letter')),
    categoryId: yup.string().required(t('category is required')),
    price: yup.number().required(t('Price is required')).max(1000000, t('product price less then 1000000')),
    discount: yup
      .number()
      .integer(t('discount must be an integer'))
      .test('is-less-than-price', t('Discount must be less than price'), function (value) {
        return value === undefined || value < this.parent.price;
      }),
    SubCategoryId: yup.string().required(t('subcategory is required')),
  });

  const initialValues = {
    productName: '',
    categoryId: '',
    price: '',
    discount: '0',
    SubCategoryId: '',
    image: null
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
      formData.append('SubCategoryId', values.SubCategoryId);
      if (values.image) {
        formData.append('image', values.image);
      }

      await updateApi(urls.product.update.replace(':id', product._id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(t('Product updated successfully!'));
      await fetchProduct();
      handleClose();
    }
  });

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
    setCategories(response?.data?.data || []);
  };

  const fetchSubCategory = async () => {
    const response = await getApi(urls.Subcategory.get);
    setSubCategories(response?.data?.data || []);
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  useEffect(() => {
    if (product) {
      formik.setValues({
        productName: product?.productName || '',
        categoryId: product?.categoryId || '',
        price: product?.price || '',
        discount: product?.discount || '0',
        SubCategoryId: product?.SubCategoryId || '',
        image: product?.imageUrl || null
      });
      setSelectedImage(product?.imageUrl || null);
    }
  }, [product, open]);

  useEffect(() => {
    if (formik.values.categoryId) {
      const relatedSubCategory = subcategories.filter(
        (sub) => sub.categoryId === formik.values.categoryId
      );
      setFilteredSubCategory(relatedSubCategory);

      const isValidSub = relatedSubCategory.some(
        (sub) => sub._id === formik.values.SubCategoryId
      );
      if (!isValidSub) {
        formik.setFieldValue('SubCategoryId', '');
      }
    }
  }, [formik.values.categoryId, subcategories]);

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
    <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{t('Updated Product')}</Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <FormLabel>{t('Product Name')}</FormLabel>
                <TextField
                  id="productName"
                  name="productName"
                  size="small"
                  fullWidth
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  error={formik.touched.productName && Boolean(formik.errors.productName)}
                  helperText={formik.touched.productName && formik.errors.productName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>{t('Category')}</FormLabel>
                <Select
                  id="categoryId"
                  name="categoryId"
                  size="small"
                  fullWidth
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>{t('Sub Category')}</FormLabel>
                <Select
                  id="SubCategoryId"
                  name="SubCategoryId"
                  size="small"
                  fullWidth
                  value={formik.values.SubCategoryId}
                  onChange={formik.handleChange}
                  error={formik.touched.SubCategoryId && Boolean(formik.errors.SubCategoryId)}
                  disabled={!formik.values.categoryId}
                >
                  {filteredSubCategory.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>{t('Product Price')} ({currencySymbol})</FormLabel>
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

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>{t('Discount')} ({currencySymbol})</FormLabel>
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
                  {selectedImage ? (
                    <img src={selectedImage} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      {t('Preview Image')}
                    </Typography>
                  )}
                  <Box position="absolute" left={0} bottom={0} p={2}>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#6A9C89',
            color: '#fff',
            '&:hover': { backgroundColor: '#8DB3A8' }
          }}
        >
          {t('Update')}
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
          {t('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEdit;
