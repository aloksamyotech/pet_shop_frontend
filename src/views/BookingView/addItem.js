import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton, Stack, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { postApi, updateApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import { toast } from 'react-toastify';

const AddItemDialog = ({ open, handleClose, id, AddItemData, updatedItem, editData }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

 
  useEffect(() => {
    if (open) {
      if (editData && updatedItem) {
     
        setItemName(updatedItem.name || '');
        setDescription(updatedItem.description || '');
        setPrice(updatedItem.price || '');
      } else {
   
        resetForm();
      }
    }
  }, [open, editData, updatedItem]);

  const resetForm = () => {
    setItemName('');
    setDescription('');
    setPrice('');
  };

  const handleSubmit = async () => {
    const itemPayload = {
      name: itemName,
      description,
      price: parseFloat(price),
      customerId: id
    };

    try {
      if (editData && updatedItem?._id) {
        await updateApi(urls.AddItem.update.replace(':id', updatedItem._id), itemPayload);
        toast.success('Item updated successfully!');
      } else {
        await postApi(urls.AddItem.create, itemPayload);
        toast.success('Item added successfully!');
      }

      AddItemData();
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Item Submit Error:', error);
      toast.error(error?.response?.data?.message || 'Operation failed');
    }
  };

  const handleCancel = () => {
    handleClose();
    resetForm();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{editData ? 'Edit Item' : 'Add Item'}</Typography>
        <IconButton onClick={handleCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="Item Name"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', pr: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#6A9C89',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#8DB3A8'
            }
          }}
        >
          {editData ? 'Update' : 'Add'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            border: '1px solid #6A9C89',
            color: '#6A9C89',
            '&:hover': {
              border: '1px solid #6A9C89',
              color: '#6A9C89'
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
