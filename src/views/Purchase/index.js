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
import Swal from 'sweetalert2';
import ViewPurchase from './ViewPurchase';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this purchase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteApi(urls.purchase.delete.replace(':id', id));
          setPurchase((prevPurchase) => prevPurchase.filter((p) => p._id !== id));
        
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete purchase.', 'error');
        }
      }
    });
  };

  
  const columns = [
    {
      field: 'productName',
      headerName: 'Product',
      flex: 1,
      valueGetter: (params) => params.row.productName?.[0]?.productName || 'N/A'
    },
    {
      field: 'companyName',
      headerName: 'Supplier',
      flex: 1,
      valueGetter: (params) => params.row.CompanyName?.[0]?.companyName || 'N/A'
    },
    {
      field:'price',
      headerName:'Price',
      flex:1,
      renderCell: (params) => (
        <>
        {currencySymbol} {params.value}
         
        </>
      ),
    },
    {
      field: 'totalPrice',
      headerName: 'Amount',
      flex: 1,
      renderCell: (params) => (
        <>
        {currencySymbol} {params.value.toFixed(2)}
         
        </>
      ),
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
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
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* Open button */}
          <IconButton onClick={(e) => handleOpenActions(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
    
          {/* Popover that only opens for the active row */}
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
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>  Purchase-Information</Typography>
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
                New Purchase
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
    label="Start Date"
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
  />
  <TextField
    label="End Date"
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
    Apply Filter
  </Button>

  {/* Clear Filter Button */}
  <Button
    variant="outlined"
    sx={{ color: '#6A9C89', borderColor: '#6A9C89' }}
    onClick={() => {
      setStartDate('');
      setEndDate('');
      setFilteredPurchase(purchase); // Reset to original data
    }}
  >
    Clear Filter
  </Button>
</Box>



       

        <TableStyle>
          <Box width="100%">
          <Card style={{ height: '600px', marginTop: '-45px' }}>
            <SearchBar onSearch={handleSearch} />
              <DataGrid rows={purchaseFilter} columns={columns} getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Purchase;
