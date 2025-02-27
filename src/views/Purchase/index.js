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

const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [openView, setOpenView] = useState(false);

  const [purchaseUpdated, setPurchaseUpdated] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const fetchPurchase = async () => {
    try {
      const response = await getApi(urls.purchase.get);
      setPurchase(response?.data?.data || []);
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
      valueGetter: (params) => params.row.productName?.[0].productName || 'N/A'
    },
    {
      field: 'companyName',
      headerName: 'Company',
      flex: 1,
      valueGetter: (params) => params.row.CompanyName?.[0].companyName || 'N/A'
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
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor:
              params.value === 'Success' ? '#7011bc' : params.value === 'Pending' ? '#12aae8' : params.value === 'Failed' ? '#FF5733' : '',
            width: '80px',
            textAlign: 'center',
            padding: '2px',
            '&:hover': {
              backgroundColor:
                params.value === 'Success' ? '#7011bc' : params.value === 'Pending' ? '#12aae8' : params.value === 'Failed' ? '#FF5733' : ''
            }
          }}
        >
          {params.value}
        </Button>
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
        <Stack direction="row" alignItems="center" mb={5}>
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
            <Breadcrumbs aria-label="breadcrumb">
              <HomeIcon sx={{ color: '#2067db' }} onClick={home} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
                Purchase-Information
              </Typography>
            </Breadcrumbs>
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenAdd(true)} size="small">
                  New Purchase
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-25px' }}>
              <DataGrid rows={purchase} columns={columns} getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Purchase;
