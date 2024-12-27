import react from "react";
import{Box,Grid} from  '@mui/material'
import FoodCart  from "./FoodCart";
import Food from './Food'


const FoodGrid =({Food ,onAddToCart})=>{
 return(<>
    <Box
    sx={{height:"600px",
        borderRadius:'8px',
 flex: 1, overflowY: 'auto'
 }}
 >
 <Grid container spacing={1}>
            {Food.map((Foods)=>(
                <Grid item xs={4} key={Foods.id}>
                    <FoodCart 
                    title={Foods.title}
                    image={Foods.image}
                    price={Foods.price}
                    onAddToCart={()=> onAddToCart(Foods)}
                     />
  </Grid> ))

     }
</Grid>
</Box>
</>)
}

export default FoodGrid;