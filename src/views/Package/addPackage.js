import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApiImage, updateApi,postApiRegistration } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const CategoryForm = ({ open, handleClose, category, fetchCategories }) => {
  const { t } = useTranslation();
  const isEditing = Boolean(category);

  

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('name_required'))
      .matches(/^[A-Za-z\s]+$/, t('only_letters_allowed'))
      .max(50, t('max_50_characters')),
  
      description: yup
      .string()
      .required(t('description_required'))
      .test('max-words', t('max_20_words'), function (value) {
        if (!value || !value.trim()) return false;
        return value.trim().split(/\s+/).length <= 20;
      }),
    
  
    price: yup
      .string() 
      .required(t('price_required'))
  });
  
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);

    try {
        if (isEditing) {
          await updateApi(urls.package.update.replace(':id', category._id), values);
          toast.success("Package is Updated successfully");
        } else {
          await postApiRegistration(urls.package.create, formData);
          toast.success("Package is add successfully");
        }
        formik.resetForm();
        await fetchCategories();
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        toast.error(isEditing ? t('error_updating_package') : t('category_already_exists'));
      }
    }
  });

  useEffect(() => {
    if (category) {
      formik.setValues({
        name: category?.name || '',
        description: category?.description || '',
        price:category?.price || ''
        
      });
    
    }
  }, [category]);

 

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="category-dialog-title">
      <DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{isEditing ? "Edit Package" :"Add Package"}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                size="small"
                value={formik.values.name}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '');
                  formik.setFieldValue('name', onlyLetters);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label={t('description')}
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
            <Grid item xs={12}>
            <TextField
  id="price"
  name="price"
  label={t('price')}
  fullWidth
  size="small"
  value={formik.values.price}
  onChange={(e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    formik.setFieldValue('price', onlyNumbers);
  }}
  error={formik.touched.price && Boolean(formik.errors.price)}
  helperText={formik.touched.price && formik.errors.price}
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
          sx={{
            backgroundColor: '#6A9C89',
            color: '#ffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}
        >
          {isEditing ? t('update') : t('save')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
          sx={{
            border: '1px solid #6A9C89',
            color: '#6A9C89',
            '&:hover': {
              border: '1px solid #6A9C89',
              color: '#6A9C89'
            }
          }}
        >
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
