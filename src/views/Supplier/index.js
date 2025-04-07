import { useState, useEffect } from 'react';
import { Stack, Button, Typography, Card, Box, Grid, IconButton, Popover, MenuItem } from '@mui/material';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddEdit from './Edit';
import { toast } from 'react-toastify';
import ConfirmDialog from 'confirmDeletion/deletion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchBar from 'views/Search';
import ProductAdd from './ProductAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

const Supplier = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [companyUpdated, setCompanyUpdated] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
const [currentRowId, setCurrentRowId] = useState(null);

const handleDelete = (id) => {
  setDeleteId(id);
  setOpenConfirmDialog(true);
};

const handleOpenActions = (event, rowId) => {
  setAnchorEl(event.currentTarget);
  setCurrentRowId(rowId);
};

const handleCloseActions = () => {
  setAnchorEl(null);
  setCurrentRowId(null);
};

  const fetchSupplier = async () => {
    try {
      const response = await getApi(urls.company.get);
      const data = response?.data?.data || [];
      setSupplier(data);
      setFilteredCompany(data); 
    } catch (error) {
      console.error("error_fetching_data", error);
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

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteApi(urls.company.delete.replace(':id', deleteId));
      setSupplier((prev) => prev.filter((sup) => sup._id !== deleteId));
      setFilteredCompany((prev) => prev.filter((sup) => sup._id !== deleteId));
      toast.success(t('Supplier has been removed successfully'));
    } catch (error) {
      toast.error(t('Error! Failed to delete supplier'));
    }

    setOpenConfirmDialog(false);
    setDeleteId(null);
  };

 



  const columns = [
    { field: 'companyName', headerName: t('Supplier'), flex: 1 , renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
       <CheckCircleIcon sx={{ color: 'green', fontSize: '15px' }} />
        <Typography>{params.value}</Typography>
      </Stack>
    ),},
    { field: 'email', headerName: t('Email'), flex: 1 },
    { field: 'phoneNumber', headerName:t('Phone Number'), flex: 1 },
    { field: 'address', headerName: t('Address'), flex: 1 },
    { field: 'description', headerName: t('Description'), flex: 1 },
    {
      field: 'Action',
      headerName: t('Action'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenActions(e, params.row._id)} size="small" sx={{ padding: 0 }}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl) && currentRowId === params.row._id} 
            anchorEl={anchorEl}
            onClose={handleCloseActions}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{
              sx: { boxShadow: 3, borderRadius: '20px' },
            }}
          >
           
            <MenuItem
              onClick={() => {
                handleUpdate(params.row);
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
      ),
    }
    
  ];




  const handleOpenAdd = () => {
    setOpen(true);
  };

  return (
    <>
     <ConfirmDialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} onConfirm={confirmDelete} />
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
              <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
                <HomeIcon />
              </IconButton>
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography>{t("Clients")}</Typography>
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>{t("Supplier Information")}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}  onClick={handleOpenAdd} size="small"  sx={{
                  backgroundColor: '#6A9C89',
                  color: '#ffff',
                  '&:hover': {
                    backgroundColor: '#8DB3A8' 
                  }
                }}>
                 {t( "New Supplier")}
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

     <TableStyle>
          <Card sx={{ height: 'auto', marginTop: '-10px' }}>
          <SearchBar onSearch={handleSearch} />
            <DataGrid rows={filteredCompany} columns={columns} getRowId={(row) => row._id} 
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
        </TableStyle>
      </Grid>
    </>
  );
};

export default Supplier;
