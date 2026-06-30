// ============================================================
// moviesApi.js — MOVIE API SERVICES (TMDB API calls)
// fetches data directly from TMDB API using API key
// ============================================================

const API_BASE_URL = 'https://api.themoviedb.org/3'                         // the base URL of the TMDB API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY                           //  read the api key from .env file

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',                                           // accept header tells the server that the client expects the response to be in JSON format.
    authorization: `Bearer ${API_KEY}`                                    // Bearer token auth — standard way to pass API keys in headers.
  }
}



export const fetchMoviesFromApi = async (query = '') => {
  const endpoint = query                                                           //  checks whether query has a value (not an empty string or undefined), true, false
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`            //  if true → Search Movie API endpoint — used when user types a query.
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`                     //  if false → Discover Movie API endpoint — show popular movies sorted highest first

  const response = await fetch(endpoint, API_OPTIONS)                              // pause here until fetch() completes and receives the response headers from the server, then assign to response variable and move to next line, if it doesnt complete it will not move to the next line, and if the response is not ok it will throw an error/

  if (!response.ok) {                                                                   // check if response is not ok
    throw new Error('Failed to fetch movies')                                           // throw error
  }

  const data = await response.json()                                                    // convert response to json format                    

  if (data.Response === 'False') {                                                      // check if response is false
    throw new Error(data.Error || 'Failed to fetch movies. Please try again later.')    // throw error
  }

  return data.results                                                                   // return results
}





// from the way we need to define the key, the error handling, etc, to even the route
// so it quite a different writing process depends on how you structure your project, and how do you plan to use it
// like for example external api will need the throw errors, 
// but in the backend server we handle the error in the backend and send it to the frontend, etc, 
// (though you can also do it in the frontend like how we did with this movieApi.js, it's up to you.)
// it just depends on how you structure your project, and how do you plan to use it.