import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi,updateApi } from 'views/Api/comman.js';

import { urls } from 'views/Api/constant.js';


const AddEdit = (props) => {
  const { open, handleClose, category,fetchCategories } = props;

  console.log('category',category)
 

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').max(20, 'Name cannot be more than 20 characters'),
    description: yup.string().max(100, 'Description cannot be more than 100 characters'),
  });

  const initialValues = {
    name:'',
    description:''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (category) => {
        updateApi(urls.category.update, category._id);
        fetchCategories()
    },
  });

useEffect(() => {
   
    if (category) {
      formik.setValues({
        name: category?.name || '',
        description: category?.description || '',
      });
    }
  }, [category]);

 

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title">
      <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{category ? 'Edit Category' : 'Add Category'}</Typography>
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
        <Button type="submit" variant="contained" color="secondary" onClick={formik.handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => { formik.resetForm(); handleClose(); }} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEdit;
