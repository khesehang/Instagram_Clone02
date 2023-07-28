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

const AppRouting = () => {
  const isLoggedIn = checkLoggedIn();

  const AuthRoute = ({ Component, ...rest }) => {

    const content = isLoggedIn
      ? (
        <Stack sx={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
          <Box sx={{ maxWidth: '18%', width: '100%', height: '100vh', position: 'fixed' }} >
            <LeftSide />
          </Box>
          <Component />
          <Box sx={{ maxWidth: '27.5%', width: '100%', heigth: '100vh'}}>
            <RightSide />
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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouting