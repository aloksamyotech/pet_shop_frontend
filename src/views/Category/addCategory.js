import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, FormLabel, Select, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import axios from 'axios';
import { useState } from 'react';

const AddDetail = (props) => {
  const { open, handleClose, fetchCategories } = props;
  const [selectImage, setSelectedImage] = useState();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(' Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters'),

    description: yup
      .string()
      .required('Description is required')
      .matches(/^[A-Za-z\s]+$/, 'Description must only contain letters')
  });

  const initialValues = {
    name: '',
    description: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);

      if (values.categoryImage) {
        formData.append('categoryImage', values.categoryImage);
      }

      try {
        const response = await postApi(urls.category.create, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchCategories();
        formik.resetForm();
        handleClose();
        toast.success('Category added successfully');
      } catch (error) {
        console.error('Error adding category:', error);
        toast.error('Failed to add category');
      }
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('categoryImage', file);
    setSelectedImage(file);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
          }}
        >
          <Typography variant="h6">Add Category</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel>Name</FormLabel>
                    <TextField
                      id="name"
                      name="name"
                      size="small"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel>Description</FormLabel>
                    <TextField
                      id="description"
                      name="description"
                      size="small"
                      fullWidth
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
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
                    position="relative"
                  >
                    {formik.values.categoryImage ? (
                      <img
                        src={URL.createObjectURL(formik.values.categoryImage)}
                        alt="category"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Preview Image
                      </Typography>
                    )}
                    <Box position="absolute" left={0} bottom={0} p={2}>
                      <input type="file" name="categoryImage" accept="image/*" onChange={handleFileChange} style={{ display: 'block' }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
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
    </div>
  );
};

export default AddDetail;
