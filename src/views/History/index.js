import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Grid, Breadcrumbs,IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import SearchBar from 'views/Search';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PersonIcon from '@mui/icons-material/Person';

const History = () => {
  const [product, setProduct] = useState([]);
  const [order, setOder] = useState([]);
  const navigate = useNavigate();


  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setOder(product);
    } else {  
      const filtered = product.filter((sup) =>
        sup.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOder(filtered);

    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getApi(urls.order.get);
      setProduct(response?.data?.data || []);
      setOder(response?.data?.data || []);
    };
    fetchProduct();
  }, []);

  const handleClick = () => {
    navigate('/dashboard/default');
  };

  const handleViewInvoice = (Data) => {
  navigate('/dashboard/ProductType', { state: {Data} });
  };

  const columns = [
    {
    field: 'customerName',
    headerName: 'Customer Name',
    flex: 1,
    renderCell: (params) => (
      <span>
        <PersonIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: 5 }} />
        {params.value}
      </span>
    ),
  },
    { field: 'customerEmail', headerName: 'Email', flex: 1 },
    { field: 'customerPhone', headerName: 'Phone', flex: 1 },
    { field: 'totalAmount', headerName: 'Paid Amount', flex: 1 },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      flex: 1,
      renderCell: (params) => {
        if (!params.row?.createdAt) return '';
        
        const date = new Date(params.row.createdAt);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString(); 
    
        return (
          <span>
            {formattedDate}
            <br />
            <small style={{ color: 'gray' }}>{formattedTime}</small>
          </span>
        );
      }
    }
    ,
    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleViewInvoice(params.row)}>
          <ReceiptIcon style={{  color: '#2067db' }} />
          {/* <VisibilityIcon sx={{ color: '#2067db' }} /> */}
        </Button>
      )
    }
  ];

  return (
    <>
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
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}> History</Typography>
            </Stack>

           
          </Box>
        </Stack>

      
        <TableStyle>
          <Box width="100%">
          <Card style={{ height: '600px',  marginTop: '-45px' }}>
          <SearchBar onSearch={handleSearch} />
              <DataGrid
                rows={order}
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
