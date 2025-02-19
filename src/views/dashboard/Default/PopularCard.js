import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Project imports
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

// ==============================|| NEW POPULAR STOCKS CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getApi(urls.product.get);
        setProducts(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
          
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold">
                Product Stocks
              </Typography>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleClose}>Today</MenuItem>
                <MenuItem onClick={handleClose}>This Month</MenuItem>
                <MenuItem onClick={handleClose}>This Year</MenuItem>
              </Menu>
            </Grid>

            <Divider sx={{ my: 2 }} />

        
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Available Stock
            </Typography>
            {products.map((product) => (
              <Box key={product._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    mr: 2
                  }}
                >
                  {Math.random() > 0.5 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.quantity || 'N/A'} in stock
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
