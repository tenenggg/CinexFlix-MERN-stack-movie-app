
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FavouritesPage from './pages/FavouritesPage'

const App = () => {
  return (
    <Routes>
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App





// some thing to take notes:


// /favourites (The Client Router Layer): Yes! This is strictly for the address bar in the browser. 
// It is a fake URL managed by React Router so users can bookmark the page or share the link, without causing a full page refresh.

// <FavouritesPage />: Exactly. This is the UI component (usually in a file like FavouritesPage.jsx) 
// that gets rendered when the browser path matches /favourites.

// /api/favourites (The Backend API Endpoint): Yes! This is the bridge. The browser sends a background HTTP request 
// (like a POST, GET, or DELETE as seen in your  favouritesApi.js files ) to this backend endpoint. 
// The backend processes it (checks database, reads/writes MongoDB), and returns the raw data (JSON format) back to the browser.

// the orders of routes doesnt matter cause react router checks all routes and finds the matching one, based on path (what user types in url bar)