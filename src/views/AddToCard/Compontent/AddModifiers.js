
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
import { FormControl, FormHelperText, FormLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
// import { useState, useEffect } from 'react';
// import { apiget, apipost } from '../../service/api'

const AddModifiers = (props) => {
  const { open, handleClose } = props;
  
  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    status: yup.string().required('Status is required'),
    startDateTime: yup.string().required('Start Date & Time is required'),
    duration: yup.string().required('Duration is required'),
    relatedTo: yup.string().required('Related To is required'),
    note: yup.string().required('Note is required')
  });

  // -----------   initialValues
  const initialValues = {
    subject: '',
    status: '',
    startDateTime: '',
    duration: '',
    relatedTo: '',
    note: ''

  };

 // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
    
      handleClose();
      toast.success('Calls Add successfully');
      resetForm();
    }
  });

 

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Create Call </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Subject</FormLabel>
                  <TextField
                    id="subject"
                    name="subject"
                    size="small"
                    fullWidth
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Status</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="status"
                      name="status"
                      size="small"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Held">Held</MenuItem>
                      <MenuItem value="Not Held">Not Held</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.status && Boolean(formik.errors.status)}>
                      {formik.touched.status && formik.errors.status}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Start Date & Time</FormLabel>
                  <TextField
                    id="startDateTime"
                    name="startDateTime"
                    size="small"
                    type="datetime-local"
                    fullWidth
                    value={formik.values.startDateTime}
                    onChange={formik.handleChange}
                    error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
                    helperText={formik.touched.startDateTime && formik.errors.startDateTime}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>Duration</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="duration"
                      name="duration"
                      size="small"
                      value={formik.values.duration}
                      onChange={formik.handleChange}
                      error={formik.touched.duration && Boolean(formik.errors.duration)}
                    >
                      <MenuItem value="15 minutes">15 minutes</MenuItem>
                      <MenuItem value="30 minutes">30 minutes</MenuItem>
                      <MenuItem value="45 minutes">45 minutes</MenuItem>
                      <MenuItem value="1 hour">1 hour</MenuItem>
                      <MenuItem value="1.5 hours">1.5 hours</MenuItem>
                      <MenuItem value="2 hours">2 hours</MenuItem>
                      <MenuItem value="3 hours">3 hours</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.duration && Boolean(formik.errors.duration)}>
                      {formik.touched.duration && formik.errors.duration}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>Related To</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="relatedTo"
                      name="relatedTo"
                      size="small"
                      value={formik.values.relatedTo}
                      onChange={formik.handleChange}
                      error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                    >
                      <MenuItem value="Lead">Lead</MenuItem>
                      <MenuItem value="Contact">Contact</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}>
                      {formik.touched.relatedTo && formik.errors.relatedTo}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <FormLabel>Note</FormLabel>
                  <TextField
                    id="note"
                    name="note"
                    size="small"
                    fullWidth
                    rows={4}
                    multiline
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddModifiers;
