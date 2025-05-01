import React from 'react';
import { Box, Grid, Typography, Button, Container, Stack, Card, IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { urls } from 'views/Api/constant';
import { getApi ,deleteApi} from 'views/Api/comman';
import ChangeStatus from './updatedStaus';
import AddItemDialog from './addItem';
import ConfirmDialog from 'confirmDeletion/deletion';

import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


import InvoiceUI from './invoice';
const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState([]);
  const UserData = location.state?.UserData || {};
const [openStatusDialog, setOpenStatusDialog] = useState(false);
const [openItemDialog, setOpenItemDialog] = useState(false);
const [item , setItem] = useState([])
 const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
 const [deleteId, setDeleteId] = useState(null);
 const [editData,setEditData] = useState(false)
 const [updatedItem , setUpdatedItem] = useState([])
 const [invoice , setInvoice] = useState(false)


 const handleInvoice = () => {
  localStorage.setItem('invoiceBookingData', JSON.stringify(bookingData));
  localStorage.setItem('itemData', JSON.stringify(item));
  navigate('/dashboard/invoiceUI');
};


 const handleDelete = (id) => {
  setDeleteId(id);
  setOpenConfirmDialog(true);
};


const handleEdit = (row) => {
  setUpdatedItem(row);
  setEditData(true);
  setOpenItemDialog(true); 
};



const confirmDelete = async (id) => {
 
  if (!deleteId) return;
   try {
    await deleteApi(urls.AddItem.delete.replace(":id", id));
    toast.success("Item deleted successfully!");
    setDeleteId(null);
    AddItemData(); 
  } catch (error) {
    console.error("Delete Error:", error?.response?.data || error.message || error);
    toast.error(error?.response?.data?.message || "Failed to delete item");
  }
  setDeleteId(null);
  setOpenConfirmDialog(false);
};




const fetchData = async () => {
  if (!UserData) {
    console.error('No booking ID found!');
    return;
  }
  const userData = await getApi(urls.registration.getById.replace(":id", UserData));

  if (userData?.data?.data) {
    setBookingData(userData.data.data);
  } else {
    console.error('Invalid API response:', userData);
  }
};

const AddItemData  = async() =>{
    const AddItem = await getApi(urls.AddItem.getById.replace(":id",UserData));
  setItem(AddItem.data.data)

}



useEffect(()=>{
fetchData()
AddItemData()

},[])

const handleStatusOpen = () => {
  setOpenStatusDialog(true);
};
const handleItemOpen = () => {
  setOpenItemDialog(true);
  AddItemData()
};

const handleStatusClose = () => {
  setOpenStatusDialog(false);
};
const handleItemClose = () => {
  setOpenItemDialog(false);
  setEditData(false);
  setUpdatedItem([]); 
};

const handleStatus = () =>{
navigate('/dashboard/ChangeStatus')
}

  return (
 
    
    <Container sx={{  mb: 2 }}>
    

      <ConfirmDialog 
  open={openConfirmDialog} 
  onClose={() => setOpenConfirmDialog(false)} 
  onConfirm={() => confirmDelete(deleteId)} 
/>

         <ChangeStatus open={openStatusDialog} handleClose={handleStatusClose} id={bookingData?._id}    bookingData={bookingData} fetchData={fetchData}/>
         <AddItemDialog 
  open={openItemDialog}
  handleClose={handleItemClose}
  id={bookingData?._id}
  AddItemData={AddItemData}
  updatedItem={updatedItem}
  editData={editData}
/>

   
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
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#6A9C89' }}>
            <HomeIcon />
          </IconButton>
          <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: 18, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Booking Details
          </Typography>
        </Stack>
      </Box>

    
      <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
        
       
        <Card sx={{ p: 4, mb: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h5" mb={3} sx={{ fontWeight: 600 }}>
            Customer Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack spacing={1.5}>
                <Typography><strong>Name:</strong>{bookingData.name}</Typography>
                <Typography><strong>Phone:</strong>{bookingData.phone}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1.5}>
                <Typography><strong>Address:</strong>{bookingData.city}</Typography>
                <Typography><strong>Email:</strong>{bookingData.email}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Card>

       
        <Card sx={{ p: 4, mb: 4, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
          <Typography variant="h5" mb={3} sx={{ fontWeight: 600 }}>
            Booking Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack spacing={1.5}>
                <Typography><strong>Pet:</strong>{bookingData.petType}</Typography>
                <Typography><strong>Breed:</strong>{bookingData.breed}</Typography>
                <Typography><strong>Gender:</strong>{bookingData.gender}</Typography>
                <Typography><strong>Pet Age:</strong>{bookingData.petAge}</Typography>
                <Typography><strong>Size:</strong>{bookingData.size}</Typography>
                <Typography><strong>Service:</strong>{bookingData.service}</Typography>
                <Typography><strong>Total Amount:</strong> $300</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
  <Stack spacing={1.5}>
    <Typography><strong>Package Name:</strong> Premium Grooming Package</Typography>
    <Typography><strong>Package Price:</strong> $100</Typography>

    <Typography>
      <strong>Booking Status:</strong>{' '}
      <span
  style={{
    backgroundColor:
      bookingData.status === 'pending'
        ? '#F8E1A1'
        : bookingData.status === 'approved'
        ? '#D5FADF'
        : bookingData.status === 'rejected'
        ? '#F8D7DA'
        : '',
    color:
      bookingData.status === 'pending'
        ? '#FF9800'
        : bookingData.status === 'approved'
        ? '#19AB53'
        : bookingData.status === 'rejected'
        ? '#C62828'
        : '',
    borderRadius: '8px',
    padding: '4px 12px',
    fontWeight: 'bold',
    fontSize: '0.8125rem',
    textTransform: 'capitalize',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    display: 'inline-block',
    marginLeft: '8px'
  }}
>
  {bookingData.status}
</span>

    </Typography>

    <Typography><strong>Pickup Location:</strong> Customer Address</Typography>
    <Typography><strong>Start Date & Time:</strong> {bookingData.startDate}</Typography>
    <Typography><strong>End Date & Time:</strong> {bookingData.endDate}</Typography>
  </Stack>
</Grid>


          </Grid>
        </Card>

       <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
         
            <Button
            
              variant="contained"
              sx={{
                backgroundColor: '#6A9C89',
                color: '#ffffff',
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#8DB3A8',
                },
              }}
              onClick={handleStatusOpen}
            >
            Change Booking Status
            </Button>
            <Button
                 variant="contained"
              sx={{
                backgroundColor: '#6A9C89',
                color: '#ffffff',
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#8DB3A8',
                },
              }}
              onClick={handleItemOpen}
            >
        Add Extra
            </Button>
            <Button
             
              variant="contained"
              sx={{
                backgroundColor: '#6A9C89',
                color: '#ffffff',
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#8DB3A8',
                },
              }}
            >
         Payment
            </Button>
            <Button
           
              variant="contained"
              sx={{
                backgroundColor: '#6A9C89',
                color: '#ffffff',
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#8DB3A8',
                },
              }}

            onClick={handleInvoice}
            >
            Generate Invoice
            </Button>
        
        </Stack>



        <Box mt={4}>
  <Typography variant="h6" gutterBottom>
    Extra Items
  </Typography>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell><strong>Name</strong></TableCell>
        <TableCell><strong>Description</strong></TableCell>
        <TableCell><strong>Price</strong></TableCell>
        <TableCell><strong>Action</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {item.length > 0 ? (
        item.map((row) => (
          <TableRow key={row._id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>${row.price}</TableCell>
            <TableCell>
              <IconButton
                color="primary"
                onClick={() => handleEdit(row)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  handleDelete(row._id);
                 
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} align="center">
            No items added.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</Box>


      </Box>
    </Container>
  );
};

export default BookingDetails;
