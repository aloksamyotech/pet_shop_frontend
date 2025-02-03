import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Card, Box, Grid, Breadcrumbs, Link ,IconButton} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import ProductAdd from './PrurchaseAdd.js';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getApi,deleteApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import ViewPurchase from './ViewPurchase';
import AddEdit from './Edit';


const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const [selectedPurchase,setSelectedPurchase] = useState(null)
  const [openView,setOpenView] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [purchaseUpdated,setPurchaseUpdated] = useState(null)

  const fetchPurchase = async () => {
    const response = await getApi(urls.purchase.get);
console.log(response.data.data)
    setPurchase(response?.data?.data);
  };

  const handleView = (purchase) => {
    setSelectedPurchase(purchase);
    setOpenView(true);
  };

  const handleUpdate = (purchase) => {
    setPurchaseUpdated(purchase);
    setOpenEdit(true);
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
            await deleteApi(urls.purchase.delete.replace(':id', id));
            setPurchase((prevPurchase) => prevPurchase.filter((cat) => cat._id !== id));
            Swal.fire('Removed!', 'The category has been deleted.', 'success');
           
          } catch (error) {
            Swal.fire('Error!', 'Failed to delete category.', 'error');
            
          }
        }
      });
    };

  useEffect(() => {
    fetchPurchase();
  }, []);

  const navigate = useNavigate();

  const home = () => {
    navigate('/dashboard/default');
  };

  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      valueGetter: (params) => {
        return params.row.productName[0].productName;
      }
    },

    {
      field: 'totalPrice',
      headerName: 'Amount',
      flex: 1,
      editable: false
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
            size='small'
          sx={{
            backgroundColor:
              params.value === 'Success' ? '#7011bc' : params.value === 'Pending' ? '#12aae8' : params.value === 'Failed' ? '#FF5733' : '',
              width: '50px',
            textAlign: 'center',
            padding: '2px ',

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
            <VisibilityIcon sx={{ color:'#00bbff'}} />
          </IconButton>
        <IconButton onClick={() => handleUpdate(params.row)}>
            <EditIcon sx={{ color:'#5f0497' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </>
      )
    }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
    <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} fetchPurchase={fetchPurchase} purchase ={purchaseUpdated} />
      <ProductAdd open={openAdd} handleClose={handleCloseAdd} fetchPurchase={fetchPurchase} />
      <ViewPurchase  open={openView} handleClose={() => setOpenView(false)} purchase={selectedPurchase} />
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
              <HomeIcon sx={{ color: '#2067db' }}  onClick={home} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Purchase-Information
              </Typography>
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Card>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} size="small">
                  New Purchase
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>
        |
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-45px' }}>
              <DataGrid
                rows={purchase}
                columns={columns}
                getRowId={(row) => row._id}
               
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default Purchase;
