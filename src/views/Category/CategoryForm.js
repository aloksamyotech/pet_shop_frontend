import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApiImage, updateApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const CategoryForm = ({ open, handleClose, category, fetchCategories }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const isEditing = Boolean(category);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('name_required'))
      .matches(/^[A-Za-z\s]+$/, t('only_letters_allowed'))
      .max(50, t('max_50_characters')),
    description: yup.string().max(100, t('max_100_characters'))
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryImage: null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);

      if (!isEditing && values.categoryImage) {
        formData.append('categoryImage', values.categoryImage);
      }

      try {
        if (isEditing) {
          await updateApi(urls.category.update.replace(':id', category._id), values);
          toast.success(t('category_updated_successfully'));
        } else {
          await postApiImage(urls.category.create, formData);
          toast.success(t('category_added_successfully'));
        }
        formik.resetForm();
        await fetchCategories();
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        toast.error(isEditing ? t('error_updating_category') : t('category_already_exists'));
      }
    }
  });

  useEffect(() => {
    if (category) {
      formik.setValues({
        name: category?.name || '',
        description: category?.description || '',
        categoryImage: null
      });
      setSelectedImage(category?.categoryImage || null);
    }
  }, [category]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('categoryImage', file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="category-dialog-title">
      <DialogTitle id="category-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{isEditing ? t('edit_category') : t('add_category')}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label={t('category_name')}
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
