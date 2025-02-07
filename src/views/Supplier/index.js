import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs, Link,IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import ProductAdd from './ProductAdd';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { urls } from 'views/Api/constant.js';
import { getApi,deleteApi } from 'views/Api/comman.js';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewCompany from './ViewSupplier';
import EditIcon from '@mui/icons-material/Edit';
import AddEdit from './Edit';
import Swal from 'sweetalert2';



const Supplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [selectedCompany,setSelectedCompany]= useState(null)
  const [openView,setOpenView] = useState(false)
  const [companyUpdated,setCompanyUpdated] = useState(null)
  const [openEdit,setOpenEdit] = useState(false)

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

  const handleView = (supplier) => {
   setSelectedCompany(supplier);
    setOpenView(true);
  };


  
  const handleUpdate = (category) => {
    setCompanyUpdated(category);
    setOpenEdit(true);
  };


 const handleDelete = (id) => {
     Swal.fire({
       title: 'Are you sure?',
       text: 'Do you want to remove this company?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, remove it!',
       cancelButtonText: 'Cancel'
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await deleteApi(urls.company.delete.replace(':id', id));
           setSupplier((prevSupplier) => prevSupplier.filter((cat) => cat._id !== id));
           Swal.fire('Removed!', 'The company has been deleted.', 'success');
          
         } catch (error) {
           Swal.fire('Error!', 'Failed to delete company.', 'error');
          
         }
       }
     });
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
      field: 'status',
      headerName: 'Status',
       flex: 1,
      renderCell: (params) => (
        <Button

          variant="contained"
          sx={{
            boxShadow: 'none',
            padding: '3px 3px',
            fontSize: '.6rem',
            backgroundColor:
              params.value === 'Active' ? '#419737' : params.value === 'Inactive' ? '#12aae8' : params.value === 'Blocked' ?  '#FF5733'  : '',
        
            textAlign: 'center',
           

            '&:hover': {
              backgroundColor:
                params.value === 'Active' ? '#419737' : params.value === 'Inactive' ?'#12aae8': params.value === 'Blocked' ?  '#FF5733'  : ''
            }
          }}
        >
          {params.value}
        </Button>
      )
    },
    {
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
      ),
    },
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
    <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} company={companyUpdated}  fetchSupplier={fetchSupplier}/>
    <ViewCompany open={openView} handleClose={()=> setOpenView(false)} supplier={selectedCompany} />
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
                   New Supplier 
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
               
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Supplier;
