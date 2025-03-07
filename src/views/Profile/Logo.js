import { useState } from 'react';
import { Box, Button, Divider, Grid, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import { urls } from 'views/Api/constant';
import { useEffect } from 'react';
import { getApi, updateApiFormData } from 'views/Api/comman';
import Header from 'layout/MainLayout/Header';

const CompanyLogoUploader = ({ companyId }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);

  const fetchLogo = async () => {
    const response = await getApi(urls.logo.get);
    setLogo(response?.data.data?.[0]);
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };

  const handleUpload = async (values) => {
    if (!file) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('logoImage', file);

    try {
      const response = await updateApiFormData(urls.logo.update.replace(':id', logo._id), formData);
      await fetchLogo();
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo!');
    }
  };

  return (
    <>
      <Grid item xs={12} sm={12} display="flex" justifyContent="center">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
            width: '50%'
          }}
        >
          <Typography sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>Company Logo</Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Avatar
              alt="Logo Image"
              src={logo?.imageUrl || 'https://www.shutterstock.com/image-vector/pet-shop-logo-template-600w-1053368123.jpg'}
              sx={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                backgroundColor: '#7760f6'
              }}
            />
          </Box>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Grid>
          <Button variant="contained" sx={{ mt: '10px' }} onClick={handleUpload}>
            Upload Logo
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default CompanyLogoUploader;
