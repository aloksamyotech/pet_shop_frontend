import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, MenuItem, Select, TextField, Box } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import { getApi, postApi ,postApiImage} from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const AddLead = (props) => {
  const { open, handleClose, fetchProduct } = props;

  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj.currencySymbol;

  const fetchCategory = async () => {
    const response = await getApi(urls.category.get);
 setCategories(response?.data?.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const validationSchema = yup.object({
    productName: yup
      .string()
      .required('Product Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Product Name must only contain letters')
      .max(50 , "product name cannot be more then 50 letter"),

    categoryId: yup.string().required('category  is required'),

    price: yup.number().required('Price is required').max(1000000,"product price less then 1000000"),

    discount: yup.number()
       .integer('discount must be an integer'),
   
  });

  const initialValues = {
    productName: '',
    categoryId: '',
    price: '',
    discount: '0',
  
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
      
      if (values.image) {
        console.log("image",values)
        formData.append('image', values.image);
      }
    
    
      try {
      const response = await postApiImage(urls.product.create, formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                });
        fetchProduct(); 
        formik.resetForm();
        setSelectedImage(null);
        handleClose();
        toast.success('Product added successfully');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      }
    }
  });

 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  formik.setFieldValue('image', file);
    setSelectedImage(file);
  };



  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fetchProduct={fetchProduct}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4">Add Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography variant="h5" style={{ marginBottom: '65px' }}>
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} style={{ marginBottom: '15px' }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}></Grid>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
  <FormLabel>Product Name</FormLabel>
  <TextField
    id="productName"
    name="productName"
    type="text"
    size="small"
    fullWidth
    value={formik.values.productName}
    onChange={formik.handleChange}
    onInput={(e) => {
      const regex = /^[A-Za-z\s]*$/; 
      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); 
      }
      formik.setFieldValue("productName", e.target.value);
    }}
    error={formik.touched.productName && Boolean(formik.errors.productName)}
    helperText={formik.touched.productName && formik.errors.productName}
  />
</Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Category</FormLabel>
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

                <Grid item xs={12} sm={6} md={6}>
  <FormLabel>Product Price ({currencySymbol})</FormLabel>
  <TextField
    id="price"
    name="price"
    size="small"
    fullWidth
    value={formik.values.price}
    onChange={(e) => {
      const onlyNumbers = e.target.value.replace(/[^0-9]/g, ""); // Keep numbers, strip everything else
      formik.setFieldValue("price", onlyNumbers);
    }}
    error={formik.touched.price && Boolean(formik.errors.price)}
    helperText={formik.touched.price && formik.errors.price}
  />
</Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Discount ({currencySymbol})</FormLabel>
                    <TextField
                      id="discount"
                      name="discount"
                      size="small"
                      fullWidth
                      value={formik.values.discount}
                      onChange={(e) =>{ 
                        const discountPrices = parseFloat(e.target.value) || 0
                        if(discountPrices < formik.values.price){
                          formik.setFieldValue('discount',discountPrices)
                        }
                        else{
                          toast("discount less then Product")
                        }
                      }

                      }
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
                    {formik.values.image ? (
                      <img src={URL.createObjectURL(formik.values.image)} alt="product" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Preview Image
                      </Typography>
                    )}
                    <Box position="absolute" left={0} bottom={0} p={2}>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange} 
                        style={{ display: 'block' }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit"  sx={{
            backgroundColor: '#6A9C89',
            color: '#ffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}>
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              setSelectedImage(null);
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
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLead;
