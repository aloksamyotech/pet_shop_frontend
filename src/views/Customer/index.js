import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Link as MuiLink,Grid } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, Link } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import AddDetail from './AddDetail';
import { urls } from 'views/Api/constant.js';
import { getApi ,deleteApi} from 'views/Api/comman.js';
import { color } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import AddEdit from './Edit';
import Swal from 'sweetalert2';

const Customer = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [openEdit,setOpenEdit] = useState(false)
  const [customerUpdated,setCustomerUpdated] = useState(null)

  const fetchCustomer = async () => {
    const response = await getApi(urls.customer.get);
   setCustomer(response?.data?.data);
  };



  const fetchCustomerCount = async () => {
    const response = await getApi(urls.customer.getCount);
  console.log("priti____________________--",response)
  };

  useEffect(() => {
    fetchCustomer();
    fetchCustomerCount();
  }, []);

  const handleView = (customerData) => {
    navigate(`/dashboard/customer/user`, { state: { customer: customerData } });
  };
  




  const handleDelete = (id) => {
     Swal.fire({
       title: 'Are you sure?',
       text: 'Do you want to remove this customer?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, remove it!',
       cancelButtonText: 'Cancel'
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await deleteApi(urls.customer.delete.replace(':id', id));
           setCustomer((prevcustomer) => prevcustomer.filter((cat) => cat._id !== id));
           Swal.fire('Removed!', 'The Customer has been deleted.', 'success');
         } catch (error) {
           Swal.fire('Error!', 'Failed to delete customer.', 'error');
         
         }
       }
     });
   };

      const handleUpdate = (customer) => {
        setCustomerUpdated(customer);
        setOpenEdit(true);
      };

    
  const home = () =>{
    navigate('/');
  }

  const columns = [
    {
      field: 'firstName',
      headerName: 'Name',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
 
    {
      field: 'email',
      headerName: 'Email',
       flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },

    {
      field: 'address',
      headerName: 'Address',
      flex: 0.5,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
    },
    {
      field: 'status',
      headerName: 'Status',
       flex: 0.5,
   
      renderCell: (params) => {
        if (params.value === 'Active') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#419737',
                color: '#fff',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#419737'
                }
              }}
            >
               {(params.value)}
            </Button>
          );
        } else if (params.value === 'Inactive') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor:'#5f0497',
                color: '#fff',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor:'#5f0497'
                }
              }}
            >
              {(params.value)}
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#d32f2f',
                color: '#fff',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor:  '#d32f2f'
                }
              }}
            >
              {(params.value)}
            </Button>
          );
        }
      }
    },
    


    {
      field: 'Action',
      headerName: 'Action ',
       flex: 0.5,
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
      )
    }
  ];


 

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
    <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)}  customer={customerUpdated} fetchCustomer={fetchCustomer}/>
      <AddDetail open={openAdd} handleClose={handleCloseAdd} fetchCustomer={fetchCustomer} />
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
            <Breadcrumbs
          
              aria-label="breadcrumb"
              sx={{ display: 'flex', alignItems: 'center' }}
            ><HomeIcon sx={{ color: '#2067db' }}  onClick={home} />
              
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
                rows={customer}
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

export default Customer;
