/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card,Grid ,Breadcrumbs} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddProduct.js';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const leadData = [








  {
    id: 1,
    firstName: 'petter',
    lastName: 'jhon',
    gender: 'male',
    phoneNumber: '9981923587',
    emailAddress: 'ap@samyotech.com',
    action: 'Edit'
  }
];

const Lead = () => {



  const demoData = [
    { id: 1, productName: 'Harsh', productId: '232', type: 'cat', productPrice: '633', discount: '35%' },

    { id: 2, productName: 'Lucky', productId: '765', type: 'Dog', productPrice: '823', discount: '35%' },

    { id: 3, productName: 'Kush', productId: '543', type: 'Food', productPrice: '6233', discount: '35%' }
  ];


  const navigate = useNavigate(); 

  const handleClick = () =>{
    navigate('/dashboard/default');
  }
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'productId',
      headerName: 'Product ID',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'type',
      headerName: ' Product Type',
      flex: 1
    },
    {
      field: 'productPrice',
      headerName: 'Product Price',
      flex: 1
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1
    },
    
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddLead open={openAdd} handleClose={handleCloseAdd} />
      <Grid>
        <Stack direction="row" alignItems="center" mb={5} >
          <Box sx={{backgroundColor:'white', height:'50px' ,width:'100%' ,display:'flex',borderRadius :'10px',justifyContent:'space-between',alignItems:'center',padding:'0 25px',marginTop:'-7px'}}>
            <Breadcrumbs aria-label="breadcrumb">
            <HomeIcon sx={{color:'#2067db'}} fontSize="medium" onClick={handleClick}/>
          <Typography variant="h5" sx={{fontWeight:'600px',color:'black'}}>Product-Mangmant</Typography>
          </Breadcrumbs>
         
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
          <Card >
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size='small'>
              New  Product
            </Button>
            </Card>
          </Stack>
          </Box>
        </Stack>
        
        
        
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop:'-27px' }}>
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
      </Grid>
    </>
  );
};

export default Lead;
