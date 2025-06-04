import { useState, useEffect } from 'react';
import {
  Stack, Button, Container, Typography, Card, Box, Grid,
  Breadcrumbs, TextField, IconButton, MenuItem, Popover
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmDialog from 'confirmDeletion/deletion';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
 
import TableStyle from '../../ui-component/TableStyle';
import Iconify from '../../ui-component/iconify';
import SearchBar from 'views/Search';
 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
 
import { getApi, deleteApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import BookingDialog from './BookingDialog';
import BookingDetails from 'views/BookingView';
 
const Booking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
 const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFilterDisabled, setIsFilterDisabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(true);
 const [deleteId, setDeleteId] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [editData, setEditData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');


 
 
const fetchData = async () => {
    try {
      const res = await getApi(urls.registration.get);

      
      if (res?.success) {
        setPurchase(res.data.data);
        setFilteredPurchase(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch purchase data');
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
      fetchData();
     
   
  }, []);
 

 const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return '#F8E1A1';
    case 'approved':
      return '#19AB53';
    case 'rejected':
      return '#C62828';
    case 'completed':
      return '#2196F3';
    default:
      return '#BDBDBD';
  }
};

 
 
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };
 
 
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPurchase(purchase);
    } else {
      const filtered = purchase.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPurchase(filtered);
    }
  };
  const handleOpenActions = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };
 
  const handleCloseActions = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };
 
  const handleView = (row) => {
    navigate('/dashboard/bookingView',{state:{UserData:row._id}} )
   
  };
 
  const handleUpdate = (row) => {
    navigate('/bookingView')
 
  };
 
  const confirmDelete = async (id) => {
   if (!deleteId) return;
     try {
      const userData  =  await getApi(urls.registration.getById.replace(":id",id))
      await deleteApi(urls.registration.delete.replace(":id",id));
      toast.success('Deleted successfully');
      setDeleteId(null);
      const updated = purchase.filter(item => item._id !== id);
      setPurchase(updated);
      setFilteredPurchase(updated);
    } catch (error) {
      console.error("Delete Error:", error?.response?.data || error.message || error);
      toast.error(error?.response?.data?.message || "Failed to delete item");
    }
    setDeleteId(null);
    setOpenConfirmDialog(false);
  };
 
 
 
const filterData = () => {
  const filtered = purchase.filter((item) => {
    const itemDate = new Date(item.createdAt).toISOString().split("T")[0];

    return (
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate) &&
      (!selectedStatus || item.status === selectedStatus)
    );
  });

  setFilteredPurchase(filtered);
};

useEffect(() => {
  filterData();
}, [selectedStatus]);

 
  const columns = [
        {field:'s_no',headerName:'S_No',flex:0.5},  
    {
  field: 'name',
  headerName: t('Name'),
  flex: 1,
  renderCell: (params) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Iconify
        icon="eva:checkmark-circle-2-fill"
        sx={{ color: getStatusColor(params.row.status), width: 20, height: 20 }}
      />
      {params.row.name}
    </Box>
  ),
},

    { field: 'email', headerName: t('Email'), flex: 1 },
    { field: 'phone', headerName: t('Phone'), flex: 1 },
    { field: 'city', headerName: t('City'), flex: 1 },
     {
      field: 'Action',
      headerName: t('Action'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenActions(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
 
          <Popover
            open={Boolean(anchorEl) && activeRow?._id === params.row._id}
            anchorEl={anchorEl}
            onClose={handleCloseActions}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ sx: { boxShadow: 3, borderRadius: '20px' } }}
          >
            <MenuItem
              onClick={() => {
                handleView(activeRow);
                handleCloseActions();
              }}
            >
              <VisibilityIcon sx={{ color: '#00bbff', fontSize: '18px' }} />
            </MenuItem>


            <MenuItem
  onClick={() => {
    setEditData(activeRow); 
    setOpenAdd(true);      
    handleCloseActions();
  }}
>
  <EditIcon sx={{ color: '#5f0497', fontSize: '18px' }} />
</MenuItem>

<MenuItem
              onClick={() => {
                handleDelete(activeRow._id);
                handleCloseActions();
              }}
            >
              <DeleteIcon sx={{ color: '#d32f2f', fontSize: '18px' }} />
            </MenuItem>
          </Popover>
        </>
      ),
    },
  ];
 
  return (
    <>  <ConfirmDialog
      open={openConfirmDialog}
      onClose={() => setOpenConfirmDialog(false)}
      onConfirm={() => confirmDelete(deleteId)}
    />
 
 <BookingDialog
  handleClose={() => {
    setOpenAdd(false);
    setEditData(null);
  }}
  open={openAdd}
  fetchData={fetchData}
  booking={editData}
/>

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
          }}
        >
          <Stack direction="row" alignItems="center">
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
            <HomeIcon />
          </IconButton>
            <ArrowBackIosNewRoundedIcon
              sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }}
            />
            <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>
              {t('Booking Information')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
                        <Card sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <Button
    variant="contained"
    startIcon={<Iconify icon="eva:plus-fill" />}
    onClick={() => setOpenAdd(true)}
    size="small"
    sx={{
      backgroundColor: '#6A9C89',
      color: '#ffff',
      '&:hover': {
        backgroundColor: '#8DB3A8'
      }
    }}
  >
    {t("New Booking")}
  </Button>

  <TextField
    select
    size="small"
    label="Status"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    sx={{ minWidth: 150 }}
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="pending">Pending</MenuItem>
    <MenuItem value="approved">Approved</MenuItem>
    <MenuItem value="rejected">Rejected</MenuItem>
    <MenuItem value="completed">Completed</MenuItem>
  </TextField>
</Card>

                      </Stack>
</Box>
      </Stack>
 
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '15px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
        }}
      >
       <TextField
  label={t("Start Date")}
  type="date"
  value={startDate}
  onChange={(e) => {
    const selected = e.target.value;
    setStartDate(selected);
      if (endDate && endDate < selected) {
      setEndDate('');
    }
  }}
  InputLabelProps={{ shrink: true }}
/>
 
 
<TextField
  label={t("End Date")}
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
  inputProps={{
    min: startDate
  }}
/>
        <Button
          variant="contained"
          disabled={isFilterDisabled}
          sx={{
            backgroundColor: isFilterDisabled ? '#ddd' : '#6A9C89',
            '&:hover': {
              backgroundColor: isFilterDisabled ? '#ddd' : '#6A9C89',
            },
          }}
          onClick={filterData}
        >
          {t('Apply Filter')}
        </Button>
 
        <Button
          variant="outlined"
          sx={{ color: '#6A9C89', borderColor: '#6A9C89' }}
          onClick={() => {
            setStartDate('');
            setEndDate('');
            setFilteredPurchase(purchase);
          }}
        >
          {t('Clear Filter')}
        </Button>
      </Box>
 
      <TableStyle>
        <Box width="100%">
          <Card style={{ height: 'auto', marginTop: '-45px' }}>
          <SearchBar onSearch={handleSearch} />
            <DataGrid
               rows={filteredPurchase.map((row, index) => ({ ...row, s_no: index + 1 }))}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10]}
              autoHeight
            />
          </Card>
        </Box>
      </TableStyle>
    </Grid>
    </>
  );
};
 
export default Booking;
 
 