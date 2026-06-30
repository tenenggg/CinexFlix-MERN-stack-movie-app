// ============================================================
// Navbar.jsx — THE NAVIGATION BAR COMPONENT
// ============================================================

import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ isRateLimited }) => {                                         // isRateLimited parameter determines if rate limit banner is shown, which shifts nav down

  return (
    <nav className={`relative z-20 sticky w-full border-b border-light-100/10 backdrop-blur-md bg-[#030014]/65 ${isRateLimited ? 'top-[44px]' : 'top-0'}`}> {/* nav container, sticks to top, shifts down if rate limit banner shows */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-10">                   {/* centered flexbox container mapping logo to left and navigation links to right */}

        <NavLink to="/" className="flex items-center gap-3 cursor-pointer">                                     {/* logo navigation link returning to home route */}
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />                                 {/* 32x32px movie app logo */}
          <span className="text-white font-extrabold text-xl tracking-wider uppercase text-gradient">CineFlix</span> {/* CineFlix application name using custom color gradient */}
        </NavLink>

        <div className="flex gap-8">                                                                            {/* links container wrapper with 32px spacing */}
          <NavLink
            to="/"                                                                                              // link leads to home page
            end                                                                                                 // only active on exact match of home url path
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors cursor-pointer relative py-1 ${isActive ? 'text-white font-bold' : 'text-light-200 hover:text-white'}`
            }
          >
            {({ isActive }) => (                                                                                // render function taking isActive boolean to conditionally style children
              <>
                Home
                {isActive && (                                                                                  // if active renders custom gradient underline below Home text
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] rounded-full"></span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/favourites"                                                                                    // link leads to favourites page
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors cursor-pointer relative py-1 ${isActive ? 'text-white font-bold' : 'text-light-200 hover:text-white'}`
            }
          >
            {({ isActive }) => (                                                                                // render function taking isActive boolean to conditionally style children
              <>
                My Favourites
                {isActive && (                                                                                  // if active renders custom gradient underline below My Favourites text
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] rounded-full"></span>
                )}
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
