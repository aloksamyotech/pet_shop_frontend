import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// material-ui
import { Box, Grid, Typography, Card, CardActionArea } from '@mui/material';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import BusinessIcon from '@mui/icons-material/Business';
// project imports
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// Styled card
const StyledCard = ({ children, onClick }) => (
  <Card
    sx={{
      color: '#6A9C89',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #6A9C89',
      borderRadius: '12px',
      cursor: 'pointer',
      '&:hover': { boxShadow: '0 4px 15px rgba(106, 156, 137, 0.5)' }
    }}
  >
    <CardActionArea onClick={onClick}>{children}</CardActionArea>
  </Card>
);

// Total Customer Component
const ShowOrder = ({ isLoading }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch customer count
  const fetchCustomer = async () => {
    try {
      const response = await getApi(urls.customer.getCount);
      if (response?.data?.count) setCustomer(response.data.count || 0);
      else setCustomer(0);
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

  // Navigate to customer section
  const handleNavigate = () => navigate('/dashboard/history');

  return (
    <>
      {isLoading || loading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <StyledCard onClick={handleNavigate}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            {/* Left Icon Section */}
            <Box
              sx={{
                backgroundColor: '#6A9C89',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <ShoppingBagIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </Box>

            {/* Right Text Section */}
            <Grid container direction="column" justifyContent="center">
              
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: '#6A9C89',
                  fontWeight: 600
                }}
              >
           Order History
              </Typography>
            </Grid>
          </Box>
        </StyledCard>
      )}
    </>
  );
};

ShowOrder.propTypes = {
  isLoading: PropTypes.bool
};

export default ShowOrder;
