import React, { Component, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import checkLoggedIn from './service/checkLoggedIn'
import Home from './pages/Home'
import Profile from './pages/Profile'
import RightSide from './components/RightSide'
import LeftSide from './components/LeftSide'
import { Box, Stack, Typography } from '@mui/material'
import PostCard from './components/PostCard'
import UserProfile from './pages/UserProfile'

const AppRouting = () => {
  const isLoggedIn = checkLoggedIn();

  const AuthRoute = ({ Component, ...rest }) => {

    const content = isLoggedIn
      ? (
        <Stack sx={{ display: 'flex' }} >
          <Box sx={{
            maxWidth: '245px', width: '100%', height: '100%', position: 'fixed', top: 0, backgroundColor: '#fff', zIndex: '999 !important'
          }} >
            <LeftSide />
          </Box>
          <Box sx={{ maxWidth: 'var(100%-245px)', marginLeft: '245px' }} >
            <Component />
          </Box>
        </Stack >
      )
      : (<Component />)

    return (
      <>
        {content}
      </>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={isLoggedIn ? <AuthRoute Component={Home} /> : <AuthRoute Component={Login} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<AuthRoute Component={Profile} />} />
        <Route path='/post' element={<AuthRoute Component={PostCard} />} />
        <Route path='/profile/:id' element={<AuthRoute Component={UserProfile} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouting