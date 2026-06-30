// ============================================================
// Search.jsx — SEARCH INPUT COMPONENT
// A "controlled component" — the input's value is always
// driven by React state (searchTerm), not by the DOM itself.
// ============================================================

import React from 'react'

const search = ({ searchTerm, setSearchTerm }) => {                             // searchTerm is current search query, setSearchTerm is state setter from parent

  return (
    <div className="search">                                                            {/* wrapper div styling search bar layout */}
      <div>                                                                             {/* container for input and absolute icon */}
        <img src="public/search.svg" alt="Search Icon" />                               {/* search icon overlayed inside the input bar */}
        <input
          type="text"
          placeholder="Search for movies or TV shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />                                                                              {/* input text type, placeholder, value bound to searchTerm, onChange updates state in parent component */}
      </div>
    </div>
  )
}

export default search