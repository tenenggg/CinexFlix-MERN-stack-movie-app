// ============================================================
// main.jsx — THE ENTRY POINT OF THE ENTIRE REACT APP
// This is the first file that runs. It mounts React onto the
// HTML page (index.html has a <div id="root"> — React takes
// over that div and renders everything inside it).
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'                                              // this css (tailwind + custom css) will be applied to the entire application, and can be used everywhere without importing it in every component
import App from './App.jsx'                                       // import the main app component from App.jsx

// ── Mount the app ──────────────────────────────────────────
createRoot(document.getElementById('root'))                       // Finds the <div id="root"> in your index.html and tells React "this is where you live"
  .render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )




// wrap order matters, because firstly strictmode runs checks on everything, 
// then browserrouter provides routing context to everything, 
// then app is rendered





// StrictMode is a React dev tool wrapper. It doesn't render
// any visible UI — it just runs extra checks in development
// to warn you about bad patterns (e.g. side effects in wrong
// places). Has zero effect in production builds.

// createRoot is the React 18+ way to mount your app.
// Older code used ReactDOM.render() — same idea, newer API.

// BrowserRouter wraps the whole app and provides "routing
// context" — meaning every component inside it can use
// React Router features (NavLink, useNavigate, Routes, etc).
// Without this wrapper, you would need to pass routing props down manually to every component that needs them.
// like example :
//  <App routingProps={routingProps} />
// which we need to pass down to every component that needs routing features. But with BrowserRouter, we don't have to do that. 
// It provides routing context to all components inside it, so they can use React Router features without needing to pass props down manually.
// like example :
//  <NavLink to="/favourites">Favourites</NavLink>
//  <button onClick={() => navigate('/favourites')}>Go to Favourites</button>
//  <Routes>...</Routes>
