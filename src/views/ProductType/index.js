import { useState } from 'react';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { urls } from 'views/Api/constant';
import { getApi } from 'views/Api/comman';

const PolicyManagement = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const selectedCustomer = location.state?.selectedCustomer || null;
  const [orderDate , setOrderDate] = useState();

 
  console.log('selectedCustomer----------', selectedCustomer);

  
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);


  useEffect( async ()=>{
const response = await getApi(urls.order.get);
console.log('order',response.data.data[0].createdAt)
setOrderDate(response.data.data[0].createdAt);
   },[])

 
  const date = new Date(orderDate);
   const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
   console.log(formattedDate)
 

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '80%',
          minHeight: '100vh',
          padding: '15px',
          
        }}
      >
      
      <Box
       
  sx={{
  backgroundColor:'#9053bc',
    height: '20vh',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}
>

  <Box>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJYkrPXmUAtG_7-3eByMmjjd8B-i3C0LLUg&s"
      alt="Sample"
      style={{ width: '20%', height: 'auto' }}
    />
    <Box>
    <Typography sx={{color:'#fff'}}>
      <strong>Invoice Id:</strong> pet-2765
    </Typography>
    <Typography sx={{color:'#fff'}}>
      <strong>Date:</strong> {formattedDate}
    </Typography>
  </Box>
  </Box>

  
  

  
  <Box
    sx={{
      width: '30%',
      display: 'flex',
      justifyContent: 'flex-start',
      textAlign: 'right',
    }}
  >
    <Typography sx={{color:'#fff'}}>
      The Pet Stop<br />
      1234 Happy Paws Street 87876<br />
      United States
    </Typography>
  </Box>
</Box>


        
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ marginBottom: '10px' }}>
          <Typography sx={{fontWeight: 'bold', mb: 1 }}>
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

        <Divider/>
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
                <TableHead sx={{backgroundColor:'#9053bc'}}>
                  <TableRow sx={{ fontWeight: 'bold'  }}>
                    <TableCell sx={{ color: 'white' }} >Product Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                    <TableCell sx={{ color: 'white' }} >Price</TableCell>
                    <TableCell sx={{ color: 'white' }}>Discount (%)</TableCell>
                    <TableCell sx={{ color: 'white' }}>Category Name</TableCell>
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

          <Box sx={{display:'flex',justifyContent:'end',padding:'10px'}}>
            <Typography sx={{fontWeight:'bold'}}> Total: 
            Rs.{totalPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:"flex-end" ,}}>
        <Button sx={{ border:'2px solid' , backgroundColor:'#6d42b9' ,padding:'5px', color:'#fff' , "&:hover" : {backgroundColor:'#6d42b9'}}}>Print</Button>
        </Box>
        <Box>
          <Typography sx={{color:'gray', padding:'10px'}}>Thank you for visiting our shop! We truly appreciate your trust in us to care for your beloved pets. We look forward to serving you again soon!</Typography>
        </Box>
      </Box>
    </>
  );
};

export default PolicyManagement;
