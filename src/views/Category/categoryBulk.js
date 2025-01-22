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
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { postApi } from 'views/Api/comman.js';
import { urls } from 'views/Api/constant.js';

const AddBulkUpload = (props) => {
  const { open, handleClose, fetchCategories } = props;
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    if (!selectFile) {
      toast.error('Please select the file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        setData(sheetData);
      } catch (error) {
        toast.error('Error uploading the file.');
      }
    };
    reader.readAsBinaryString(selectFile);
  };

  const handleSubmit = async () => {
    if (!data) {
      toast.error('Please select a valid file.');
      return;
    }

    try {
      const response = await postApi(urls.category.bulkSave, data);
      if (response) {
        fetchCategories();
        handleClose();
        toast.success('Bulk upload successful!');
      }
    } catch (error) {
      toast.error('Error during bulk upload!');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
      <DialogTitle
        id="scroll-dialog-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Typography variant="h3">Upload Excel File</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Button sx={{ backgroundColor: '#650fc7', color: '#fff' }} fullWidth>
                  Download Sample File
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <input type="file" accept=".xlsx" onChange={handleFileChange} style={{ width: '100%' }} />
              </Grid>
            </Grid>
          </DialogContentText>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ textTransform: 'capitalize' }}
          color="secondary"
          fullWidth
        >
          Upload
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          style={{ textTransform: 'capitalize', marginTop: '10px' }}
          sx={{ backgroundColor: '#ff4d4f', color: '#fff' }}
          fullWidth
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBulkUpload;
