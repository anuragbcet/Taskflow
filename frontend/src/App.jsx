import { useState } from 'react'
import { Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'


function App() {
  

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={
        // <ProtectedRoute>
        //     <Dashboard/>
        // </ProtectedRoute>
        <Dashboard/>
      }/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
