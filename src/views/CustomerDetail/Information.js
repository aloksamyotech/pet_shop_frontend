import react from 'react'
import { Stack, Button, Container, Typography, Card, Box ,Grid, TextField,Breadcrumbs,Divider, CardMedia} from '@mui/material';
import { Email, TwentyOneMpOutlined } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import Password from './Information';
import { useParams } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useState } from 'react';



const MyInformation = () =>{

return <>
  
  <Grid container spacing={1}>
                 <Grid item md={4}>
                <Box sx={{ width:'100%',
                    height:'45vh',border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)'
                }}>

                    

                    <Grid>
                    <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', p :'2px' , width:'100%',height:'15vh'
                    }}>
                       
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'22px'}}>Pet User</Typography>
                    
                    </Box>
                    </Grid>
                    <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>




                    <Grid direction="column" spacing={1}>
                        <Box sx={{width:'100%', height:'10vh', display:'flex',p:'10px', justifyContent:'space-between' , alignItems:'center'}}>

                    <Box style={{display:'flex', alignItems:'center', gap:'8px'}}>     
                   <Email style={{fontSize:'18px'}}/>
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> Email</Typography>


                    </Box>   
                    <Typography sx={{fontSize:'15px'}}>demo1234@gmail.com</Typography>
                    </Box>
                      </Grid>
                 <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>



                 <Grid direction="column" spacing={1}>
                        <Box sx={{width:'100%', height:'10vh', display:'flex',p:'10px', justifyContent:'space-between' , alignItems:'center'}}>

                    <Box style={{display:'flex', alignItems:'center', gap:'8px'}}>     
                    <PhoneIcon style={{fontSize:'18px'}}/>
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}>PhoneNumber</Typography>


                    </Box>   
                    <Typography sx={{fontSize:'15px'}}>9876342516</Typography>
                    </Box>
                      </Grid>
                 <Divider sx={{backgroundColor:'black',borderWidth:'1.5px'}}/>




                 <Grid direction="column" spacing={1}>
                        <Box sx={{width:'100%', height:'10vh', display:'flex',p:'10px', justifyContent:'space-between' , alignItems:'center'}}>

                    <Box style={{display:'flex', alignItems:'center', gap:'8px'}}>     
                   <LocationOnIcon style={{fontSize:'18px'}}/>
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> Location</Typography>


                    </Box>   
                    <Typography sx={{fontSize:'15px'}}>Indore</Typography>
                    </Box>
                      </Grid> </Box>

            </Grid>


               <Grid item md={8}>
                <Box sx={{ width:'100%',
                    height:'80vh', border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)'
                }}>

                <Box sx={{width:'100%', height:'10vh', display:'flex', justifyContent:'space-between',p:'15px', alignItems:'center'}}><Typography sx={{fontWeight:'bold'}}>About me</Typography>
                <EditIcon style={{ color: "blue", fontSize: "24px" }} />
                </Box>
                <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>


                <Box sx={{p:'25px' , display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography>Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.</Typography>
                </Box>

                <Box sx={{p:'15px' , display:'flex',fontWeight:'bold'}}>Personal Details</Box>






<Box sx={{ width: '70%', p: '20px' }}>
  <Grid container direction="column" spacing={2}>
    {[
      { label: 'Full Name', value: 'Lucky Demo' },
      { label: 'Father Name', value: 'Mr. Deepen Handgun' },
      { label: 'Address', value: 'Street 110-B Kalians Bag, Dewan, M.P. INDIA' },
      { label: 'Zip Code', value: '12345' },
      { label: 'Phone', value: '+0 123456789, +0 123456789' },
      { label: 'Email', value: 'demo1234@gmail.com' },
    ].map((item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '7vh',
          p:'15px'
        }}
      >
        <Typography
          sx={{
            
            fontWeight: 'bold',
            fontSize: '15px',
            width: '30%', 
          }}
        >
          {item.label}
        </Typography>
        <Typography sx={{ width: '5%' }}>:</Typography>
        <Typography
          sx={{
            fontSize: '15px',
            width: '65%', 
          }}
        >
          {item.value}
        </Typography>
      </Box>
    ))}
  </Grid>
</Box>

               </Box>

<Box  sx={{ width:'100%',
                    height:'50vh', border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', mt:'10px'
                }}>
                   <Box sx={{p:'15px' , display:'flex'}}>Education</Box>
                   <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>

               <Box sx={{ width: '70%', p: '20px' }}>
  <Grid container direction="column" spacing={2}>
    {[
      { label: 'Master Degree', value: 'Master Degree in Computer Application' },
      { label: 'Bachelor', value: 'Bachelor Degree in Computer Engineering' },
      { label: 'School', value: 'Higher Secondary Education' },
     
    ].map((item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '7vh',
          p:'25px'
        }}
      >
        <Typography
          sx={{
            
            fontWeight: 'bold',
            fontSize: '15px',
            width: '50%', 
          }}
        >
          {item.label}
        </Typography>
       
        <Typography
          sx={{
            fontSize: '15px',
            width: '100%', 
          }}
        >
          {item.value}
        </Typography>
      </Box>
    ))}
  </Grid>
</Box>
</Box> 



<Box  sx={{ width:'100%',
                    height:'30vh', border: '1px solid #d3d3d3', borderRadius:'8px',boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)', mt:'10px'
                }}>
                   <Box sx={{p:'15px' , display:'flex'}}>Employment</Box>
                   <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>

               <Box sx={{ width: '70%', p: '20px' }}>
  <Grid container direction="column" spacing={2}>
    {[
      { label: 'Current', value: 'Senior UI/UX designer' },
      { label: 'Junior', value: 'Trainee cum Project Manager' },
     
    ].map((item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '7vh',
          p:'25px'
        }}
      >
        <Typography
          sx={{
           
            fontWeight: 'bold',
            fontSize: '15px',
            width: '50%', 
          }}
        >
          {item.label}
        </Typography>
       
        <Typography
          sx={{
            fontSize: '15px',
            width: '100%', 
          }}
        >
          {item.value}
        </Typography>
      </Box>
    ))}
  </Grid>
</Box>
</Box> 


            </Grid> 
        </Grid>




    </>
}


export default MyInformation ;