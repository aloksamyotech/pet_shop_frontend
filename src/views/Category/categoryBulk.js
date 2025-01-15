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
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import { useEffect } from 'react';
import { useState } from 'react';
import { urls } from 'views/Api/constant.js';
import { postApi } from 'views/Api/comman.js';
import * as XLSX from 'xlsx';

const AddBulkUpload = (props) => {
  const { open, handleClose, fetchCategories } = props;
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    if (!selectFile) {
      toast.error('please select the file ');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.value);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        console.log('----------sheetdata', sheetData)
        setData(sheetData);
        
      } catch (error) { 
        console.log(error);
      }
    };

    reader.readAsBinaryString(selectFile);
  };

  const handleSubmit = async () => {
    if (!data) {
      toast.error('select the valid file');
      return ;
    }

    try {
      const response = await postApi(urls.category.bulkSave, data);

      if (response) {
        fetchCategories();
        handleClose();
        toast.success('Bulk uploaded successfully!');
      }
    } catch (error) {
      console.log('data is ');
      toast.error('Bulk not uploaded!');
    }
  };

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
          <Typography variant="h3">Upload Excel File</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container columnSpacing={{ xs: 0, sm: 5, md: 4 }} spacing={5}>
                <Grid item xs={12} sm={12} md={12}>
                  <Button sx={{ backgroundColor: '#650fc7', color: '#fff' }}>Download sample File</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <input type="file" accept=".xlsx" onChange={handleFileChange} />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Upload
          </Button>
          <Button
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={handleClose}
            sx={{ backgroundColor: '#ff4d4f', color: '#fff' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBulkUpload;
