/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import {
  Paper,
  Button,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  Divider,
  Table,
  Typography,
  Card,
  Box,
  Grid,
  Breadcrumbs,
  TableCell,
  Stack
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import HomeIcon from '@mui/icons-material/Home';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';

import AddPolicy from './AddProductType';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Description } from '@mui/icons-material';
import axios from 'axios';
import { urls } from 'views/Api/constant';
import { getApi } from 'views/Api/comman';
import { useLocation } from 'react-router-dom';

const PolicyManagement = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const [orderDate, setOrderDate] = useState();
  const navigate = useNavigate();

 const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
  const home = () =>{
    navigate('/');
  }


  const fetchOrderDate = async () => {
    const response = await getApi(urls.order.get);
    setOrderDate(response.data.data[0].createdAt);
  };
  
  useEffect(() => {
   fetchOrderDate();
  }, []);
  

  const date = new Date(orderDate);
  const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString() : 'N/A';


  const printInvoice = () => {
    const content = document.getElementById('invoice-content');
    const printWindow = window.open('', '', 'width=800,height=600');

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              ${styles} 
              @media print {
                body {
                  margin: 0;
                  font-family: Arial, sans-serif;
                }
                .no-print {
                  display: none; 
                }
              }
            </style>
          </head>
          <body>
            ${content.innerHTML} 
          </body>
        </html>
      `);
      

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>


<Stack direction="row" alignItems="center" mb={5} >
          <Box
            sx={{
              backgroundColor: 'white',
              height: '50px',
              width: '100%',
              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              marginTop: '-7px'
            }}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ display: 'flex', alignItems: 'center' }}
            ><HomeIcon sx={{ color: '#5E35B1' }} onClick={home} />
             <Typography variant="h5">Invoice </Typography>
            </Breadcrumbs>
            </Box>
        </Stack>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '80%',
          minHeight: '100vh',
          padding: '15px',
          ml: '90px'
        }}
      >
           
        <Box
          id="invoice-content"
          sx={{
            backgroundColor: '#fff',
            padding: '15px'
          }}
        >
          <Box
            sx={{
              backgroundColor: '#9053bc',
              height: '20vh',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJYkrPXmUAtG_7-3eByMmjjd8B-i3C0LLUg&s"
                alt="Sample"
                style={{ width: '20%', height: 'auto' }}
              />
              <Box>
                <Typography sx={{ color: '#fff' }}>
                  <strong>Invoice Id:</strong> pet-2765
                </Typography>
                <Typography sx={{ color: '#fff' }}>
                  <strong>Date:</strong> {formattedDate}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: '30%',
                display: 'flex',
                justifyContent: 'flex-start',
                textAlign: 'right'
              }}
            >
              <Typography sx={{ color: '#fff' }}>
                The Pet Stop
                <br />
                1234 Happy Paws Street 87876
                <br />
                United States
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ marginBottom: '10px' }}>
            <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Customer Information</Typography>
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

          <Divider />

          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: '60vh',
              padding: 0,
              margin: 0
            }}
          >
            {Array.isArray(cartItems) && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#9053bc' }}>
                    <TableRow sx={{ fontWeight: 'bold' }}>
                      <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>Price</TableCell>
                      <TableCell sx={{ color: 'white' }}>Discount (%)</TableCell>
                      {/* <TableCell sx={{ color: 'white' }}>Category Name</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>0</TableCell>
                        {/* <TableCell>{item.category[0]?.name || 'N/A'}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'end', padding: '10px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Total: Rs.{totalPrice.toFixed(2)}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              border: '2px solid',
              backgroundColor: '#6d42b9',
              padding: '5px',
              color: '#fff',
              '&:hover': { backgroundColor: '#6d42b9' }
            }}
            onClick={printInvoice}
          >
            Print
          </Button>
        </Box>

        <Box>
          <Typography sx={{ color: 'gray', padding: '10px' }}>
            Thank you for visiting our shop! We truly appreciate your trust in us to care for your beloved pets. We look forward to serving
            you again soon!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PolicyManagement;
