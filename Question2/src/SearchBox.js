import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

export default function SearchField({
    handleSearch,
    showSort
}) {
  const [searchText, setSearchText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sortKey, setSortKey] = useState('');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const theme = useTheme();
  const [selectedCompany, setSelectedCompany] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCompany(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSortKey = (event) => {
    setSortKey(event.target.value);
    handleSearch(searchText, selectedCompany, event.target.value);
  };

  useEffect (() => {
    const fetchData = async () => {
        try {
          const response = await 
          axios.get('http://127.0.0.1:8000/api/company/', 
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                credentials: true,
            }
          );
  
          setCompanies(response.data.map(company => company['name']));

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();    
  }, [])

  return (
    <form className='search-form' >
      <TextField id="outlined-basic" 
          placeholder="Search anything like shirt/headset/phone etc.."
          value={searchText}
          onChange={handleSearchTextChange}
        label="Search anything like shirt/headset/phone etc" 
        variant="outlined" 
        sx={{width:'70%'}}
      />
      <FormControl style={{width:'30%'}}>
      <InputLabel id="demo-multiple-chip-label"> Select Company </InputLabel>
      <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCompany}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select Company" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          label="Select Company"
        >
          {companies.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedCompany, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        <Button variant="contained" 
            onClick={() => handleSearch(searchText, selectedCompany)}
        >Search</Button>
        {showSort && <FormControl style={{width:'10%'}}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sort By"
                onChange={handleSortKey}
                value={sortKey}
            >
                <MenuItem value={'None'}>None</MenuItem>
                <MenuItem value={'highest_price'}>Highest Price</MenuItem>
                <MenuItem value={'lowest_price'}>Lowest Price</MenuItem>
                <MenuItem value={'highest_rating'}>Highest Rating</MenuItem>
            </Select>
        </FormControl>}

    </form>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCompany, theme) {
  return {
    fontWeight:
    selectedCompany.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
