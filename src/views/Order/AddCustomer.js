/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, FormLabel, Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddCustomer= ({ open, handleClose }) => {
 
  return (<>

                    <Dialog 
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="scroll-dialog-title"
                      aria-describedby="scroll-dialog-description"
                      >
                         <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <Box sx={{backgroundColor:'red', width:'100%', height:'70vh'}}>



        </Box>
        </Dialog>


  </>
  )
 
}

export default AddCustomer;
      
    
  


 





  