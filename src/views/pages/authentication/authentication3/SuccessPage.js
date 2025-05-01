import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { CheckCircleOutline as SuccessIcon } from '@mui/icons-material';

const SuccessPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Box >
      
        <SuccessIcon style={{ fontSize: '80px', color: '#4caf50', marginBottom: '20px' }} />
        
       
        <Typography variant="h4" gutterBottom>
          Your Form Has Been Successfully Submitted!
        </Typography>

      
        <Typography variant="body1" paragraph>
          Thank you for reaching out to us! Your registration has been successfully processed. 
          We will get back to you soon. If you have any related queries, please contact us.
        </Typography>

      
        <Typography variant="h6" color="primary" paragraph>
          For any related queries, contact us at: 
          <strong style={{ fontSize: '20px' }}>+91 123 456 7890</strong>
        </Typography>

     
      </Box>
    </Container>
  );
};

export default SuccessPage;
