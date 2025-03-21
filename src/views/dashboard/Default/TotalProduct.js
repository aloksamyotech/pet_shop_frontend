import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  color: '#6A9C89', // Green color for text
  overflow: 'hidden',
  position: 'relative',
  border: '1px solid #6A9C89' // Green border
}));

const TopRightIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#6A9C89',
  borderRadius: '50%',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    color: 'white',
    fontSize: '2rem'
  }
}));
// ==============================|| DASHBOARD - TOTAL COMPANY CARD ||============================== //

const TotalProduct = ({ isLoading }) => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchCustomer = async () => {
    try {
      const response = await getApi(urls.product.getCount);
    
     if (response  && response?.data?.totalProducts) {
        setCustomer(response.data.totalProducts|| 0);
      } else {
        console.error('Invalid API response:', response);
        setCustomer(0); 
      }
    } catch (error) {
      console.error('Error fetching customer count:', error);
      setCustomer(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      {isLoading || loading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                     <TopRightIcon>
                     <StoreIcon />
                                        </TopRightIcon>
                    <Typography
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        mt: 1
                      }}
                    >
                      {customer !== null ? customer : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                     sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      mt: 1
                    }}
                    >
                      Total Product
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalProduct.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalProduct;
