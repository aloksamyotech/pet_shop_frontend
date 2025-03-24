import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Typography,
  Divider,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';

const ViewPurchase = ({ open, handleClose, purchase }) => {
  if (!purchase || !purchase.imageUrl) return null;


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = purchase.imageUrl;
    link.setAttribute('download', `Purchase_${purchase._id}`);
    link.click();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
     
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Purchase Invoice</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />

     
      <DialogContent sx={{ p: 2 }}>
        {purchase.imageUrl.endsWith('.pdf') ? (
          <iframe
            src={purchase.imageUrl}
            width="100%"
            height="500px"
            title="Invoice PDF"
            style={{ border: '1px solid #ddd', borderRadius: '8px' }}
          ></iframe>
        ) : (
          <img
            src={purchase.imageUrl}
            alt="Purchase Invoice"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        )}
      </DialogContent>

     
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
       
        <Box>
          <Button
            onClick={handleDownload}
            color="secondary"
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ViewPurchase;
