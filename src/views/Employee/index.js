import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Grid ,Popover,MenuItem} from '@mui/material';
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
import Employee from './addEmployee';
import Swal from 'sweetalert2';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ViewEmployee from './View';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Customer = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [openView,setOpenView ] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [Customer, setFilteredCustomer] = useState([]);
  const [popoverState, setPopoverState] = useState({ anchorEl: null, row: null });
  
  
  const handleOpenActions = (event, row) => {
    setPopoverState({ anchorEl: event.currentTarget, row });
  };
  
 
  const handleCloseActions = () => {
    setPopoverState({ anchorEl: null, row: null });
  };
  

  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj.currencySymbol;

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCustomer(customerList);
    } else {
      const filtered = customerList.filter((sup) => sup.firstName.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCustomer(filtered);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await getApi(urls.employee.get);
    setCustomerList(response?.data?.data || []);
    setFilteredCustomer(response?.data?.data || []);
  };

  //   const handleView = (customer) => {
  //     navigate(`/dashboard/customer/user`, { state: { customer } });
  //   };

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
          await deleteApi(urls.employee.delete.replace(':id', id));
         
          setCustomerList((prev) => prev.filter((customer) => customer._id !== id));
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
  const  handleView = (customer) =>{
    setSelectedCustomer(customer)
    setOpenView(true);
  }
 
  const handleOpenAdd = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleCloseView = () => {
    setOpenView(false);
  };

  const columns = [
{
  field:'EId',
  headerName:'ID',
  flex:0.5
}
    ,
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <CheckCircleIcon sx={{ color: 'green', fontSize: '15px' }} />

          <Typography>{params.value}</Typography>
        </Stack>
      )
    },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'address', headerName: 'Address', flex: 0.5 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 0.5 },
    {
      field: 'salary',
      headerName: 'Salary',
      flex: 0.5,
      renderCell: (params) => (
        <>
        {currencySymbol} {params.value.toFixed(2)}
         
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {/* Open button */}
            <IconButton onClick={(e) => handleOpenActions(e, params.row)}>
              <MoreVertIcon />
            </IconButton>
    
            {/* Popover tied to specific row */}
            <Popover
              open={Boolean(popoverState.anchorEl) && popoverState.row?._id === params.row._id}
              anchorEl={popoverState.anchorEl}
              onClose={handleCloseActions}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              PaperProps={{ sx: { boxShadow: 3, borderRadius: '20px' } }}
            >
              {/* View action */}
              {/* <MenuItem
                onClick={() => {
                  handleView(popoverState.row);
                  handleCloseActions();
                }}
              >
                <VisibilityIcon sx={{ color: '#00bbff', fontSize: '18px' }} />
              </MenuItem> */}
    
              {/* Edit action */}
              <MenuItem
                onClick={() => {
                  handleEdit(popoverState.row);
                  handleCloseActions();
                }}
              >
                <EditIcon sx={{ color: '#5f0497', fontSize: '18px' }} />
              </MenuItem>
    
              {/* Delete action */}
              <MenuItem
                onClick={() => {
                  handleDelete(popoverState.row._id);
                  handleCloseActions();
                }}
              >
                <DeleteIcon sx={{ color: '#d32f2f', fontSize: '18px' }} />
              </MenuItem>
            </Popover>
          </>
        );
      },
    }
    
  ];

  return (
    <>
    <ViewEmployee open={openView}   handleClose={handleCloseView} customer={selectedCustomer}/>
      <Employee open={openForm} handleClose={handleCloseForm} customer={selectedCustomer} fetchCustomer={fetchCustomers} currencySymbol={currencySymbol} />

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
            mb: '40px'
          }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
              <HomeIcon />
            </IconButton>
            <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black', mr: 1 }} />
            <Typography variant="h5">Employee</Typography>{' '}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Card>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small" sx={{
                  backgroundColor: '#6A9C89',
                  color: '#ffff',
                  '&:hover': {
                    backgroundColor: '#8DB3A8' 
                  }
                }}>
                New Employee
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
