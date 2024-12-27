import react from 'react';
import { Stack, Button, Container, Typography, Card, Box ,Grid, TextField,Breadcrumbs,Divider, CardMedia,Switch} from '@mui/material';
import { Email } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import {  Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Warning } from '@mui/icons-material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';



const CustomerDetail = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();

    const data = [
        { id: 1, name: 'Harsh', address: 'indore', PhoneNumber: '12344557' },
        { id: 2, name: 'Lucky', address: 'city2', PhoneNumber: '12344558' },
        { id: 3, name: 'Kush', address: 'city3', PhoneNumber: '12344559' },
        { id: 4, name: 'lucky', address: 'city4', PhoneNumber: '12344560' },
        { id: 5, name: 'kush', address: 'city5', PhoneNumber: '12344561' },
        { id: 6, name: 'md', address: 'city6', PhoneNumber: '12344562' }
      ];



      const customer = data.find((customer) => customer.id === parseInt(id));
      
      return (
<Grid container>
<TabContext value={value}>

    <Grid sx={{width:'100%'}}>
<Stack direction="row" alignItems="center" mb={5} >
          <Box sx={{backgroundColor:'white', height:'50px' ,width:'100%' ,display:'flex',borderRadius :'10px',justifyContent:'space-between',alignItems:'center',padding:'0 25px',marginTop:'-7px'}}>
            <Breadcrumbs aria-label="breadcrumb">
            <HomeIcon sx={{color:'#2067db'}} fontSize="medium" />
          <Typography variant="h5" sx={{fontWeight:'600px',color:'black'}}>Profile</Typography>
          </Breadcrumbs>
        </Box>
        </Stack>
        </Grid>

  <Grid spacing={2} container md={12} direction="column">  
       <Box sx={{width:'100%', height:'200vh',  p:'4px' , backgroundColor:'white', borderRadius:'10px'}}>


{/* main part */}
    
        
  <Box sx={{ borderBottom: 1  , border:'none'  , width:'120%', display:'flex',justifyContent:'space-between'}}>
          <TabList onChange={handleChange} indicatorColor="none" >
          <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
         
          sx={{
            borderBottom: '1px solid #e0e0e0',
            fontWeight:"bold"

          }}
        >
          <Tab
            icon={<AccountCircleIcon />}
            iconPosition="start"
            label="Profile"
            value="1"
          />
          <Tab
            icon={<InfoIcon />}
            iconPosition="start"
            label="Personal Details"
            value="2"
          />
          <Tab
            icon={<AccountBoxIcon />}
            iconPosition="start"
            label="My Account"
           value="3"
          />
          <Tab
            icon={<LockIcon />}
            iconPosition="start"
            label="Change Password"
            value="4"
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Settings"
            value="5"
          />
        </Tabs>
          </TabList>
        </Box>




{/*information */}
<TabPanel value="1">
<Grid container spacing={1}>
                 <Grid item md={4}>
                <Box sx={{ width:'100%',
                    height:'45vh',border: '1px solid #d3d3d3', borderRadius:'8px'
                }}>

                    

                    <Grid>
                    <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', p :'2px' , width:'100%',height:'15vh'
                    }}>
                       
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'22px'}}>Pet User</Typography>
                    
                    </Box>
                    </Grid>
                    <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>




                    <Grid direction="column" spacing={1}>
                        <Box sx={{width:'100%', height:'10vh', display:'flex',p:'10px', justifyContent:'space-between' , alignItems:'center'}}>

                    <Box style={{display:'flex', alignItems:'center', gap:'8px'}}>     
                   <Email style={{fontSize:'18px'}}/>
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> Email</Typography>


                    </Box>   
                    <Typography sx={{fontSize:'15px'}}>demo1234@gmail.com</Typography>
                    </Box>
                      </Grid>
                 <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>



                 <Grid direction="column" spacing={1}>
                        <Box sx={{width:'100%', height:'10vh', display:'flex',p:'10px', justifyContent:'space-between' , alignItems:'center'}}>

                    <Box style={{display:'flex', alignItems:'center', gap:'8px'}}>     
                    <PhoneIcon style={{fontSize:'18px'}}/>
                    <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}>PhoneNumber</Typography>


                    </Box>   
                    <Typography sx={{fontSize:'15px'}}>9876342516</Typography>
                    </Box>
                      </Grid>
                 <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>




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
                    height:'80vh', border: '1px solid #d3d3d3', borderRadius:'8px'
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
                    height:'50vh', border: '1px solid #d3d3d3', borderRadius:'8px', mt:'10px'
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
                    height:'30vh', border: '1px solid #d3d3d3', borderRadius:'8px', mt:'10px'
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
        </TabPanel>

