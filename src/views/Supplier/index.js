import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs, Link } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import ProductAdd from './ProductAdd';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { urls } from 'views/Api/constant.js';
import { getApi } from 'views/Api/comman.js';



const Supplier = () => {
  const [supplier, setSupplier] = useState([]);

  const fetchSupplier = async () => {
    const response = await getApi(urls.company.get);
    setSupplier(response?.data?.data);
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'companyName',
      headerName: 'Company Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone NUmber',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },

    {
      field: 'description',
      headerName: 'Description',
      flex: 1
    },
    {
      field: 'companyType',
      headerName: 'Company Type',
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              params.value === 'Regular'
                ? '#60383e'
                : params.value === 'Premium'
                ? '#1b2ec7'
                : params.value === 'Business'
                ? '#b03e10'
                : '',
            width: '100px',
            textAlign: 'center',
            padding: '6px',

            '&:hover': {
              backgroundColor:
                params.value === 'Regular'
                  ? '#60383e'
                  : params.value === 'Premium'
                  ? '#1b2ec7'
                  : params.value === 'Business'
                  ? '#b03e10'
                  : ''
            }
          }}
        >
          {params.value}
        </Button>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              params.value === 'Active' ? 'green' : params.value === 'Inactive' ? '#471a7b' : params.value === 'Blocked' ? '#b03e10' : '',
            width: '100px',
            textAlign: 'center',

            '&:hover': {
              backgroundColor:
                params.value === 'Active' ? 'green' : params.value === 'Inactive' ? '#471a7b' : params.value === 'Blocked' ? '#b03e10' : ''
            },

            '&:focus': {
              outline: 'none',
              border: 'none'
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
      <ProductAdd open={openAdd} handleClose={handleCloseAdd} fetchSupplier={fetchSupplier} />

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
                Supplier-Information
              </Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  Supplier Information
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
                rows={supplier}
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

export default Supplier;
