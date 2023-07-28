import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import StorySlider from '../components/StorySlider'
import PostCard from '../components/PostCard'
import RightSide from '../components/RightSide'

const Home = () => {
  return (
    <Stack >
      <Box sx={{ position: 'relative', maxWidth: '57%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '' }} >
        <PostCard />
      </Box>
    </Stack>
  )
}

export default Home
