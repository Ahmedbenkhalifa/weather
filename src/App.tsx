import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './common/layout/Layout'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import SettingsPage from './pages/SettingsPage'
import WeatherPage from './pages/WeatherPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='weather' element={<WeatherPage />} />
        <Route path='settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
