import { useState, useEffect } from 'react';
import { Stack, Button, Typography, Card, Box, Grid, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import { useNavigate } from 'react-router-dom';
import { urls } from 'views/Api/constant.js';
import { getApi, deleteApi } from 'views/Api/comman.js';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewCompany from './ViewSupplier';
import EditIcon from '@mui/icons-material/Edit';
import AddEdit from './Edit';
import Swal from 'sweetalert2';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchBar from 'views/Search';
import ProductAdd from './ProductAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Supplier = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [companyUpdated, setCompanyUpdated] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchSupplier = async () => {
    try {
      const response = await getApi(urls.company.get);
      const data = response?.data?.data || [];
      setSupplier(data);
      setFilteredCompany(data); 
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCompany(supplier);
    } else {
      const filtered = supplier.filter((sup) =>
        sup.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompany(filtered);
    }
  };

  const handleView = (supplier) => {
    setSelectedCompany(supplier);
    setOpenView(true);
  };

  const handleUpdate = (supplier) => {
    setCompanyUpdated(supplier);
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
          setSupplier((prev) => prev.filter((sup) => sup._id !== id));
          setFilteredCompany((prev) => prev.filter((sup) => sup._id !== id));
          Swal.fire('Removed!', 'The company has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete company.', 'error');
        }
      }
    });
  };

  const columns = [
    { field: 'companyName', headerName: 'Company Name', flex: 1 , renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
       <CheckCircleIcon sx={{ color: 'green', fontSize: '15px' }} />

        <Typography>{params.value}</Typography>
      </Stack>
    ),},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
        )
        
    }
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon sx={{ color: '#00bbff' }} />
          </IconButton>
          <IconButton onClick={() => handleUpdate(params.row)}>
            <EditIcon sx={{ color: '#5f0497' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </>
      ),
    },
  ];



  const handleOpenAdd = () => {
    setOpen(true);
  };

  return (
    <>
    <ProductAdd open={open} handleClose={() => setOpen(false)} fetchSupplier={fetchSupplier}/>
      <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} company={companyUpdated} fetchSupplier={fetchSupplier} />
      <ViewCompany open={openView} handleClose={() => setOpenView(false)} supplier={selectedCompany} />

      <Grid>
        <Stack direction="row" alignItems="center" mb={3}>
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
          
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                <HomeIcon />
              </IconButton>
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography>Clients</Typography>
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>Supplier Information</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}  onClick={handleOpenAdd} size="small">
                  New Supplier
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

     <TableStyle>
          <Card sx={{ height: '600px', marginTop: '-10px' }}>
          <SearchBar onSearch={handleSearch} />
            <DataGrid rows={filteredCompany} columns={columns} getRowId={(row) => row._id} />
          </Card>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Supplier;
