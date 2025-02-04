import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Button, Stack, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import ViewProduct from './ViewProduct.js';
import AddLead from './AddProduct.js';
import AddBulkUpload from './productBulkUpload.js';
import AddEdit from './Edit.js';
import { getApi, deleteApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Lead = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [productUpdated, setProductUpdated] = useState(null);

  const fetchProducts = async () => {
    const response = await getApi(urls.product.get);
    setProducts(response?.data?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleClick = () => navigate('/dashboard/default');

  const handleView = (product) => {
    setSelectedProduct(product);
    setOpenView(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteApi(urls.product.delete.replace(':id', id));
          setProducts((prev) => prev.filter((product) => product._id !== id));
          Swal.fire('Removed!', 'The Product has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete Product.', 'error');
        }
      }
    });
  };

  const handleUpdate = (product) => {
    setProductUpdated(product);
    setOpenEdit(true);
  };

  return (
    <>
   
      <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} fetchProduct={fetchProducts} product={productUpdated} />
      <ViewProduct open={openView} handleClose={() => setOpenView(false)} product={selectedProduct} />
      <AddBulkUpload open={open} handleClose={() => setOpen(false)} fetchProduct={fetchProducts} />
      <AddLead open={openAdd} handleClose={() => setOpenAdd(false)} fetchProduct={fetchProducts} />

      
      <Stack direction="row" alignItems="center" mb={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HomeIcon sx={{ color: '#2067db', cursor: 'pointer' }} onClick={handleClick} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Product Management</Typography>
        </Box>
        <Stack direction="row" alignItems="center" ml="auto" spacing={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>Bulk Upload</Button>
          <Button variant="contained" onClick={() => setOpenAdd(true)}>Add Product</Button>
        </Stack>
      </Stack>

     
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, '&:hover': { boxShadow: 5 } }}>
              
              <CardMedia
                component="img"
                height="100"
                image={product.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
                alt={product.productName}
                sx={{ objectFit: 'cover', borderRadius: 2 }}
              />

              
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.productName}
                </Typography>
                
               
                <Typography variant="h6" sx={{ color:"#39b2e9", fontWeight: 'bold' }}>
                  Rs.{product.price || 'N/A'}
                </Typography>

              
                <Typography variant="body1" sx={{ color: '#757575', fontSize: '14px' }}>
                  <strong>Stock:</strong> {product.quantity || '0'}
                </Typography>

               
               <Box sx={{ mt: 1 }}>
                    {product.category.map((cat, index) => (
                      <Chip
                        key={index}
                        label={cat.name}
                        sx={{
                          backgroundColor: '#419737',
                          color: 'white',
                          fontSize: '12px',
                          mr: 1
                        }}
                      />
                    ))}
                  </Box>
            
              </CardContent>

            
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton onClick={() => handleView(product)}>
                  <VisibilityIcon sx={{ color: '#00bbff' }} />
                </IconButton>
                <IconButton onClick={() => handleUpdate(product)}>
                  <EditIcon sx={{ color: '#5f0497' }} />
                </IconButton>
                <IconButton onClick={() => handleDelete(product._id)}>
                  <DeleteIcon sx={{ color: '#d32f2f' }} />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Lead;
