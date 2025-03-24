import { useState, useEffect } from 'react';
import { Box, Button, Divider, Grid, Typography, Avatar } from '@mui/material';
import { urls } from 'views/Api/constant';
import { getApi, updateApiFormData } from 'views/Api/comman';

const CompanyLogoUploader = ({ companyId }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);

  const UserID = JSON.parse(localStorage.getItem('user'));

  const fetchLogo = async () => {
    try {
      const response = await getApi(urls.register.get);
      const userData = response?.data.data?.[0];
      setLogo(userData);
      localStorage.setItem('user', JSON.stringify(userData)); 
    } catch (error) {
      console.error('Failed to fetch logo:', error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('logoImage', file);
    try {
      const response = await updateApiFormData(urls.register.updateLogo.replace(':id', UserID._id), formData);
      const updatedUser = { ...UserID, logoImage: response?.data?.data?.logoImage };
      localStorage.setItem('user', JSON.stringify(updatedUser)); 
      await fetchLogo();
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo!');
    }
  };

  return (
    <Grid item xs={4} display="flex" height="auto">
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>Company Logo</Typography>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <Avatar
            alt="Logo Image"
            src={
              logo?.logoImage
                ? `http://localhost:7200/${logo.logoImage.replace('\\', '/')}`
                : 'https://www.shutterstock.com/image-vector/pet-shop-logo-template-600w-1053368123.jpg'
            }
            sx={{ width: 130, height: 130, borderRadius: '50%', backgroundColor: '#7760f6' }}
          />
        </Box>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Grid>
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            backgroundColor: '#6A9C89',
            color: '#ffff',
            mt: '10px',
            '&:hover': {
              backgroundColor: '#8DB3A8',
            },
          }}
        >
          Upload Logo
        </Button>
      </Box>
    </Grid>
  );
};

export default CompanyLogoUploader;
