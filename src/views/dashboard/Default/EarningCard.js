import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useTranslation } from 'react-i18next';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

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
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();
  const [order, setOrder] = useState(0);

  const fetchOrder = async () => {
    try{
    const response = await getApi(urls.order.getCount);
    if (response?.data) setOrder(response.data.totalOrders || 0);
      else setOrder(0);
    } catch (error) {
      console.error('Error fetching customer count:', error);
      setOrder(0);
    } finally {
      setOrder(0);
    }

  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const { t } = useTranslation();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between"></Grid>{' '}
              </Grid>{' '}
              <Grid item>
                <Grid container alignItems="center"></Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                 <TopRightIcon>
                 <ShoppingBagIcon />
                                                        </TopRightIcon>
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                  
                    mt: 1
                  }}
                >
                  {order}
                </Typography>
              </Grid>
              {/* Display the order count */}
              <Grid item>
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                  
                    mt: 1
                  }}
                >
                 {t('Total Orders')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
