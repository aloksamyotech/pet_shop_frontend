import { useState } from 'react';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PolicyManagement = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;

  console.log('cartItems2----------------', cartItems);
  console.log('selectedCustomer----------', selectedCustomer);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '80%',
          minHeight: '100vh',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
       
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <Typography
            sx={{
              fontSize: '26px',
              fontWeight: 'bold',
            }}
          >
            Invoice
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ marginBottom: '30px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', mb: 2 }}>
            Customer Information
          </Typography>
          <Box sx={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <Typography sx={{ marginBottom: '10px' }}>
              <strong>Name:</strong> {selectedCustomer?.firstName} {selectedCustomer?.lastName}
            </Typography>
            <Typography sx={{ marginBottom: '10px' }}>
              <strong>Email:</strong> {selectedCustomer?.email}
            </Typography>
            <Typography sx={{ marginBottom: '10px' }}>
              <strong>Phone Number:</strong> {selectedCustomer?.phoneNumber}
            </Typography>
            <Typography sx={{ marginBottom: '10px' }}>
              <strong>Address:</strong> {selectedCustomer?.address}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

      
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', mb:2}}>
          Product Information
        </Typography>
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: '60vh',
            padding:0,
            margin:0,
          }}
        >
          {Array.isArray(cartItems) && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ fontWeight: 'bold' }}>
                    <TableCell >Product Name</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell >Price</TableCell>
                    <TableCell >Discount (%)</TableCell>
                    <TableCell >Category Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell>{item.category[0]?.name || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) }
        </Box>
        <Button>pint</Button>
      </Box>
    </>
  );
};

export default PolicyManagement;
