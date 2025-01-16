import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { urls } from 'views/Api/constant.js';
import { postApi, getApi } from 'views/Api/comman.js';
import * as XLSX from 'xlsx';

const AddBulkUpload = (props) => {
  const { open, handleClose, fetchProduct } = props;
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);

useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await getApi(urls.category.get);
        if (response ) {
          setCategories(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to fetch categories!');
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];

    if (!selectFile) {
      toast.error('Please select a file.');
      return;
    }

    if (!selectFile.name.endsWith('.xlsx')) {
      toast.error('Please upload a valid Excel (.xlsx) file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

     const transformedData = sheetData.map((product) => {
          const category = categories.find((c) => c.name === product.categoryId);

          if (category) {
            product.categoryId = category._id;
            delete product.category;
          } else {
            product.categoryId = null;
          }
          return product;
        }); 

        setData(transformedData);
      } catch (error) {
        toast.error('Failed to parse the uploaded file!');
        console.error('Error parsing file:', error);
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
      const response = await postApi(urls.product.bulkSave, data);
      if (response) {
        fetchProduct();
        handleClose();
        toast.success('Bulk uploaded successfully!');
      }
    } catch (error) {
      toast.error('Bulk upload failed!');
      console.error('Error submitting data:', error);
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
                  <Button sx={{ backgroundColor: '#650fc7', color: '#fff','&:hover': {backgroundColor:'#650fc7', color: '#fff'}}}  href='/sampleFile.xlsx' download>Download Sample File</Button>
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
            sx={{ backgroundColor: '#ff4d4f', color: '#fff' ,'&:hover':{
                backgroundColor: '#ff4d4f', color: '#fff'
            }}}
>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBulkUpload;
