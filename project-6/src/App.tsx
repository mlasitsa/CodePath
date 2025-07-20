import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Favorities from './pages/Favorities'
import BreweryPage from './pages/BreweryPage'

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorities" element={<Favorities />} />
        <Route path="/brewery/:id" element={<BreweryPage />} />
      </Routes>
    </Router>
  )
}

export default App
