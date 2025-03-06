import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton, Grid } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import ViewCategory from './viewCategory.js';
import { urls } from 'views/Api/constant.js';
import { getApi, deleteApi } from 'views/Api/comman.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import CategoryForm from './CategoryForm';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Customer = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryUpdated, setCategoryUpdated] = useState(null);

  const home = () => navigate('/');

  const fetchCategories = async () => {
    try {
      const response = await getApi(urls.category.get);
      const categoryData = response?.data?.data || [];
      setCategory(categoryData);
      setFilteredCategory(categoryData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCategory(category);
    } else {
      const filtered = category.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCategory(filtered);
    }
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setOpenView(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteApi(urls.category.delete.replace(':id', id));
          setCategory((prev) => prev.filter((cat) => cat._id !== id));
          setFilteredCategory((prev) => prev.filter((cat) => cat._id !== id));
          Swal.fire('Removed!', 'The category has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete category.', 'error');
        }
      }
    });
  };

  const handleOpenForm = (category = null) => {
    setCategoryUpdated(category);
    setOpenForm(true);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'categoryImage',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'}
          alt="product"
          style={{ width: '25px', height: '25px', objectFit: 'cover' }}
        />
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
            <VisibilityIcon sx={{ color: '#00bbff' }} />
          </IconButton>
          <IconButton onClick={() => handleOpenForm(params.row)}>
            <EditIcon sx={{ color: '#5f0497' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <>
      <CategoryForm open={openForm} handleClose={() => setOpenForm(false)} fetchCategories={fetchCategories} category={categoryUpdated} />
      <ViewCategory open={openView} handleClose={() => setOpenView(false)} category={selectedCategory} />

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
            <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
              <HomeIcon />
            </IconButton>
            <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black', mr: 1 }} />
            <Typography variant="h5">Category</Typography>{' '}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Card>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleOpenForm()} size="small">
                New Category
              </Button>
            </Card>
          </Stack>
        </Box>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-25px' }}>
              <SearchBar onSearch={handleSearch} />
              <DataGrid rows={filteredCategory} columns={columns} getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Customer;
