import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import checkLoggedIn from './service/checkLoggedIn'
import Home from './pages/Home'

const AppRouting = () => {
  const isLoggedIn = checkLoggedIn();


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={isLoggedIn ? <Home /> : <Login />} />
    <Route path='/signup'  element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouting