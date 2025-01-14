import { useState } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Link as MuiLink } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, Link } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import AddDetail from './addCategory';

import { useEffect } from 'react';
import { urls } from 'views/Api/constant.js';
import { getApi } from 'views/Api/comman.js';

const Customer = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [category, setCategory] = useState([]);

  const handleView = (id) => {
    navigate(`/dashboard/customer/user/${_id}`);
  };

  const home =() =>{
    navigate('/');
  }

  const fetchCategories = async () => {
    const response = await getApi(urls.category.get);

    setCategory(response?.data?.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1
    },
    {
      field: 'Action',
      headerName: 'Action ',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton>
          <VisibilityIcon sx={{ color: '#1d4587' }} onClick={() => handleView(params.row?.id)} />
        </IconButton>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
      <AddDetail open={openAdd} handleClose={handleCloseAdd} fetchCategories={fetchCategories} />
      <Container>
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
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              
              <HomeIcon sx={{ color: '#5E35B1' }} onClick={home} />
              <Typography variant="h5">Category</Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  Add category
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-27px' }}>
              <DataGrid
                rows={category}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Customer;
