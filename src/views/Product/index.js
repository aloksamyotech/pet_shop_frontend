import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Box, Card, Grid, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddProduct.js';
import AddBulkUpload from './productBulkUpload.js';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import { WidgetsTwoTone } from '@mui/icons-material';
import { width } from '@mui/system';

const Lead = () => {
  const [product, setProduct] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open,setOpen] = useState(false)

  const fetchProduct = async () => {
    const response = await getApi(urls.product.get);
   
     setProduct(response?.data?.data);
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
              width: '50px',
              height: '50px',
              objectFit: 'cover',
            }}
          />
        );
      },
    }
    
    
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
                Product-Mangmant
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
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Lead;
