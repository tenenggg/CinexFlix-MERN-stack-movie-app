// ============================================================
// useFavourites.js — CUSTOM HOOK FOR FAVOURITES STATE & LOGIC

// using components from favouritesApi.js to fetch data from MongoDB to the frontend
// ============================================================

import { useState, useEffect } from 'react'                                                               // built in react hooks
import { fetchFavouritesFromDb, addFavouriteToDb, removeFavouriteFromDb } from '../api/favouritesApi'     // importing functions from favouritesApi.js




export const useFavourites = () => {

  const [favourites, setFavourites] = useState([])                                 // array to store the movies the user has favourited
  const [favouritedIds, setFavouritedIds] = useState(new Set())                    // set to store the IDs of the movies the user has favourited
  const [isLoading, setIsLoading] = useState(true)                                 // boolean to track loading state
  const [errorMessage, setErrorMessage] = useState('')                             // string to store error message
  const [toast, setToast] = useState(null)                                         // the message that will display when the user adds or removes a movie from favourites
  const [isRateLimited, setIsRateLimited] = useState(false)                        // true when backend returns HTTP 429 (Too Many Requests).                                           



  const showToast = (message, type = 'success') => {                               // arrow function that will receive the message and type and determine what happen next
    setToast({ message, type })                                                    // update the toast state, so new value of toast will be displayed at jsx 
  }


  const fetchFavouritedIds = async () => {

    try {
      const response = await fetchFavouritesFromDb()                                // wait for the fetch function to complete, if error will catch error, if success move to the next line

      if (response.status === 429) {
        setIsRateLimited(true)                                                   // update the rate limit state, will display a red banner on the frontend saying "Too many requests..." 
        return                                                                   // exit the function
      }

      if (response.ok) {
        const data = await response.json()
        const ids = new Set(data.map(movie => movie.tmdbId))                  // .map() extracts just the tmdbId from each movie object, then new Set() creates a new set from the array of tmdbIds, which allows for fast lookups using .has()
        setFavouritedIds(ids)
      }
    } catch (error) {
      console.error('Error fetching favourited movie IDs:', error)
    }
  }




  const fetchFavourites = async () => {

    setIsLoading(true)               // display spinner while fetching
    setErrorMessage('')              // clear any previous error message

    try {

      const response = await fetchFavouritesFromDb()       // use the favouritesApi.js export to get the data from the backend (which is already fetching from MongoDB)

      if (response.status === 429) {
        setIsRateLimited(true)                            // update the rate limit state, will display a red banner on the frontend saying "Too many requests..." 
        setIsLoading(false)                             // hide the spinner 
        return                                          // exit the function
      }

      if (!response.ok) {
        throw new Error('Failed to fetch favourites from database')        // throw an error if the response is not ok, and still display spinner
      }

      const data = await response.json()                                     // convert the response to json, and wait until this is complete, then move to the next line 
      setFavourites(data)                                                    // update the favourites state with the fetched data, which data = full array of movie objects from MongoDB

    } catch (error) {
      console.error('Error fetching favourites:', error)
      setErrorMessage('Could not load your favourites. Please try again later.')
    } finally {
      setIsLoading(false)                                                    // hide the spinner regardless of outcome, cause finally ALWAYS runs
    }
  }



  const handleAddFavourite = async (movie) => {
    try {
      const response = await addFavouriteToDb(movie)                          // use the favouritesApi.js export to add the movie (movie = whole movie object which is passed from MoviesGrid.jsx) to the backend database

      if (response.status === 429) {
        setIsRateLimited(true)                                                // update the rate limit state, will display a red banner on the frontend saying "Too many requests..." 
        return                                                                // exit the function
      }

      if (!response.ok) {
        throw new Error('Failed to save movie to favourites')                   // throw an error if the response is not ok, and still display spinner
      }


      setFavouritedIds(prev => {                                                // update the favourited ids state, prev = parameter that contains current value of favourited ids, also u can't decide what to pass for the parameter prev since its a setter function not useState or your own function
        const updated = new Set(prev)                                           // create a new set from the previous value of favourited ids and assign to updated, if not it will create empty set or undefined in its place. and the reason we use set is because it allows for fast lookups
        updated.add(movie.id)                                                    // add the movie id to the new set
        return updated                                                           // return the new set, which will trigger a re-render

      })

      showToast(`"${movie.title}" added to favourites!`, 'success')               // show a toast message  with a success style (success is literally the style of the toast which is  green and u can see the css at jsx files)

    } catch (error) {
      console.error('Error adding movie to favourites:', error)
      showToast('Could not save to favourites. Try again.', 'error')              // show a toast message with an error style (eventhough the style didnt get defined at jsx files, it falls under else branch at jsx files, so it will become red)
    }
  }


  const handleRemoveFavourite = async (movie) => {                               // async function to remove a movie from the favourites, movie = whole object of the movie that we want to remove from the favourites

    const tmdbId = movie.tmdbId || movie.id                                      // assign either the tmdbId or id to the tmdbId variable (the reason why we use this is because the movie object has 2 properties and it depends on where it was called from)


    try {
      const response = await removeFavouriteFromDb(tmdbId)                                  // use the favouritesApi.js export to remove the movie from the backend database

      if (response.status === 429) {                                                      // if the response is 429, update the rate limit state
        setIsRateLimited(true)                                                            // update the rate limit state, will display a red banner on the frontend saying "Too many requests..." 
        return                                                                           // exit the function
      }

      if (!response.ok) {
        throw new Error('Failed to delete movie from favourites')                          // throw an error if the response is not ok, and still display spinner
      }

      setFavourites((prev) =>                                                               // update the favourites state, prev = parameter that contains current value of favourites, also u can't decide what to pass for the parameter prev since its a setter function not useState or your own function
        prev.filter((item) => (item.tmdbId || item.id) !== tmdbId)                          // .filter() returns a NEW array excluding the removed movie, and React sees a new array reference → triggers re-render.
      )

      showToast(`"${movie.title}" removed from favourites`, 'success')                        // show a toast message  with a success style (success is literally the style of the toast which is  green and u can see the css at jsx files)

    } catch (error) {
      console.error('Error deleting favourite:', error)
      showToast('Failed to remove movie. Please try again.', 'error')                              // show a toast message with an error style (eventhough the style didnt get defined at jsx files, it falls under else branch at jsx files, so it will become red)
    }
  }



  useEffect(() => {
    if (toast) {

      const timer = setTimeout(() => setToast(null), 3000)                                // timeout is vanilla js method, it schedules setToast(null) after 3000ms. Setting toast to null removes the div from DOM. NOTES: toast && (<div>...) only renders the div if toast is truthy. When toast becomes null, the whole expression short-circuits to null, so React removes the div from the DOM entirely (not just hidden — actually gone)
      return () => clearTimeout(timer)                                                    // this is a cleanup function, it clean up the previous toast timer before running the next one to avoid double-dismissal bugs.
    }
  }, [toast])                                                                            // if toast changes, the effect will re-run



  useEffect(() => {
    if (isRateLimited) {                                                                          // If the user makes too many requests, show a red banner on the frontend saying "Too many requests..." after 10 seconds
      const timer = setTimeout(() => setIsRateLimited(false), 10000)                                // timeout is vanilla js method, it schedules setIsRateLimited(false) after 10000ms. Setting isRateLimited to false removes the div from DOM. NOTES: isRateLimited && (<div>...) only renders the div if isRateLimited is truthy. When isRateLimited becomes null, the whole expression short-circuits to null, so React removes the div from the DOM entirely (not just hidden — actually gone)
      return () => clearTimeout(timer)                                                            // this is a cleanup function, it clean up the previous isRateLimited timer before running the next one to avoid double-dismissal bugs.
    }
  }, [isRateLimited])                                                                             // if isRateLimited changes, the effect will re-run





  return {
    favourites,
    setFavourites,
    favouritedIds,
    setFavouritedIds,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    toast,
    setToast,
    isRateLimited,
    setIsRateLimited,
    showToast,
    fetchFavouritedIds,
    fetchFavourites,
    handleAddFavourite,
    handleRemoveFavourite
  }
}
