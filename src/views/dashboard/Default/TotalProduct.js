import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
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
                    <Typography
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#fff',
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
                      color: '#fff',
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
