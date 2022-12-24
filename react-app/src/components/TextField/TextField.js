import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        outline: 'none'
      }}
    >
      <TextField
         sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                outlineColor: "none"
              }
            }
          }}
        fullWidth label="Search" id="fullWidth" />
    </Box>
  );
}
