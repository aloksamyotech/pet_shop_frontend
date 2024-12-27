

import react from 'react'
import { Stack, Button, Container, Typography, Card, Box ,Grid, TextField,Breadcrumbs,Divider, CardMedia, Switch} from '@mui/material';

const Account = () =>{

    return<>


<Grid container>
  <Box sx={{width:'100%' , height:'400vh', backgroundColor:'white', p:'35px'}}>
    <Grid item md={12}>
      <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%' ,height:'50vh', p:'20px'}}>

      <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px'}}>  
                      
                      <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> General Setting</Typography>
                     
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
<Box sx={{p:'15px', display:'flex', flexDirection:'row', gap:'6px'}} >

<TextField 
    label="language" 
    variant="outlined" 
    sx={{ width: '50%' }} 
  />
      
<TextField
label="Signing Using"
variant='outlined'
sx={{width:'50%' }}
/> 
</Box>




       
        
        
        
        </Box> 


<Box  sx={{border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', width:'100%' ,height:'60vh', p:'20px' , mt:'10px'}}>
<Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px'}}>  
                      
                      <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> Advance Setting</Typography>
                     
                     </Box>
                       <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>


<Box sx={{mt:'10px'}}>

<Box sx={{p:"10px"}}>


  <Typography sx={{fontFamily:'-moz-initial',fontWeight:"bold",fontSize:'18px'}}>Secure Browsing</Typography>
  
  <Typography> <Switch  />  Browsing Securely when necessary
  </Typography>
</Box>


<Box sx={{p:"10px"}}>


  <Typography sx={{fontFamily:'-moz-initial',fontWeight:"bold",fontSize:'18px'}}>Login Notifications</Typography>
  
  <Typography> <Switch  />  Notify when login attempted from other place
  </Typography>
</Box>

<Box sx={{p:"10px"}}>


  <Typography sx={{fontFamily:'-moz-initial',fontWeight:"bold",fontSize:'18px'}}>Login Approval</Typography>
  
  <Typography> <Switch  />  Approvals is not required when login from unrecognized devices.
  </Typography>
</Box>

</Box>
<Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>




</Box>

    </Grid>

  </Box>
  
</Grid>

    </>
}

export default Account;