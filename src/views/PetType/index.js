import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, IconButton, Grid, MenuItem, Popover } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { urls } from 'views/Api/constant.js';
import { getApi, deleteApi } from 'views/Api/comman.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryForm from './addpetType';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import Iconify from 'ui-component/iconify';
import ConfirmDialog from 'confirmDeletion/deletion';
import { toast } from 'react-toastify';

const PetType = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openForm, setOpenForm] = useState(false);
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryUpdated, setCategoryUpdated] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
      const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpenActions = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

      
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const fetchCategories = async () => {
    try {
      const response = await getApi(urls.petType.get);
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


  const confirmDelete = async () => {
      if (!deleteId) return;
  
      try {
        await deleteApi(urls.petType.delete.replace(':id', deleteId));
        toast.success('Pet has been removed successfully');
       await fetchCategories();
      } catch (error) {
        toast.error(t('Error! Failed to delete pet'));
      }
  
      setOpenConfirmDialog(false);
      setDeleteId(null);
    };


  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCategory(category);
    } else {
      const filtered = category.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCategory(filtered);
    }
  };

 

  const handleOpenForm = (category = null) => {
    setCategoryUpdated(category);
    setOpenForm(true);
  };

  const columns = [
    {field:'s_no',headerName:'S_No',flex:0.5},  
  
    { field: 'name', headerName: t('Name'), flex: 1 },
    { field: 'description', headerName: t('Description'), flex: 1 },
    {
      field: 'Action',
      headerName: t('Action'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenActions(e, params.row)} size="small" sx={{ padding: 0 }}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl) && currentRow?._id === params.row._id}
            anchorEl={anchorEl}
            onClose={handleCloseActions}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ sx: { boxShadow: 3, borderRadius: '20px' } }}
          >
            <MenuItem
              onClick={() => {
                handleOpenForm(currentRow);
                handleCloseActions();
              }}
            >
              <EditIcon sx={{ color: '#5f0497', fontSize: '18px' }} />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(params.row._id);
                handleCloseActions();
              }}
            >
              <DeleteIcon sx={{ color: '#d32f2f', fontSize: '18px' }} />
            </MenuItem>
          </Popover>
        </>
      )
    }
  ];

  return (
    <>
      <ConfirmDialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} onConfirm={confirmDelete} />
      <CategoryForm open={openForm} handleClose={() => setOpenForm(false)} fetchCategories={fetchCategories} category={categoryUpdated} />
    

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
            <Typography variant="h5">Pet</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Card>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleOpenForm()}
                size="small"
                sx={{
                  backgroundColor: '#6A9C89',
                  color: '#ffff',
                  '&:hover': {
                    backgroundColor: '#8DB3A8' 
                  }
                }}
              >
              New Pet
              </Button>
            </Card>
          </Stack>
        </Box>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: 'auto', marginTop: '-25px' }}>
              <SearchBar onSearch={handleSearch} />
              <DataGrid rows={filteredCategory.map((row,index)=>({...row,s_no:index+1}))} 
              columns={columns} getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                pageSizeOptions={[10]}
  />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default PetType;
