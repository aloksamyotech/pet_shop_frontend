import React from 'react';
import Iconify from 'ui-component/iconify';
import {
  Box, Typography, Grid, Divider, Table, TableHead,
  TableRow, TableCell, TableBody, Stack, IconButton,Button
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { borderRadius } from '@mui/system';

const LabelValue = ({ label, value }) => (
  <Typography variant="h6">
    {label}: <Typography component="span" variant="body1" fontWeight="normal">{value}</Typography>
  </Typography>
);

const now = new Date();
const TodayDate = format(now,'MM/dd/yyyy hh:mm a');

const InvoiceUI = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const currencySymbol = userObj.currencySymbol;

  const invoiceBookingData = location.state?.invoiceBookingData
    ? location.state.invoiceBookingData
    : JSON.parse(localStorage.getItem('invoiceBookingData'));

  const [itemData, setItemData] = useState(
    location.state?.item || JSON.parse(localStorage.getItem('itemData')) || []
  );

  const bookingDateISO = invoiceBookingData.createdAt;
  const formattedData = bookingDateISO
    ? format(new Date(bookingDateISO), 'MM/dd/yyyy hh:mm a')
    : '';

  const invoiceData = {
    date: "2025-04-29",
    time: "12:45 PM",
    bookingId: invoiceBookingData.customerID,
    petName: invoiceBookingData.petType,
    breed: invoiceBookingData.breed,
    customerName: invoiceBookingData.name,
    bookingStatus: invoiceBookingData.status,
    packageName: invoiceBookingData.package?.[0]?.name,
    bookingDateTime: formattedData,
    pickupLocation: 'Indore',
    service: invoiceBookingData.service,
    customerInfo: {
      name: invoiceBookingData.name,
      email: invoiceBookingData.email,
      phone: invoiceBookingData.phone,
      address: invoiceBookingData.city,
    },
    paymentInfo: {
      status: "Paid",
      price: invoiceBookingData.package?.[0]?.price,
      type: "Credit Card",
      date: "2025-04-28",
      paid: 9998,
      advance: 500
    },
    extraItems: itemData,
  };





  const { paymentInfo, extraItems } = invoiceData;
  const remainingAmount = paymentInfo.price - paymentInfo.paid;

  
  const extraItemsTotal = extraItems.reduce((total, item) => total + item.price, 0);


  const totalAmount = paymentInfo.price + extraItemsTotal;



 

  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: 'white',
          height: '50px',
          width: '100%',
          display: 'flex',
          borderRadius: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 25px',
          mb: '25px'
        }}
      >
        <Stack direction="row" alignItems="center">
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
            <HomeIcon />
          </IconButton>
          <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
          <Typography
            onClick={() => navigate(-1)}
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '15px',
              mx: 1,
              '&:hover': { color: '#2067db' }
            }}
          >
            Booking Details
          </Typography>
          <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
          <Typography
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '15px',
              mx: 1,
              '&:hover': { color: '#2067db' }
            }}
          >
            Invoice
          </Typography>
        </Stack>
      </Box> */}
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
    mb: '25px'
  }}
>
  <Stack direction="row" alignItems="center">
    <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
      <HomeIcon />
    </IconButton>
    <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
    <Typography
      onClick={() => navigate(-1)}
      sx={{
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '15px',
        mx: 1,
        '&:hover': { color: '#2067db' }
      }}
    >
      Booking Details
    </Typography>
    <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' }} />
    <Typography
      sx={{
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '15px',
        mx: 1,
        '&:hover': { color: '#2067db' }
      }}
    >
      Invoice
    </Typography>
  </Stack>

 
  <Button
    variant="contained"
    startIcon={<Iconify icon="eva:email-outline" />} 
    // onClick={handleSendEmail}
    size="small"
    sx={{
      borderRadius:'10px',  
      backgroundColor: '#6A9C89',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#8DB3A8'
      }
    }}
  >
    Send Email
  </Button>
</Box>


      <Box p={4} sx={{ backgroundColor: '#fff' }}>
        <Grid container justifyContent="space-between" mb={2}>
          <Typography variant="h4">Invoice</Typography>
          <Box textAlign="right">
            <Typography>Date & Time: {TodayDate}</Typography>
          </Box>
        </Grid>

        <Box mb={2}>
          <Typography variant="h4">Booking Details</Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelValue label="Booking ID" value={invoiceData.bookingId} />
              <LabelValue label="Pet Name" value={invoiceData.petName} />
              <LabelValue label="Booking" value={invoiceData.bookingStatus} />
            </Grid>
            <Grid item xs={6}>
              <LabelValue label="Package Name" value={invoiceData.packageName} />
              <LabelValue label="Booking Date & Time" value={invoiceData.bookingDateTime} />
              <LabelValue label="Service" value={invoiceData.service} />
            </Grid>
          </Grid>
        </Box>

        <Box mb={2}>
          <Typography variant="h4">Customer Information</Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelValue label="Name" value={invoiceData.customerInfo.name} />
              <LabelValue label="Email" value={invoiceData.customerInfo.email} />
            </Grid>
            <Grid item xs={6}>
              <LabelValue label="Phone" value={invoiceData.customerInfo.phone} />
              <LabelValue label="Address" value={invoiceData.customerInfo.address} />
            </Grid>
          </Grid>
        </Box>

        <Box mb={2}>
          <Typography variant="h4">Payment Information</Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LabelValue label="Payment Status" value={paymentInfo.status} />
              <LabelValue label="Payment Type" value={paymentInfo.type} />
              <LabelValue label="Payment Date" value={paymentInfo.date} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelValue label="Package Price" value={`${currencySymbol}${paymentInfo.price}`} />
              <LabelValue label="Advance Payment" value={`${currencySymbol}${paymentInfo.advance}`} />
              <LabelValue label="Remaining Payment" value={`${currencySymbol}${remainingAmount}`} />
            </Grid>
          </Grid>
        </Box>

        {extraItems.length > 0 && (
          <Box mb={2}>
            <Typography variant="h4">Extra Items</Typography>
            <Divider sx={{ my: 1 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extraItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{currencySymbol}{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        <Box mt={4} textAlign="left">
          <Typography variant="h5">
            <strong>Total Amount: {currencySymbol}{totalAmount}</strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceUI;
