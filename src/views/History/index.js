import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography, Box, Card, Grid, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';

const History = () => {
  const [product, setProduct] = useState([]);
  

  const fetchProduct = async () => {
    const response = await getApi(urls.order.get);
 setProduct(response?.data?.data);
    
  };


  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/default');
  };
  
  const columns = [
    {
      field: 'customerName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'customerEmail',
      headerName: 'Email',
      flex: 1,
      },
    {
      field: 'customerPhone',
      headerName: 'Phone',
      flex: 1
    },
    {
      field:'products',
      headerName:'Item',
      flex: 1,
      valueGetter: (params) => {
        if (params.row?.products?.length > 0) {
          return params.row.products?.map((product) => `${product?.productName}(${product?.quantity})`).join(', ');
        }
        return 'N/A';
      }
    },
    {
      field: 'productName',
      headerName: 'Item',
      flex: 0.5,
      valueGetter:(params) =>{
        if(params.row?.products?.length>0){
            return params.row.products?.map((product) => `${product?.productName}(${product?.quantity})`).join(',')
        }
        return 'N/A'
      }
    },

{
        field: 'totalAmount',
        headerName: 'totalAmount',
        flex: 1
      },
      {
        field: 'productName',
        headerName: 'Order Date',
        flex: 1,
        valueGetter:(params) =>{
          if(params.row?.createdAt){
            const orderDate= params.row.createdAt;
            const date = new Date(orderDate);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  return formattedDate;
        }
        return '';
        }
      },
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
              <HomeIcon sx={{ color: '#2067db' }} fontSize="medium" onClick={handleClick} />
              <Typography variant="h5" sx={{ fontWeight: '600px', color: 'black' }}>
                Product-Mangmant
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
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default History;
