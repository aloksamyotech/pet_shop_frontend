import { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Box sx={{ width: '250px', display: 'flex', alignItems: 'center', height: '40px',justifyContent:'center', }}>
      <TextField
        fullWidth
        variant="standard" 
        placeholder="Search.............."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          disableUnderline: false, 
         }}
        sx={{
        fontSize: '16px',
            padding: '10px', 
            

        }}
      />
       <IconButton>
                <SearchIcon />
              </IconButton>
    </Box>
  );
};

export default SearchBar;
