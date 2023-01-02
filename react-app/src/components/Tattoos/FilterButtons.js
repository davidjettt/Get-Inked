import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtons() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
         id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value='any'>Any Style</MenuItem>
          <MenuItem value='Traditional'>Traditional</MenuItem>
          <MenuItem value='Old School'>Old School</MenuItem>
          <MenuItem value='Neo Traditional'>Neo Traditional</MenuItem>
          <MenuItem value='Fineline'>Fineline</MenuItem>
          <MenuItem value='Geometric'>Geometric</MenuItem>
          <MenuItem value='Neo Japanese'>Neo Japanese</MenuItem>
          <MenuItem value='Traditional Japanese'>Traditional Japanese</MenuItem>
          <MenuItem value='Tribal'>Tribal</MenuItem>
          <MenuItem value='Watercolor'>Watercolor</MenuItem>
          <MenuItem value='Realism'>Realism</MenuItem>
          <MenuItem value='Black & Grey'>Black & Grey</MenuItem>
          <MenuItem value='Portrait'>Portrait</MenuItem>
          <MenuItem value='Anime'>Anime</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
