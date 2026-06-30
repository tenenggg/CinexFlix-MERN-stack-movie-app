// ============================================================
// vite.config.js — VITE BUILD TOOL CONFIGURATION
// Controls how your React app is built and served in dev mode.
// Three main jobs here:
//   1. Register plugins (React JSX support, Tailwind)
//   2. Configure the dev server (host, port)
//   3. Set up API proxy (forward /api/* to your Express backend)
// ============================================================

import { defineConfig, loadEnv } from 'vite'
// defineConfig → gives you TypeScript autocomplete for config options
// loadEnv → manually loads .env file values (needed because we want
//           them in the config itself, not just in app code)

import react from '@vitejs/plugin-react'
// Enables JSX transformation and React Fast Refresh (hot reload
// that preserves component state while you edit code).

import tailwindcss from '@tailwindcss/vite'
// Tailwind v4's Vite plugin — processes your CSS and generates
// utility classes. Replaces the old PostCSS + tailwind.config.js
// setup that most YouTube tutorials show.


// defineConfig accepts a function when you need access to { mode }
// mode = "development" (vite dev) or "production" (vite build)
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  // loadEnv(mode, dir, prefix):
  //   mode        → "development" or "production"
  //   process.cwd() → current working directory (your project root)
  //   ''          → load ALL .env vars, not just VITE_ prefixed ones
  //                 (empty string prefix = no filter)
  // Returns an object of all your .env key/value pairs.

  const HOST = env.VITE_DEV_HOST
  // e.g. "0.0.0.0" for LAN access, "localhost" for local only
  // For your LAN office app, this would be "0.0.0.0" so other
  // PCs on the network can reach the dev server.

  const PORT = Number(env.VITE_DEV_PORT)
  // e.g. 5173 (Vite's default port)
  // Number() converts the string from .env to an integer.

  const API_TARGET = env.VITE_API_BASE_URL
  // e.g. "http://localhost:3000" — your Express backend address
  // This is where /api/* requests get forwarded to.

  return {
    plugins: [
      react(),       // JSX + hot reload
      tailwindcss()  // Tailwind CSS processing
    ],

    server: {
      host: HOST,    // which network interface to listen on
      port: PORT,    // which port to run the dev server on

      proxy: {
        // ── API Proxy ─────────────────────────────────────
        // Any request starting with /api gets forwarded to
        // your Express backend. This solves CORS issues in dev —
        // the browser thinks it's talking to localhost:5173,
        // but Vite silently forwards it to localhost:3000.
        //
        // Example flow:
        //   Browser → fetch('/api/favourites')
        //   Vite dev server receives it
        //   Vite forwards it → http://localhost:3000/api/favourites
        //   Express responds
        //   Vite sends response back to browser
        //
        // In PRODUCTION (after vite build), this proxy doesn't
        // exist — your real server or nginx must handle the routing.
        '/api': {
          target: API_TARGET,
          // Forward to: http://localhost:3000 (or whatever VITE_API_BASE_URL is)
          changeOrigin: true
          // Changes the Host header in the forwarded request to match
          // the target. Required for some backends that check the Host header.
          // Without it, some servers reject the proxied request.
        }
      }
    },
  }
})