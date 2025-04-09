import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { height } from '@mui/system';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  useEffect(() => {

    const lang = i18n.language?.split('-')[0] || 'en';
    setLanguage(lang);
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center',  marginRight: '10px' ,height:'10vh'}}>
      <Box>
        <FormControl sx={{ fontSize: '0.875rem', minWidth: 120,height: 50 }} fullWidth>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            label="Language"
            sx={{ height: 35 }} 
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="gu">Gujarati</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default LanguageSwitcher;
