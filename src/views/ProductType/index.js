/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box,Grid,Breadcrumbs,Link} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';

import AddPolicy from './AddProductType';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const policyData = [
  {
    id: 1,
    productId: '',
    productType: '',
    Date: '',
    paymentType:'',
    parsonName:'',
    premiumPayments:'',
    
    
  }
];
const PolicyManagement = () => {
  const demoData = [
    { id: 1, parsonName: 'Harsh', productId: '232', productType: 'cat', productPrice: '633', Date: '12/27/2024' ,paymentType : 'online',premiumPayments:'1 Month'},

    { id: 2, parsonName: 'Lucky', productId: '765', productType: 'Dog', productPrice: '823', Date: '12/27/2024', paymentType : 'offline',premiumPayments:'1 year'},

    { id: 3, parsonName: 'Kush', productId: '543', productType: 'Food', productPrice: '6233', Date: '12/27/2024', paymentType : 'online',premiumPayments:'1 week'}
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
      field: 'parsonName',
      headerName: ' Parson Name',
      flex: 1
    },
    {
      field: 'productType',
      headerName: 'Product Type',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1
    },
    {
      field: 'paymentType',
      headerName: ' Payment Type',
      flex: 1
    },
    {
      field: 'premiumPayments',
      headerName: ' Premium Payments',
      flex: 1
    },


  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} />
      
      <Grid>
      <Stack direction="row" alignItems="center" mb={5} >
          <Box sx={{backgroundColor:'white', height:'50px' ,width:'100%' ,display:'flex',borderRadius :'10px',justifyContent:'space-between',alignItems:'center',padding:'0 25px',marginTop:'-7px'}}>
            <Breadcrumbs aria-label="breadcrumb">
            <HomeIcon sx={{color:'#2067db'}} fontSize="medium" onClick={handleClick}/>
          <Typography variant="h5" sx={{fontWeight:'600px',color:'black'}}>Product-Information</Typography>
          </Breadcrumbs>
         
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
          <Card >
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size='small'>
              Product Type
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

export default PolicyManagement;
