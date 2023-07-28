import { Box, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const RightSide = () => {
  return (
    <Stack sx={{backgroundColor:'red',width:'100%',height:'100%'}}>
    <Box >
    <Link to='/profile' style={{textDecoration:'none'}}>My Profile</Link>
    </Box>
    </Stack>
  )
}

export default RightSide