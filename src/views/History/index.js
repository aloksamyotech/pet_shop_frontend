import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Grid, Breadcrumbs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const History = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();


 

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getApi(urls.order.get);
      setProduct(response?.data?.data || []);
    };
    fetchProduct();
  }, []);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleViewInvoice = (order) => {
  
    navigate('/dashboard/ProductType', {
      state: {
        cartItems: order.products,
        selectedCustomer: {
          firstName: order.customerName,
         email: order.customerEmail,
          phoneNumber: order.customerPhone,
          address: order.customer?.[0]?.address,
        },
        orderDate: new Date(order.createdAt).toLocaleDateString(),
      }
    });
  };

  const columns = [
    { field: 'customerName', headerName: 'Name', flex: 1 },
    { field: 'customerEmail', headerName: 'Email', flex: 1 },
    { field: 'customerPhone', headerName: 'Phone', flex: 1 },
    {
      field: 'products',
      headerName: 'Item',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.products?.length > 0
          ? params.row.products.map((p) => `${p.productName}(${p.quantity})`).join(', ')
          : 'N/A';
      }
    },
    { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      flex: 1,
      valueGetter: (params) => params.row?.createdAt 
        ? new Date(params.row.createdAt).toLocaleDateString() 
        : ''
    },
    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleViewInvoice(params.row)}>
          <VisibilityIcon sx={{ color: '#2067db' }} />
        </Button>
      )
    }
  ];

  return (
    <>
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
              <HomeIcon 
                sx={{ color: '#2067db', cursor: 'pointer' }} 
                fontSize="medium" 
                onClick={handleClick} 
              />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                History
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-27px' }}>
              <DataGrid
                rows={product}
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

export default History;
