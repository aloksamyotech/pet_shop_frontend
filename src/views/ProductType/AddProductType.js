/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getApi } from 'views/Api/comman';
import { useEffect } from 'react';
import { useState } from 'react';
import { urls } from 'views/Api/constant';

import Palette from '../../ui-component/ThemePalette';
import axios from 'axios';
const AddProduct = (props) => {
  const { open, handleClose } = props;

  
// -----------  validationSchema
  const validationSchema = yup.object({
     name: yup
            .string()
            .required('Product Name is required')
            .matches(/^[A-Za-z\s]+$/, 'Product Name must only contain letters'),
        
        description: yup
            .string()
            .required('description is required')
            .matches(/^[A-Za-z\s]+$/, 'Product Type must only contain letters'),
  });

  // -----------   initialValues
  const initialValues = {
  name :'',
  description:'',


  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post("http://localhost:7200/productType/save",values);
     
      toast.success('Product  Add successfully');
      handleClose();
      formik.resetForm();
    }
  });


   
     const [productType, setProductType] = useState([])
    
    const fetchProductType = async () => {
         
         const response = await getApi(urls.category.get )
    
         setProductType(response?.data?.data);
       };
  
    useEffect(() => {
      fetchProductType();
    }, []);

 
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
           
          }}
        >
          <Typography variant="h6">Add New  Product</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Product Details
              </Typography>

              
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Product Name</FormLabel>
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
                    > </TextField>
                   
                  </FormControl>
                  </Grid>
              
             </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
