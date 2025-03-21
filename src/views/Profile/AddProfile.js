import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { updateApi } from 'views/Api/comman';

const AddTask = ({ open, handleClose, userData }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    company: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await updateApi('/user/update', formData); // Call update API
      if (response.success) {
        localStorage.setItem('name', formData.firstname);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('company', formData.company);
        localStorage.setItem('phoneNumber', formData.phoneNumber);

        alert('User updated successfully!');
        handleClose();
      } else {
        alert('Update failed!');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit User Details</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Email" name="email" value={formData.email} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Company" name="company" value={formData.company} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
