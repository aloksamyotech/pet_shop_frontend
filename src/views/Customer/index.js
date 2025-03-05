import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Grid } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import { urls } from 'views/Api/constant.js';
import { getApi, deleteApi } from 'views/Api/comman.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import AddEdit from './CustomerForm';
import Swal from 'sweetalert2';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Customer = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [Customer, setFilteredCustomer] = useState([]);


  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCustomer(customerList);
    } else {
      const filtered = customerList.filter((sup) =>
        sup.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomer(filtered);

    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await getApi(urls.customer.get);
    setCustomerList(response?.data?.data || []);
    setFilteredCustomer(response?.data?.data || [])
  };

  const handleView = (customer) => {
    navigate(`/dashboard/customer/user`, { state: { customer } });
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
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteApi(urls.customer.delete.replace(':id', id));
          setCustomerList((prev) => prev.filter((customer) => customer._id !== id));
          Swal.fire('Removed!', 'The customer has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete customer.', 'error');
        }
      }
    });
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenForm(true);
  };

  const handleOpenAdd = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const columns = [
    { 
      field: 'firstName', 
      headerName: 'Name', 
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
       <CheckCircleIcon sx={{ color: 'green', fontSize: '15px' }} />

          <Typography>{params.value}</Typography>
        </Stack>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'address', headerName: 'Address', flex: 0.5 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 0.5 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        return(
         <Box
         sx={{
           backgroundColor:
            params.value  === 'Active' ? '#D5FADF' :params.value  === 'Inactive' ? '#F8E1A1' :params.value  === 'Blocked' ? '#FBE9E7' : '',
           color:params.value  === 'Active' ? '#19AB53' :params.value  === 'Inactive' ? '#FF9800' :params.value  === 'Blocked' ? '#F44336' : '',
           borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
             width: '60px',
            height: '20px',
           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            gap: '0.5rem',
            fontSize: '10x'
         }}
       >
         {params.value}
       </Box>
       )}
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon sx={{ color: '#00bbff' }} />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ color: '#5f0497' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <AddEdit open={openForm} handleClose={handleCloseForm} customer={selectedCustomer} fetchCustomer={fetchCustomers} />
      <Grid>
    
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
             mb:'40px'
            }}
          >
              <Stack direction="row" alignItems="center" >
           
          
            <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                  <HomeIcon />
                </IconButton>
                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' , mr:1 }} />
              <Typography variant="h5">Customer</Typography> </Stack>
              
          
           
              <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  New Customer
                </Button>
              </Card>
            </Stack>
          </Box>
       
        <TableStyle>
          <Box width="100%">
          <Card style={{ height: '600px', marginTop: '-25px' }}>
            <SearchBar onSearch={handleSearch} />
              <DataGrid rows={Customer} columns={columns} getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Customer;
