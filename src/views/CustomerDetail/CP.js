import react from 'react'
import { Stack, Button, Container, Typography, Card, Box ,Grid, TextField,Breadcrumbs,Divider, CardMedia, Switch} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { Warning } from '@mui/icons-material';






const CP = ()=>{

    return<>

<Grid  container>
  <Box  sx={{width:'100%' , height:'100vh', backgroundColor:'white', p:'10px'}}>


  <Box sx={{width:'100%' , height:'10vh', border: '2px dotted #bfab59', borderRadius:'8px', display:'flex', justifyContent:'center', alignItems:'center', p:'30px'}} > 
<Box>

<Typography> <Warning sx={{ color: '#ffc107', marginRight: '8px' }} /></Typography></Box>

<Box>
<Typography>Your Password will expire in every 3 months. So change it periodically. Do not share your password</Typography></Box>
  </Box>
 

  <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%', height:'50vh' , mt:'20px', p:'10px'}}> 




  <Box sx={{width:'100%', height:'10vh', display:'flex' , p:'10px'}}>  
                      
     <Typography sx={{fontFamily:'-moz-initial',fontWeight:"bold",fontSize:'15px'}}> Change Password</Typography>
    
    </Box>
      <Divider sx={{backgroundColor:'black',borderWidth:'1.5px', width:'100%'}}/>

<Box sx={{p:'15px', display:'flex', flexDirection:'row', gap:'6px'}} >

<TextField 
    label="Current Password" 
    variant="outlined" 
    sx={{ width: '50%' }} 
  />
      
<TextField
label="New Password"
variant='outlined'
sx={{width:'50%' }}
/>
</Box>


<Box sx={{ display:'flex', flexDirection:'row', gap:'6px'}} >
<TextField
label="Confirm Password"
variant='outlined'
sx={{width:'50%'}}
/>
</Box>



<Box sx={{display:'flex', justifyContent:'flex-end'}}>
  <Button sx={{ border:'1px' , backgroundColor:'#698dff', color:'white'}}>Change Password</Button>
  <Button sx={{color:'red'}}>Clear</Button>
</Box>



</Box>

  


  </Box>

</Grid>
  
    </>
}

// export default  CP;{/* main part */}
// <Grid container spacing={1} sx={{ p: 2 }}>
{/* <TabList>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      borderRadius: '10px',
      padding: '10px',
    }}
  >
    
    <Box sx={{ display: 'flex', alignItems: 'center' }}>

      
      <AccountCircleIcon sx={{ fontSize: '24px', marginRight: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
        Profile
      </Typography>
      
    </Box>

    
    <Box sx={{ display: 'flex', alignItems: 'center' }} >
              
      
      <InfoIcon sx={{ fontSize: '24px', marginRight: 1 }}  />
      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
        Personal Details
      </Typography>
    
    </Box>

   
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    
      <AccountBoxIcon sx={{ fontSize: '24px', marginRight: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
        My Account
      </Typography>
     
    </Box>

    
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
      <LockIcon sx={{ fontSize: '24px', marginRight: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }} >
        Change Password
      </Typography>
       </Box>

   
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SettingsIcon sx={{ fontSize: '24px', marginRight: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
        Settings
      </Typography>
    </Box>
   
  </Box> 
</TabList> */}
