/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box,Grid,Breadcrumbs,Link} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';

import ProductAdd from './ProductAdd'
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urls } from 'views/Api/constant.js';
import { getApi } from 'views/Api/comman.js';


// ----------------------------------------------------------------------


const Supplier = () => {
 

  const [supplier, setSupplier] = useState([])
  
  
  const fetchSupplier = async () => {
         
         const response = await getApi(urls.company.get )
         console.log(response.data);
         setSupplier(response?.data?.data);
       };

  useEffect(() => {
    fetchSupplier();
  }, []);

const navigate = useNavigate(); 

  const handleClick = () =>{
    navigate('/dashboard/default');
  }



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
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
    


  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <ProductAdd open={openAdd} handleClose={handleCloseAdd} />
      
      <Grid>
      <Stack direction="row" alignItems="center" mb={5} >
          <Box sx={{backgroundColor:'white', height:'50px' ,width:'100%' ,display:'flex',borderRadius :'10px',justifyContent:'space-between',alignItems:'center',padding:'0 25px',marginTop:'-7px'}}>
            <Breadcrumbs aria-label="breadcrumb">
            <HomeIcon sx={{color:'#2067db'}} fontSize="medium" onClick={handleClick}/>
          <Typography variant="h5" sx={{fontWeight:'600px',color:'black'}}>Supplier-Information</Typography>
          </Breadcrumbs>
         
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
          <Card >
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size='small'>
              Supplier Information
            </Button>
            </Card>
          </Stack>
          </Box>
        </Stack>
|     

   <TableStyle>
          <Box width="100%" >
            <Card style={{ height: '600px' , marginTop:'-45px'}}>
              <DataGrid
                rows={supplier}
                columns={columns}
                checkboxSelection
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
