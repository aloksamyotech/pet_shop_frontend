/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Link as MuiLink } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, Link } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import AddDetail from './AddDetail';

const Customer = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);

  const demoData = [
    { id: 1, name: 'Harsh', email: 'Harsh@gmail.com', startDate: '12/23/2024', phoneNumber: '63789238823', relatedTo: 'Buyer' },

    { id: 2, name: 'Lucky', email: 'Lucky@gmail.com', startDate: '12/23/2024', phoneNumber: '63789238823', relatedTo: 'Buyer' },

    { id: 3, name: 'Kush', email: 'Kush@gmail.com', startDate: '12/23/2024', phoneNumber: '63789238823', relatedTo: 'Buyer' }
  ];

  const handleView = (id) => {
    navigate(`/dashboard/customer/user/${id}`);
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },

    {
      field: 'startDate',
      headerName: ' Start Date',
      flex: 1
    },

    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'relatedTo',
      headerName: 'Related To',
      flex: 1
    },
    {
      field: 'Action',
      headerName: 'Action ',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton>
          <VisibilityIcon onClick={() => handleView(params.row?.id)}/>
        </IconButton>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
      <AddDetail open={openAdd} handleClose={handleCloseAdd} />
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
              <MuiLink component={Link} to="/dashboard/default" color="inherit">
                <HomeIcon sx={{ color: '#5E35B1' }} />
              </MuiLink>
              <Typography variant="h5">Customer</Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  New Customer
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-27px' }}>
              <DataGrid
                rows={demoData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
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
