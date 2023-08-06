import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PostCard from '../components/PostCard'
import RightSide from '../components/RightSide'

const Home = () => {

  useEffect(() => {
    document.title = 'Instagram'
  },[])
  
  return (
    <div style={{
      position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center',left:0
    }} >
      <Box sx={{
        position: 'relative', maxWidth: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
      }} >
        <PostCard />
      </Box>
    </div >
  )
}

export default Home
