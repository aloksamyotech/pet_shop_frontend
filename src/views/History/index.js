import { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Grid,
  TextField,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PersonIcon from '@mui/icons-material/Person';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant';
import SearchBar from 'views/Search';

const History = () => {
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj?.currencySymbol || '$';

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getApi(urls.order.get);
      const orders = response?.data?.data || [];
      setProduct(orders);
      setOrder(orders);
    };
    fetchOrders();
  }, []);

  // Date filter function
  const filterData = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    const filteredOrders = product.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    setOrder(filteredOrders);
  };

  const isFilterDisabled = !startDate || !endDate;

  // Search filter function
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setOrder(product); // Reset to original data
    } else {
      const filtered = product.filter((sup) =>
        sup.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOrder(filtered);
    }
  };

  // Navigate to home/dashboard
  const handleClick = () => {
    navigate('/dashboard/default');
  };

  // View Invoice Button Action
  const handleViewInvoice = (Data) => {
    navigate('/dashboard/ProductType', { state: { Data } });
  };

  // Date Formatter
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  };

  // DataGrid columns
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
      )
    },
    { field: 'customerEmail', headerName: 'Email', flex: 1 },
    { field: 'customerPhone', headerName: 'Phone', flex: 1 },
    {
      field: 'totalAmount',
      headerName: 'Paid Amount',
      flex: 1,
      renderCell: (params) => <>{currencySymbol} {params.value.toFixed(2)}</>
    },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      flex: 1,
      renderCell: (params) => (params.row?.createdAt ? formatDateTime(params.row.createdAt) : '')
    },
    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleViewInvoice(params.row)}>
          <ReceiptIcon style={{ color: '#2067db' }} />
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
              alignItems: 'center',
              padding: '0 25px',

            }}
          >
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleClick} sx={{ color: '#6A9C89' }}>
                <HomeIcon />
              </IconButton>
              <ArrowBackIosNewRoundedIcon
                sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }}
              />
              <Typography variant="h6" sx={{ ml: 1, fontSize: '15px' }}>
                History
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Date Filter Section */}
        <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px' }}
>
  <TextField
    label="Start Date"
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    sx={{ mr: 2 }}
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
    sx={{ mr: 2 }}
  />
  <Button
    variant="contained"
    disabled={isFilterDisabled}
    sx={{
      backgroundColor: isFilterDisabled ? '#ddd' : '#6A9C89',
      '&:hover': {
        backgroundColor: isFilterDisabled ? '#ddd' : '#6A9C89'
      }
    }}
    onClick={filterData}
  >
    Apply Filter
  </Button>

  {/* Clear Filter Button */}
  <Button
    variant="outlined"
    sx={{ ml: 1, color: '#6A9C89', borderColor: '#6A9C89' }}
    onClick={() => {
      setStartDate('');
      setEndDate('');
      setOrder(product);
    }}
  >
    Clear Filter
  </Button>
</Stack>


        {/* Data Table Section */}
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', marginTop: '-45px' }}>
              <SearchBar onSearch={handleSearch} />
              <DataGrid rows={order} columns={columns} getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </>
  );
};

export default History;
