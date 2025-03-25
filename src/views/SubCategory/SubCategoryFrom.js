import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography,Select,MenuItem,FormLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { postApi, updateApi ,getApi} from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import { toast } from 'react-toastify';


const CategoryForm = ({ open, handleClose, category, fetchCategories }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const isEditing = Boolean(category);
  const [categories, setCategories] = useState([]);


  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
 setCategories(response?.data?.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);




  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(50, 'Max 50 characters'),
    description: yup.string().max(100, 'Max 100 characters'),
     categoryId: yup.string().required('category  is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('categoryId',values.categoryId)

    
      try {
        if (isEditing) {
          await updateApi(urls.Subcategory.update.replace(':id', category._id), values);
          toast.success('Category updated successfully!');
        } else {
          await postApi(urls.Subcategory.create, formData);
          toast.success('Category added successfully!');
        }
        formik.resetForm();
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
        categoryId : category?.categoryId || '',
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
        <Typography variant="h4">{isEditing ? 'Edit Category' : 'Add SubCategory'}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid xs={12} >
              <FormLabel sx={{mb:'1px'}}>SubCategory Name</FormLabel>
              <TextField
                id="name"
                name="name"
                fullWidth
                size="small"
                value={formik.values.name}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '');
                  formik.setFieldValue('name', onlyLetters);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{mb:'6px'}}
              />
              </Grid>
              <Grid item xs={12} sx={{mt:'4px'}} >
                  <FormLabel sx={{mt:'1px'}}>Category</FormLabel>
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
            
            </Grid>

            <Grid item xs={12}>
            <FormLabel>Description</FormLabel>
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

            {/* {!isEditing && (
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
            )} */}
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
          {isEditing ? 'Update' : 'Save'}
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
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
