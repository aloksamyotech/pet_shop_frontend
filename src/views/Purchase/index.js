import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs, Link } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import ProductAdd from './PrurchaseAdd.js';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';


const Purchase = () => {
  const [purchase, setPurchase] = useState([]);

  const fetchPurchase = async () => {
    const response = await getApi(urls.purchase.get);
    console.log(response)
    setPurchase(response?.data?.data);
    
  };

  useEffect(() => {
    fetchPurchase();
  }, []);

  const navigate = useNavigate();

  const home= () => {
    navigate('/dashboard/default');
  };

  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      valueGetter: (params) => {
       
       console.log("priti",params.row.productName[0].productName)
         return params.row.productName[0].productName
        ;
       
      }
    },

    {
      field: 'totalPrice',
      headerName: 'Amount',
      flex: 1,
      editable: false, 
      
},
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1,

     
      
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              params.value === 'Success' ? '#7011bc' : params.value === 'Pending' ? '#12aae8' : params.value === 'Failed' ? '#FF5733' : '',
            width: '100px',
            textAlign: 'center',
            padding: '6px ',

            '&:hover': {
              backgroundColor:
                params.value === 'Success' ? '#7011bc' : params.value === 'Pending' ? '#12aae8' : params.value === 'Failed' ? '#FF5733' : ''
            }
          }}
        >
          {params.value}
        </Button>
      )
    }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <ProductAdd open={openAdd} handleClose={handleCloseAdd} fetchPurchase={fetchPurchase} />

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
            <HomeIcon sx={{ color: '#5E35B1' }} onClick={home} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Purchase-Information
              </Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  New Purchase 
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>
        |
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-45px' }}>
              <DataGrid
                rows={purchase}
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

export default Purchase;
