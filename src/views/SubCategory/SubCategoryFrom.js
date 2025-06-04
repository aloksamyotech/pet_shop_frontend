import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography, Select, MenuItem, FormLabel, Autocomplete } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApi, updateApi, getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { options } from 'numeral';
const CategoryForm = ({ open, handleClose, category, fetchCategories }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const isEditing = Boolean(category);

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
    setCategories(response?.data?.data || []);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t( "name_required"))
      .matches(/^[A-Za-z\s]+$/, t('Only letters allowed'))
      .max(50, t('Max 50 characters')),
    description: yup.string().max(100, t('Max 100 characters')),
    categoryId: yup.string().required(t('Category is required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditing) {
          await updateApi(urls.Subcategory.update.replace(':id', category._id), values);
          toast.success(t('SubCategory updated successfully!'));
        } else {
          await postApi(urls.Subcategory.create, values);
          toast.success(t('SubCategory added successfully!'));
        }
        formik.resetForm();
        await fetchCategories();
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        toast.error(isEditing ? t('Error updating category') : t('Category already exists'));
      }
    },
  });

  useEffect(() => {
    if (category) {
      formik.setValues({
        name: category?.name || '',
        description: category?.description || '',
        categoryId: category?.categoryId || '',
      });
    }
  }, [category]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="category-dialog-title">
      <DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{isEditing ? t('Edit Category') : t('Add SubCategory')}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel>{t('SubCategory Name')}</FormLabel>
              <TextField
                id="name"
                name="name"
                fullWidth
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
 
            <Grid item xs={12}>
                    <Autocomplete
  id="categoryId"
  options={categories}
  getOptionLabel={(option) => option.name}
  value={categories.find((cat) => cat._id === formik.values.categoryId) || null}
  onChange={(event, newValue) => {
    formik.setFieldValue('categoryId', newValue ? newValue._id : '');
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      name="categoryId"
      label="Select Category"
      size="small"
      fullWidth
      error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
      helperText={formik.touched.categoryId && formik.errors.categoryId}
    />
  )}
/>

            </Grid>

            <Grid item xs={12}>
              <FormLabel>{t('Description')}</FormLabel>
              <TextField
                id="description"
                name="description"
                fullWidth
                size="small"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          onClick={formik.handleSubmit}
          sx={{ backgroundColor: '#6A9C89', color: '#ffff', '&:hover': { backgroundColor: '#8DB3A8' } }}
        >
          {isEditing ? t('Update') : t('Save')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
          sx={{ border: '1px solid #6A9C89', color: '#6A9C89', '&:hover': { border: '1px solid #6A9C89', color: '#6A9C89' } }}
        >
          {t('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
