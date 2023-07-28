import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const data = [
  { name: 'khesehang', img: 'img.png' },
  { name: 'limbu', img: 'img.png' },
  { name: 'samsohang', img: 'img.png' },
  { name: 'hariraj', img: 'img.png' },
  { name: 'limbu', img: 'img.png' },
  { name: 'samsohang', img: 'img.png' },
  { name: 'hariraj', img: 'img.png' },
];

const StorySlider = () => {
  const [users, setUsers] = useState(data);

  return (
    <Stack
      position="relative"
      direction='row'
      height='auto'
      top='6px'
      width='100%'
      display='flex'
      spacing={1}
    >
      {
        users.map((item, index) => (
          <Box
            key={index}
            position="relative"
            direction='row'
            height='auto'
            // padding='0 4px'
            maxWidth='80px'
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            {console.log(item.name)}
            <Avatar alt={item.name} src={item.img}
              sx={{
                width: '65px', height: '65px', mt: '6px'
              }}
            />
            <Typography sx={{
              fontSize: '15px', overflow: 'hidden', textAlign: 'center', mt: '3px'
            }}>{item.name}</Typography>
          </Box>
        ))
      }
    </Stack >
  );
};

export default StorySlider;