{/*Persona Details */}
<TabPanel value="2">
<Grid container spacing={2}>


<Grid item md={6}>
  <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',height:'60vh'}}>

  <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}>  
                    
                    <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Personal Information</Typography>
                   
                   </Box>
                     <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>



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





 <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px',height:'60vh',mt:'15px'}}>
 <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}> 


                    
                    <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Social Information</Typography>
                   
                   </Box>
                     <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>

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
  <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px', width:'100%' ,height:'60vh'}}>

  <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px '}}>  
                    
                    <Typography sx={{fontWeight:"bold",fontSize:'15px'}}> Contact Information</Typography>
                   
                   </Box>
                     <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>



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
</TabPanel>

 {/*My account */}
   <TabPanel value="3">
   <Grid container>
     <Box sx={{width:'100%' , height:'400vh', backgroundColor:'white', p:'35px'}}>
       <Grid item md={12}>
         <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px', width:'100%' ,height:'50vh', p:'20px'}}>
   
         <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px'}}>  
                         
                         <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> General Setting</Typography>
                        
                        </Box>
                          <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>
   
   
   
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
   
   
   <Box  sx={{border: '1px solid #d3d3d3', borderRadius:'8px', width:'100%' ,height:'60vh', p:'20px' , mt:'10px'}}>
   <Box sx={{width:'100%', height:'10vh', display:'flex', p:'15px'}}>  
                         
                         <Typography sx={{fontFamily:'-moz-initial',fontWeight:"400px",fontSize:'18px'}}> Advance Setting</Typography>
                        
                        </Box>
                          <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>
   
   
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
   <Divider sx={{backgroundColor:'black',borderWidth:'1px'}}/>
   
   
   
   
   </Box>
   
       </Grid>
   
     </Box>
     
   </Grid>
   </TabPanel>
       
    {/*Change password */}   
    <TabPanel value="4">
    <Grid  container>
      <Box  sx={{width:'100%' , height:'100vh', backgroundColor:'white', p:'10px'}}>
    
    
      <Box sx={{width:'100%' , height:'10vh', border: '2px dotted #bfab59', borderRadius:'8px', display:'flex', justifyContent:'center', alignItems:'center', p:'30px'}} > 
    <Box>
    
    <Typography> <Warning sx={{ color: '#ffc107', marginRight: '8px' }} /></Typography></Box>
    
    <Box>
    <Typography>Your Password will expire in every 3 months. So change it periodically. Do not share your password</Typography></Box>
      </Box>
     
    
      <Box sx={{border: '1px solid #d3d3d3', borderRadius:'8px', width:'100%', height:'50vh' , mt:'20px', p:'10px'}}> 
    
    
    
    
      <Box sx={{width:'100%', height:'10vh', display:'flex' , p:'10px'}}>  
                          
         <Typography sx={{fontFamily:'-moz-initial',fontWeight:"bold",fontSize:'15px'}}> Change Password</Typography>
        
        </Box>
          <Divider sx={{backgroundColor:'black',borderWidth:'1px', width:'100%'}}/>
    
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
    </TabPanel>
    
        </Box> 
        </Grid>
        </TabContext>
    </Grid>
    );
};

export default CustomerDetail;

