import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs,TextField, IconButton,MenuItem,Popover } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import PurchaseForm from './PurchaseForm';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getApi, deleteApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewPurchase from './ViewPurchase';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ConfirmDialog from 'confirmDeletion/deletion';
import PersonIcon from '@mui/icons-material/Person';
const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [purchaseUpdated, setPurchaseUpdated] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [purchaseFilter,setFilteredPurchase] = useState([])
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj.currencySymbol;
  const [activeRow, setActiveRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
   const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

    const { t } = useTranslation();
    
    const handleDelete = (id) => {
      setDeleteId(id);
      setOpenConfirmDialog(true);
    };

  const filterData = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    

    const filteredPurchases = purchase.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    
    setFilteredPurchase(filteredPurchases);
  };
  const isFilterDisabled = !startDate || !endDate;

  
 
  const handleOpenActions = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };
  

  const handleCloseActions = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };


  
 

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPurchase(purchase);
    } else {  
      const filtered = purchase.filter((sup) =>
        sup.productName?.[0].productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPurchase(filtered);

    }
  };

  const fetchPurchase = async () => {
    try {
      const response = await getApi(urls.purchase.get);
      setPurchase(response?.data?.data || []);
      setFilteredPurchase(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };

  useEffect(() => {
    fetchPurchase();
  }, []);

  const navigate = useNavigate();
  const home = () => navigate('/dashboard/default');

  const handleView = (purchase) => {
    setSelectedPurchase(purchase);
    setOpenView(true);
  };

  const handleUpdate = (purchase) => {
    setPurchaseUpdated(purchase);
    setOpenAdd(true);
  };
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteApi(urls.purchase.delete.replace(':id', deleteId));
      setPurchase((prev) => prev.filter((purchase) => purchase._id !== deleteId));
      setFilteredPurchase((prev) => prev.filter((purchase) => purchase._id !== deleteId));

      toast.success(t('Purchase has been removed successfully'));
    } catch (error) {
      toast.error(t('Error! Failed to delete purchase'));
    }

    setOpenConfirmDialog(false);
    setDeleteId(null);
  };

  
  const columns = [
    {field:'s_no',headerName:'S_No',flex:0.5},
{
  field: 'companyName',
  headerName: t('Supplier'),
  flex: 1,
  renderCell: (params) => {
    const name = params.row.CompanyName?.[0]?.companyName || '-';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PersonIcon fontSize="small" />
        <span>{name}</span>
      </div>
    );
  }
},
    {
      field: 'productName',
      headerName: t('Product'),
      flex: 1,
      valueGetter: (params) => params.row.productName?.[0]?.productName || '-'
    },
  
    {
      field:'price',
      headerName:t('Price'),
      flex:1,
      renderCell: (params) => (
        <>
        {currencySymbol} {params.value}
         
        </>
      ),
    },
    {
      field: 'totalPrice',
      headerName: t('Amount'),
      flex: 1,
      renderCell: (params) => (
        <>
        {currencySymbol} {params.value.toFixed(2)}
         
        </>
      ),
    },
    {
      field: 'discount',
      headerName:t('Discount'),
      flex: 1
    },
    {
      field: 'quantity',
      headerName: t('Quantity'),
      flex: 1
    },
    {
      field: 'paymentStatus',
      headerName: t('Payment Status'),
      flex: 1,
      renderCell: (params) => {
        return(
         <Box
         sx={{
           backgroundColor:
            params.value  === 'Success' ? '#D5FADF' :params.value  === 'Pending' ? '#F8E1A1' :params.value  === 'Failed' ? '#FBE9E7' : '',
           color:params.value  === 'Success' ? '#19AB53' :params.value  === 'Pending' ? '#FF9800' :params.value  === 'Failed' ? '#F44336' : '',
           borderRadius: '8px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
          paddingRight:'8px',
          paddingLeft:'8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%',
         fontSize: '0.8125rem',
            
         }}
       >
         {params.value}
       </Box>
       )}
    },
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
            PaperProps={{
              sx: { boxShadow: 3, borderRadius: '20px' },
            }}
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

  return (
    <>
     <ConfirmDialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} onConfirm={confirmDelete} />

      <PurchaseForm
        open={openAdd}
        handleClose={() => {
          setOpenAdd(false);
          setPurchaseUpdated(null);
        }}
        purchase={purchaseUpdated}
        fetchPurchase={fetchPurchase}
        currencySymbol={currencySymbol}
      />
      <ViewPurchase open={openView} handleClose={() => setOpenView(false)} purchase={selectedPurchase} currencySymbol={currencySymbol} />
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
             
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}> {t(" Purchase-Information")}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}  onClick={() => setOpenAdd(true)} size="small"  sx={{
                  backgroundColor: '#6A9C89',
                  color: '#ffff',
                  '&:hover': {
                    backgroundColor: '#8DB3A8' 
                  }
                }}>
               {t(" New Purchase")}
                </Button>
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
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
  />
  <TextField
    label={t("End Date")}
    type="date"
    value={endDate}
    onChange={(e) => {
      const selectedEndDate = new Date(e.target.value);
      const selectedStartDate = new Date(startDate);
      if (selectedEndDate >= selectedStartDate) {
        setEndDate(e.target.value);
      }
    }}
    InputLabelProps={{ shrink: true }}
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
  {t("Apply Filter")}
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
    {t("Clear Filter")}
  </Button>
</Box>



       

        <TableStyle>
          <Box width="100%">
          <Card style={{ height: 'auto', marginTop: '-45px' }}>
            <SearchBar onSearch={handleSearch} />
              <DataGrid rows={purchaseFilter.map((row,index)=>({...row,s_no:index+1}))} columns={columns} getRowId={(row) => row._id} 
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

export default Purchase;
