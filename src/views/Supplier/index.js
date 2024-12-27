/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box,Grid,Breadcrumbs,Link} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';

import ProductAdd from './ProductAdd'
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
const Supplier = () => {
  const demoData = [
    { id: 1, companyName: 'XYZ', CompanyId: '232', Address: 'indore',  Date: '12/27/2024',description:'Food Type'},

    { id: 2, companyName: 'XYZ', CompanyId: '765', Address: 'Pune',  Date: '12/27/2024', description:'Food Type'},

    { id: 3, companyName: 'XYZ', CompanyId: '543', Address: 'Bhopal',   Date: '12/27/2024',description:'Food Type'}
  ];


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
      field: 'CompanyId',
      headerName: 'Company ID',
      flex: 1
    },
    {
      field: 'Address',
      headerName: 'Address',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Description',
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

export default Supplier;
