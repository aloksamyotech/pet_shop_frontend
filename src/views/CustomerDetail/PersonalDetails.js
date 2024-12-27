import react from 'react'
import { Stack, Button, Container, Typography, Card, Box ,Grid, TextField,Breadcrumbs,Divider, CardMedia, Switch} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';






const PersonalDetails =() =>{
    return<>
    
    
<Grid container spacing={2}>


  <Grid item md={6}>
    <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%' ,height:'60vh'}}>

    <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}>  
                      
                      <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Personal Information</Typography>
                     
                     </Box>
                       <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>



 <Box sx={{p:'15px', display:'flex', flexDirection:'row', gap:'6px'}} >

<TextField 
    label="Name" 
    variant="outlined" 
    sx={{ width: '50%' }} 
  />
      
<TextField
label="Location"
variant='outlined'
sx={{width:'50%' }}
/> 
</Box>





<Box sx={{display:'flex', flexDirection:'row', p:'15px'}} >

<TextField 
    label="Bio" 
    variant="outlined" 
    sx={{ width: '100%'}} 
  />
      </Box>


<Box sx={{p:'15px'}}>
      <TextField
label="Experience"
variant='outlined'
sx={{width:'50%' }}
/> 
</Box>
   </Box>





   <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%' ,height:'60vh',mt:'15px'}}>
   <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}> 


                      
                      <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Social Information</Typography>
                     
                     </Box>
                       <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>

                       <Box sx={{ p: '15px' }}>
  
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 3, 
    }}
  >
    <FacebookIcon sx={{ color: '#4267B2', fontSize: '40px', mr: 2 }} />
    <TextField
      label="Facebook Profile URL"
      variant="outlined"
      sx={{ width: '50%', mr: 2 }}
    />
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#4267B2',
        color: 'white',
        ':hover': { backgroundColor: '#365899' },
      }}
    >
      Connect
    </Button>
  </Box>

 
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 3,
    }}
  >
    <TwitterIcon sx={{ color: '#1DA1F2', fontSize: '40px', mr: 2 }} />
    <TextField
      label="Twitter Profile URL"
      variant="outlined"
      sx={{ width: '50%', mr: 2 }}
    />
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#1DA1F2',
        color: 'white',
        ':hover': { backgroundColor: '#1A91DA' },
      }}
    >
      Connect
    </Button>
  </Box>

  
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <LinkedInIcon sx={{ color: '#0077B5', fontSize: '40px', mr: 2 }} />
    <TextField
      label="LinkedIn Profile URL"
      variant="outlined"
      sx={{ width: '50%', mr: 2 }}
    />
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0077B5',
        color: 'white',
        ':hover': { backgroundColor: '#005983' },
      }}
    >
      Connect
    </Button>
  </Box>
</Box>



   </Box>
 </Grid>





 <Grid item md={6}>
    <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%' ,height:'60vh'}}>

    <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}>  
                      
                      <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Contact Information</Typography>
                     
                     </Box>
                       <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>



 <Box sx={{p:'15px', display:'flex', flexDirection:'row', gap:'6px'}} >

<TextField 
    label="Contact Phone" 
    variant="outlined" 
    sx={{ width: '50%' }} 
  />
      
<TextField
label="Email"
variant='outlined'
sx={{width:'50%' }}
/> 
</Box>





<Box sx={{display:'flex', flexDirection:'row', p:'15px'}} >

<TextField 
    label="Portfolio Url" 
    variant="outlined" 
    sx={{ width: '100%'}} 
  />
      </Box>


<Box sx={{p:'15px'}}>

      <TextField
label="Address"
variant='outlined'
sx={{width:'50%' }}
/> 
</Box>
   </Box>
 </Grid>

</Grid> 
    </>
}

export default PersonalDetails;