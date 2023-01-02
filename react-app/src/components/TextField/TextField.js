import axios from 'axios';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({ setTattoos }) {
  const [ searchInput, setSearchInput ] = useState('')
  const styles = [
    'Traditional',
    'Old School',
    'Neo Traditional',
    'Traditional Japanese',
    'Fineline',
    'Geometric',
    'Neo Japanese',
    'Tribal',
    'Watercolor',
    'Realism',
    'Portrait',
    'Anime'
  ]

  let style = ''
  let search = ''
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // console.log('word', searchInput)
    for(let i = 0; i < styles.length; i++) {
      if (styles[i].toLowerCase() === searchInput.toLowerCase()) {
        axios.get(`/api/tattoos/paginate?style=${searchInput}`)
              .then(({data}) => {
                const tattoos = []
                data.tats.forEach(tat => tattoos.push(tat))
                setTattoos([...tattoos])
              })
        return
      }
    }
    // search = searchInput
    axios.get(`/api/tattoos/paginate?search=${searchInput}`)
          .then(({data}) => {
            const tattoos = []
            data.tats.forEach(tat => tattoos.push(tat))
            // console.log('tatts', tattoos)
            setTattoos([...tattoos])
          })
  }


  return (
    <form onSubmit={handleSearchSubmit}>
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
            fullWidth
            label="Search"
            id="fullWidth"
            value={searchInput}
            onChange={handleSearchInput}
          />
      </Box>
    </form>
  );
}
