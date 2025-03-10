import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs, IconButton } from '@mui/material';
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

const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [purchaseUpdated, setPurchaseUpdated] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [purchaseFilter,setFilteredPurchase] = useState([])


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
          Swal.fire('Removed!', 'The purchase has been deleted.', 'success');
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
      headerName: 'Company',
      flex: 1,
      valueGetter: (params) => params.row.CompanyName?.[0]?.companyName || 'N/A'
    },
    {
      field: 'totalPrice',
      headerName: 'Amount',
      flex: 1
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
      )
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
      />
      <ViewPurchase open={openView} handleClose={() => setOpenView(false)} purchase={selectedPurchase} />
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
             mb:'40px'
            }}
          >
          
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                <HomeIcon />
              </IconButton>
             
              <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>  Purchase-Information</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}  onClick={() => setOpenAdd(true)} size="small">
                New Purchase
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>


       

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
