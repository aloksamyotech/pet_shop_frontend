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
  const [errors, setErrors] = useState({});
  const user = localStorage.getItem('user');
 const userObj = user ? JSON.parse(user) : null;
 const currencySymbol = userObj.currencySymbol;

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
    setErrors({});
  };

  // const validate = () => {
  //   const newErrors = {};

  //   // Validate Item Name
  //   const nameWords = itemName.trim().split(/\s+/);
  //   if (!itemName.trim()) {
  //     newErrors.itemName = 'Item name is required';
  //   } else if (nameWords.length > 5) {
  //     newErrors.itemName = 'Maximum 5 words allowed';
  //   }

  //   // Validate Description
  //   const descWords = description.trim().split(/\s+/);
  //   if (!description.trim()) {
  //     newErrors.description = 'Description is required';
  //   } else if (descWords.length > 10) {
  //     newErrors.description = 'Maximum 10 words allowed';
  //   }

  //   // Validate Price
  //   const priceValue = parseFloat(price);
  //   if (!price.trim()) {
  //     newErrors.price = 'Price is required';
  //   } else if (isNaN(priceValue)) {
  //     newErrors.price = 'Price must be a number';
  //   } else if (priceValue > 10000) {
  //     newErrors.price = 'Maximum allowed price is 1000';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  
  const validate = () => {
    const newErrors = {};
  
 
    if (!itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    } else if (itemName.length > 20) {
      newErrors.itemName = 'Maximum 20 characters allowed';
    }
  
   
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length > 40) {
      newErrors.description = 'Maximum 40 characters allowed';
    }
  
   
    if (!price) {
      newErrors.price = 'Price is required';
    } else {
      const priceValue = parseFloat(price);
      if (isNaN(priceValue)) {
        newErrors.price = 'Price must be a number';
      } else if (priceValue > 10000) {
        newErrors.price = 'Maximum allowed price is 10000';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;

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
  onChange={(e) => {
    const value = e.target.value;
    const onlyLetters = /^[A-Za-z\s]*$/;

    if (onlyLetters.test(value)) {
      setItemName(value);
      setErrors((prev) => ({ ...prev, itemName: '' }));
    } else {
      setErrors((prev) => ({ ...prev, itemName: 'Only letters allowed' }));
    }
  }}
  inputProps={{ maxLength: 20 }}
  error={!!errors.itemName}
  helperText={errors.itemName}
/>


<TextField
  label="Description"
  fullWidth
  multiline
  rows={3}
  value={description}
  onChange={(e) => {
    const value = e.target.value;
    setDescription(value);
    setErrors((prev) => ({ ...prev, description: '' }));
  }}
  inputProps={{ maxLength: 40 }}
  error={!!errors.description}
  helperText={errors.description}
/>


    <TextField
            label={`Price(${currencySymbol})`}
            fullWidth
            type="number"
            inputProps={{ min: 0, max: 100000}}
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && parseFloat(value) <= 100000) {
                setPrice(value);
              }
            }}
            error={!!errors.price}
            helperText={errors.price}
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
