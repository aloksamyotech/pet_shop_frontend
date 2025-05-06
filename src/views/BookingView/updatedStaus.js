import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  RadioGroup, FormControlLabel, Radio, Button, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import { toast } from 'react-toastify';
import { fontSize } from '@mui/system';

const ChangeStatus = ({ open, handleClose, id, fetchData,bookingData}) => {
  const [status, setStatus] = useState('');
  const [wasUpdated, setWasUpdated] = useState(false);


 const handleUpdate = async () => {
    try {
      await updateApi(urls.registration.updatedStatus.replace(":id", id), { status });
      toast.success('Status updated successfully!');
      await fetchData();      
      handleClose();          
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status.');
    }
  };
  
  useEffect(() => {
    if (bookingData?.status) {
      setStatus(bookingData.status);
    }
  }, [bookingData]);
  

  useEffect(() => {
    if (!open && wasUpdated) {
      fetchData();
      setWasUpdated(false); 
    }
  }, [open, wasUpdated, fetchData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 , fontSize:'15px'}}>
        Change Status
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <RadioGroup
          row
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <FormControlLabel value="pending" control={<Radio />} label="Pending" />
          <FormControlLabel value="approved" control={<Radio />} label="Approved" />
          <FormControlLabel value="rejected" control={<Radio />} label="rejected" />
          <FormControlLabel value="completed" control={<Radio />} label="completed" />
        </RadioGroup>
      </DialogContent>

      <DialogActions>
          <Button
                         variant="contained"
                      sx={{
                        backgroundColor: '#6A9C89',
                        color: '#ffffff',
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#8DB3A8',
                        },
                      }}
                      onClick={handleUpdate}
                    >
      
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeStatus;
