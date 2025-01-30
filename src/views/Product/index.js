import { useState, useEffect } from 'react';

import { Stack, Button, DialogContentText, Typography, Box, Card, Grid, Breadcrumbs,IconButton ,Select,FormControl,MenuItem} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ViewProduct from './ViewProduct.js';
import VisibilityIcon from '@mui/icons-material/Visibility';


import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddProduct.js';
import AddBulkUpload from './productBulkUpload.js';
import { useNavigate } from 'react-router-dom';
import { getApi , deleteApi} from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEdit from './Edit.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';





const Lead = () => {
  const [product, setProduct] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open,setOpen] = useState(false)
  const [openView,setOpenView] = useState(false)
  const [selectedProduct,setSelectedProduct] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [productUpdated,setProductUpdated] = useState(null)

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
  
     setProduct(response?.data?.data);
  };


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
         cancelButtonText: 'Cancel'
       }).then(async (result) => {
         if (result.isConfirmed) {
           try {
             await deleteApi(urls.product.delete.replace(':id', id));
             setProduct((prevProduct) => prevProduct.filter((cat) => cat._id !== id));
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

  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/default');
  };
  
  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'categoryName',
      headerName: 'Category',
      flex: 1,
      valueGetter: (params) => {
      return params.row.category[0].name;
      }
    },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 1
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1
    },
  
    {
      field: 'image',
      headerName: 'Item',
      flex: 1,
      valueGetter: (params) => {
        return params.row.imageUrl;
      },
      renderCell: (params) => {
       
        const imageUrl = params.row.imageUrl;
        
        return (
          <img
            src={imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
            alt="product"
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'cover',
            }}
          />
        );
      },
    }
    , {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon sx={{ color:'#00bbff'}} />
          </IconButton>
        <IconButton onClick={() => handleUpdate(params.row)}>
            <EditIcon sx={{ color:'#5f0497' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </>
      )
    }
    
    
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} fetchProduct={fetchProduct} product={productUpdated} />
    <ViewProduct open={openView} handleClose={() => setOpenView(false)} product={selectedProduct} />
    <AddBulkUpload open={open}  handleClose={handleClose} fetchProduct={fetchProduct}/>

      <AddLead open={openAdd} handleClose={handleCloseAdd} fetchProduct={fetchProduct} />
      <Grid>
        <Stack direction="row" alignItems="center" mb={5}>
          <Box
            sx={{
              backgroundColor: 'white',
              height: '50px',
              width: '100%',
              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 25px',
              marginTop: '-7px'
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <HomeIcon sx={{ color: '#2067db' }} fontSize="medium" onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Product-Management
              </Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen} size="small">
                  BulkUpload
                </Button>
                </Card>
                <Card>

                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  New Product
                </Button>
                </Card>
             
            </Stack>
          </Box>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-27px' }}>
              <DataGrid
                rows={product}
                columns={columns}
                getRowId={(row) => row._id}
                
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Lead;
