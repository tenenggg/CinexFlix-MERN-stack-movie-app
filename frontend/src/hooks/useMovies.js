// ============================================================
// useMovies.js — CUSTOM HOOK FOR MOVIES STATE & LOGIC

// using components from moviesApi.js to fetch data from TMDB
// ============================================================

import { useState, useEffect } from 'react'                                        // built in react hooks
import { useDebounce } from 'react-use'                                          // react-use library hook for debouncing, can just call it directly
import { fetchMoviesFromApi } from '../api/moviesApi'                              // component from moviesApi.js to fetch data from TMDB



export const useMovies = () => {

  const [searchTerm, setSearchTerm] = useState('')                          // State to store the user's search term (user type in search bar), setSearchTerm is called from the Search component via props in HomePage.
  const [errorMessage, setErrorMessage] = useState('')                       // Stores error text if API fetch fails. Empty string = no error. Non-empty = show the error paragraph.
  const [movieList, setMovieList] = useState([])                             // The array of movie objects returned from TMDB. Each movie has: id, title, poster_path, vote_average, etc.
  const [isLoading, setIsLoading] = useState(false)                            // true while fetch is in progress → shows <Spinner />
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)   // A delayed copy of searchTerm. Only updates after user stops typing for 500ms. This is what triggers the actual fetch.




  useDebounce(() => setDebouncedSearchTerm(searchTerm),                // run this when line 2 finish (500ms delay) , which is setting new value for debouncedSearchTerm from searchTerm state
    500,                                                               // delay time: 500ms
    [searchTerm]                                                       // dependency array, if this changes line 1 and 2 will reset, which is when search term changes 
  )


  const fetchMovies = async (query = '') => {                           // Async function to fetch movies from TMDB
    setIsLoading(true)                                                  // show spinner immediately
    setErrorMessage('')                                              // clear any previous error message

    try {
      const results = await fetchMoviesFromApi(query)                // use the movieApi.js export to get the data while passing query to the url, query => debounced search term
      setMovieList(results)                                          // update the movie list with the fetched data by assigning it to setMovieList() (results is the array of movies )

    } catch (error) {
      console.error(`Error fetching movies: ${error}`)                // console log the error 
      setErrorMessage('Failed to fetch movies. Please try again later.')

    } finally {
      setIsLoading(false)                                            // hide spinner regardless of outcome. ALWAYS runs — whether try succeeded or catch ran(because finally block ALWAYS runs).
    }
  }



  useEffect(() => {
    fetchMovies(debouncedSearchTerm)      // calls the fetchMovies function with the debouncedSearchTerm, which means it will fetch movies again using new debounced search term.  
  }, [debouncedSearchTerm])               // Only fires if this changes, which is the debounced search term.   


  return {
    searchTerm,
    setSearchTerm,
    errorMessage,
    setErrorMessage,
    movieList,
    setMovieList,
    isLoading,
    setIsLoading,
    debouncedSearchTerm,
    fetchMovies
  }
}


// debounced search term here is => search term that has been delayed by 500ms (by useDebounce above)
// searchTerm here is => search term that is being typed by the user, this is the one that the user types in the search bar