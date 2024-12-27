/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, CardContent, CardActions ,Grid,CardMedia} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import AddEmails from './AddCard';
// ----------------------------------------------------------------------

const Emails =({ SelectedCard}) =>{
  console.log("SelectedCard========", SelectedCard);
  return (
    // <>
    // <Card sx={{maxWidth:'500px' ,margin:'20px auto' , height:"80vh"}}>
    //   <CardContent>
    //     <CardActions>
    //       <Box sx={{width:'100%', height:'40px' ,marginTop:'-35px' ,border:'1px solid' ,borderRadius:'5px'}}> 
    //         <Typography   variant='h5' sx={{display:'flex', justifyContent:'center',alignContent:'center',padding:'10px'}}>Add Items</Typography>
    //        </Box>
    //     </CardActions>
    //     <Grid  sx={{display:'flex', flexDirection:'column',minHeight:'55vh',justifyContent:"flex-end"}}>
    //       <Card >
    //         <CardActions sx={{marginBottom:'-20px'}}>
    //           <Box sx={{ width:'34%', border:'solid 1px'}}><Typography sx={{marginLeft:'10px '}}>Net:</Typography>
    //           <Typography sx={{marginLeft:'10px '}}>0.00$</Typography></Box>

    //           <Box sx={{  width:'34%', border:'solid 1px'}}><Typography sx={{marginLeft:'10px '}}>Discount(0%):</Typography>
    //           <Typography sx={{marginLeft:'10px '}}>0.00$  (Apply)</Typography></Box>
    //           <Box sx={{  width:'34%', border:'solid 1px'}}><Typography  sx={{marginLeft:'10px '}}>Tax::</Typography>
    //           <Typography sx={{marginLeft:'10px '}}>0.00$</Typography></Box> 
              
    //         </CardActions>
    //         <Box sx={{width:'100%', height:'40px' ,marginTop:'0px' ,border:'1px solid' ,borderRadius:'5px'}}> 
    //         <Typography   variant='h5' sx={{display:'flex', justifyContent:'center',alignContent:'center',padding:'1px'}}>Total :</Typography>
    //         <Typography   variant='h5'  sx={{display:'flex', justifyContent:'center',alignContent:'center',marginBottom:'1px'}}>0.00$</Typography>
    //        </Box>
    //       </Card>

         
    //     </Grid>
    //   </CardContent>

    // </Card>
    // </>

    <>
    <Card sx={{ maxwidth:'500vh',  height: '80vh', display: 'flex', flexDirection: 'column' ,margin:'20px auto'
    
   }}>
    
      {/* Header Section */}
      <CardActions>
        <Box
          sx={{
            width: '100%',
            height: '40px',
            marginTop: '0',
            border: '1px solid',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <Typography variant="h5">Add Items</Typography>
        </Box>
      </CardActions>

{/*add the card */}

<Card sx={{border:'1px solid' , maxwidth:'50vh',margin:'20px'}}>


<CardContent>
  <Grid container  spacing={2}>
    <Grid item xs={12} sm={6}>

{SelectedCard ? (<Card sx={{maxwidth : '150px', margin :'auto'}}>
        <CardMedia
        component="img"
                height="100"
                image={SelectedCard.image}
                sx={{ width: '100px',padding:'10px' }}
                alt={SelectedCard.title} 
                />
                
                <Grid item xs={12} sm={6}>
                  <CardContent>
        <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >{SelectedCard.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "#1859d0",
                  }}
                > {SelectedCard.price}
                </Typography>
                </CardContent> 
                </Grid>
            </Card>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#888",
              }}
            ><Typography variant="h6">Select a card to display</Typography>
            </Box>
          )}
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Typography>
            {SelectedCard.title}
            </Typography>

          </Grid> */}

</Grid>
</CardContent>

</Card>





      {/* Content Section */}
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '65vh',
        }}
      >
        <Card>
         
          <CardActions sx={{ justifyContent: 'space-between', paddingX: 2 }}>
            <Box sx={{ width: '32%', border: '1px solid', borderRadius: '5px', padding: "1px"  }}>
              <Typography sx={{ marginLeft: '5px' }}>Net:</Typography>
              <Typography sx={{ marginLeft: '5px' }}>0.00$</Typography>
            </Box>

            <Box sx={{ width: '32%', border: '1px solid', borderRadius: '5px',  padding: "1px" }}>
              <Typography sx={{ marginLeft: '5px' }}>Discount:</Typography>
              <Typography sx={{ marginLeft: '5px' }}>0.00$ </Typography>
            </Box>

            <Box sx={{ width: '32%', border: '1px solid', borderRadius: '5px',  padding: "1px"}}>
              <Typography sx={{ marginLeft: '5px' }}>Tax:</Typography>
              <Typography sx={{ marginLeft: '5px' }}>0.00$</Typography>
            </Box>
          </CardActions>

         
          <CardActions>
          <Box
            sx={{
              width: '100%',
              height:'6vh',
              marginTop: '-45px',
              border: '1px solid',
              borderRadius: '8px',
              padding: '6px',
              textAlign: 'center',
            }}
          >
            <Typography variant="p"  >Total:</Typography>
            <Typography variant="p" >0.00$</Typography>
          </Box>
          </CardActions>
        </Card>
      </Box> */}
   
  </Card>
 
</>

  )
} 

export default Emails;
