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
import { FormControl, FormHelperText, FormLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import { useEffect } from 'react';
import { useState } from 'react';
import { urls } from 'views/Api/constant.js';
import { postApi } from 'views/Api/comman.js';

const AddDetail = (props) => {
  const { open, handleClose, fetchCategories } = props;
  

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(' Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters'),

    description: yup
      .string()
      .required('Description is required')
      .matches(/^[A-Za-z\s]+$/, 'description must only contain letters')
  });

  
  const initialValues = {
    name: '',
    description: ''
  };

  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
     await postApi(urls.category.create , values);
      await fetchCategories();
      formik.resetForm();
      handleClose();
      toast.success('Category Add successfully');
    }
  });






  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add category</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form> 
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
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
