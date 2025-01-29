import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Breadcrumbs, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import Iconify from 'ui-component/iconify';
import AddDetail from './addCategory.js';
import ViewCategory from './viewCategory.js';
import { urls } from 'views/Api/constant.js';
import { getApi,deleteApi } from 'views/Api/comman.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEdit from './Edit';



const Customer = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [category, setCategory] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryUpdated,setCategoryUpdated] = useState(null)

  const home = () => navigate('/');

  const fetchCategories = async () => {
    try {
      const response = await getApi(urls.category.get);
      setCategory(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleView = (category) => {
    setSelectedCategory(category);
    setOpenView(true);
  };

  const handleDelete = async (id) => {
      await deleteApi(urls.category.delete.replace(":id", id));
       setCategory((prevCategories) => prevCategories.filter(cat => cat._id !== id));
  };
  

const handleUpdate = (category) =>{
  console.log("id",category)
  setCategoryUpdated(category)
  setOpenAdd(true);
}

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
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
        <IconButton onClick={() => handleView(params.row)}> 
          <VisibilityIcon sx={{ color: '#1d4587' }} />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row._id)}>
        <DeleteIcon sx={{ color: '#d32f2f' }} />
        </IconButton>
        <IconButton onClick={() => handleUpdate(params.row)}>
        <EditIcon sx={{ color: '#5acd7e' }} />
        </IconButton>


        </>
      ),
    },
  ];

  return (
    <>
          <AddEdit open={openAdd} handleClose={() => setOpenAdd(false)}  fetchCategories={fetchCategories} category={categoryUpdated}/>
      <ViewCategory open={openView} handleClose={() => setOpenView(false)} category={selectedCategory} />
      <AddDetail open={openAdd} handleClose={() => setOpenAdd(false)} fetchCategories={fetchCategories}/>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} spacing={2}>
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
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <HomeIcon sx={{ color: '#5E35B1' }} onClick={home} />
              <Typography variant="h5">Category</Typography>
            </Breadcrumbs>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenAdd(true)} size="small">
                  New Category
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-27px' }}>
              <DataGrid
                rows={category}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Customer;
