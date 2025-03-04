import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApiImage, updateApi ,updateApiFormData} from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';

const CategoryForm = ({ open, handleClose, category, fetchCategories }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const isEditing = Boolean(category);



  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(20, 'Max 20 characters'),
    description: yup.string().max(100, 'Max 100 characters')
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
    
     
    
     
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    
      try {
        if (isEditing) {
          await updateApi(urls.category.update.replace(':id', category._id), values);
          toast.success('Category updated successfully!');
        } else {
          await postApiImage(urls.category.create, formData);
          toast.success('Category added successfully!');
        }
    
        await fetchCategories();
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        toast.error(isEditing ? 'Error updating category' : 'Category already exists');
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
        <Typography variant="h4">{isEditing ? 'Edit Category' : 'Add Category'}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Category Name"
                fullWidth
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                size="small"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="200px"
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
        <Button type="submit" variant="contained" color="secondary" onClick={formik.handleSubmit}>
          {isEditing ? 'Update' : 'Save'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
