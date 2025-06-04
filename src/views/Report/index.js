import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Tab,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  Paper,
  MenuItem,
  Select,
  TextField,
  Button
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business'; 
import PersonIcon from '@mui/icons-material/Person'; 
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Home as HomeIcon } from '@mui/icons-material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
const Checkout = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('1');
  const [product, setProduct] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj?.currencySymbol || '$';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orderResponse = await getApi(urls.order.get);
    const purchaseResponse = await getApi(urls.purchase.get);

    const orders = orderResponse?.data?.data || [];
    const purchases = purchaseResponse?.data?.data || [];

    setProduct(orders);
    setPurchase(purchases);
    setFilteredProduct(orders);
    setFilteredPurchase(purchases);
  };



  const { t } = useTranslation();

  const filterData = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    const filteredProducts = product.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    const filteredPurchases = purchase.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });

    setFilteredProduct(filteredProducts);
    setFilteredPurchase(filteredPurchases);
  };

  const isFilterDisabled = !startDate || !endDate;


  return (
    <Grid>
      <TabContext value={tabValue}>
        <Box
          sx={{
            backgroundColor: 'white',
            height: '50px',
            display: 'flex',
            borderRadius: '10px',
            alignItems: 'center',
            padding: '0 25px',
            mb: '15px'
          }}
        >
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
            <HomeIcon />
          </IconButton>
          <ArrowBackIosNewRoundedIcon
            sx={{
              transform: 'rotate(180deg)',
              fontSize: '18px',
              color: 'black',
              mr: 1
            }}
          />
          <Typography variant="h5">{t("Report")}</Typography>
        </Box>

   
        <Box
  sx={{
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    mb: '15px',
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
      color: '#fff',
      '&:hover': {
        backgroundColor: isFilterDisabled ? '#ddd' : '#8DB3A8',
      },
    }}
    onClick={filterData}
  >
    {t("Apply Filter")}
  </Button>

  <Button
    variant="outlined"
    sx={{
      color: '#6A9C89',
      borderColor: '#6A9C89',
      '&:hover': {
        borderColor: '#8DB3A8',
        color: '#8DB3A8',
      },
    }}
    onClick={() => {
      setStartDate('');
      setEndDate('');
      setFilteredPurchase(purchase);
      setFilteredProduct(orders);
    }}
  >
      {t("Clear Filter")}
  </Button>
</Box>


      
        <Box sx={{ backgroundColor: '#fff' }}>
        <TabList
  sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: '#6A9C89', 
    },
    '& .MuiTab-root': {
      color: '#B0B0B0', 
    },
    '& .Mui-selected': {
      color: '#6A9C89', 
      fontWeight: 'bold', 
    },
  }}
  onChange={(event, newValue) => setTabValue(newValue)}
>
  <Tab
    value="1"
    label={
      <Box display="flex" alignItems="center " sx={{color:'#6A9C89'}}>
        <ShoppingCartIcon sx={{ fontSize: '20px', mr: 1 }} /> {t("Sales")}
      </Box>
    }
  />
  <Tab
    value="2"
    label={
      <Box display="flex" alignItems="center" sx={{color:'#6A9C89'}}>
        <InventoryIcon sx={{ fontSize: '20px', mr: 1 }} /> {t("Purchase")}
      </Box>
    }
  />
</TabList>




<TabPanel value="1">
  <DataGrid
   rows={filteredProduct.map((item, index) => ({
    id: index,
    date: new Date(item.createdAt).toLocaleDateString(),
    customer: item?.customerName,
    phone: item?.customerPhone || 'N/A',
    productName: item?.products?.map(
      (product) => `${product?.productName}(${product?.quantity})`
    ).join(', '),
    quantity: item?.products?.reduce(
      (total, product) => total + (product?.quantity || 0), 0
    ),
    totalAmount: `${currencySymbol} ${item?.totalAmount}`,
    s_no:index+1,
  }))}
  
    columns={[
      {field:'s_no',headerName:'S_No',flex:0.5},
      { field: 'date', headerName: t('Date'), flex: 1 },
     {
  field: 'customer',
  headerName: t('Customer'),
  flex: 1,
  renderCell: (params) => {
    const customerName = params.row.customer || 'N/A';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PersonIcon fontSize="small" />
        <span>{customerName}</span>
      </div>
    );
  }
},
      { field: 'phone', headerName: t('Phone'), flex: 1 },
      { field: 'productName', headerName: t('Product Name'), flex: 1 },
      { field: 'quantity', headerName: t('Quantity'), flex: 1 },
      { field: 'totalAmount', headerName: t('Total Amount'), flex: 1 },
    ]}
    
    initialState={{
      pagination: {
        paginationModel: { pageSize: 10 }
      }
    }}
    pageSizeOptions={[10]}
    autoHeight
  />
</TabPanel>


<TabPanel value="2">
  <DataGrid
    rows={filteredPurchase.map((item, index) => ({
      id: index,
      date: new Date(item.createdAt).toLocaleDateString(),
      supplier: item?.CompanyName?.[0]?.companyName || 'N/A',
      phone: item?.CompanyName?.[0]?.phoneNumber || 'N/A',
      product: item?.productName?.[0]?.productName || 'N/A',
      quantity: item?.quantity,
      totalPrice: `${currencySymbol} ${item?.totalPrice}`,
      s_no:index+1,
    }))}
    columns={[
      {field:'s_no',headerName:'S_No',flex:0.5},
      { field: 'date', headerName: t('Date'), flex: 1 },
    {
  field: 'supplier',
  headerName: t('Supplier'),
  flex: 1,
  renderCell: (params) => {
    const supplierName = params.row.supplier || 'N/A';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BusinessIcon fontSize="small" />
        <span>{supplierName}</span>
      </div>
    );
  }
},
      { field: 'phone', headerName: t('Phone'), flex: 1 },
      { field: 'product', headerName: t('Product Name'), flex: 1 },
      { field: 'quantity', headerName: t('Quantity'), flex: 1 },
      { field: 'totalPrice', headerName: t('Total Price'), flex: 1 },
    ]}
    initialState={{
      pagination: {
        paginationModel: { pageSize: 10 },
      },
    }}
    pageSizeOptions={[10]}
    autoHeight
  />
</TabPanel>

        </Box>
      </TabContext>
    </Grid>
  );
};

export default Checkout;
