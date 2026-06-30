
import React, { useEffect } from 'react'                                // built in react hook
import { useNavigate } from 'react-router-dom'                          // can be used for programmatic navigation, e.g. navigate('/') sends user to home, a react built in hooks like use state and useeffect
import { useFavourites } from '../hooks/useFavourites'                    // custom hook for favourites state and logic
import Navbar from '../components/Navbar'                               // nav component 
import MovieCard from '../components/MovieCard'                         // movie card component
import Spinner from '../components/Spinner'                               // spinner component

const FavouritesPage = () => {

  const navigate = useNavigate()                                // in this case we are using useNavigate() to send user to home page when user click a button, when user dont have any movies in this page

  const {
    favourites,
    isLoading,
    errorMessage,
    toast,
    isRateLimited,
    setIsRateLimited,
    fetchFavourites,
    handleRemoveFavourite
  } = useFavourites()


  useEffect(() => {
    fetchFavourites()
  }, [])                                            // empty erray = runs once when this component mounts (URL hits /favourites) and only run again when it unmounts % remounts


  return (
    <main className="min-h-screen relative bg-[#030014] pb-24">                                        {/* page main container styling dark theme background */}
      <div className="pattern" />                                                                       {/* background grid/pattern overlay decorative element */}

      {isRateLimited && (                                                                               // checks if api calls are rate limited to show warnings banner
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 bg-amber-500/10 border-b border-amber-400/30 backdrop-blur-md px-5 py-3"> {/* fixed warning banner styling */}
          <div className="flex items-center gap-3">                                                    {/* left aligned text/indicator container */}
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />                        {/* blinking amber status indicator */}
            <p className="text-amber-200 text-sm font-semibold">                                       {/* warning message text */}
              ⚡ Too many requests — slow down a bit! The limit resets every 60 seconds.
            </p>
          </div>
          <button
            onClick={() => setIsRateLimited(false)}                                                    // state setter to hide banner on click
            className="text-amber-400 hover:text-white transition-colors text-lg leading-none cursor-pointer" // dismiss button styling
            aria-label="Dismiss rate limit warning"                                                    // accessibility label
          >
            ×
          </button>
        </div>
      )}

      <Navbar isRateLimited={isRateLimited} />                                                         {/* main navigation component showing rate limited spacing */}

      <div className="wrapper">                                                                        {/* layout wrapper aligning page content */}
        <section className="all-movies">                                                               {/* movie grid section container */}
          <div className="flex items-center justify-between mt-[40px] mb-6">                            {/* row layout matching header title and badge */}
            <h2>My Favourite Movies</h2>                                                               {/* favourites section title */}
            <span className="text-sm text-light-200 font-medium bg-light-100/5 px-3 py-1 rounded-full"> {/* movie count badge pill */}
              {favourites.length} {favourites.length === 1 ? 'Movie' : 'Movies'}                        {/* counts active items in favourites array and handles singular/plural names */}
            </span>
          </div>

          {isLoading ? (                                                                                // checks if loading state is true to show loading indicator

            <div className="flex justify-center items-center py-20">                                    {/* centered loading container layout */}
              <Spinner />                                                                               {/* spinner loading component */}
            </div>

          ) : errorMessage ? (                                                                          // checks if there is any error fetching data from DB

            <div className="text-center py-10">                                                         {/* centered layout for error message and retry actions */}
              <p className="text-red-500 font-medium">{errorMessage}</p>                                {/* error message content */}
              <button
                onClick={fetchFavourites}                                                               // retry button triggers fetchFavourites handler on click
                className="mt-4 bg-light-100/10 hover:bg-light-100/20 text-white px-4 py-2 rounded-xl text-sm transition-all" // retry button style
              >
                Try Again
              </button>
            </div>

          ) : favourites.length === 0 ? (                                                              // check if user favourites list is empty

            <div className="flex flex-col items-center justify-center py-20 text-center">               {/* centered empty state wrapper */}
              <div className="w-16 h-16 rounded-full bg-light-100/5 flex items-center justify-center mb-6 border border-light-100/10"> {/* icon circle badge container */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#AB8BFF]"> {/* hollow heart icon */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>

              <h3 className="text-white text-xl font-bold mb-2">No favourites yet</h3>                 {/* empty state message title */}
              <p className="text-light-200 text-sm max-w-xs mb-6">                                      {/* empty state description text */}
                Explore our movies and click "Add to Favourites" to build your custom watchlist!
              </p>

              <button
                onClick={() => navigate('/')}                                                           // navigates user back to home route programmatically
                className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] text-[#030014] hover:scale-105 transition-transform font-bold px-6 py-3 rounded-xl text-sm cursor-pointer shadow-md" // home nav button styling
              >
                Browse Movies
              </button>
            </div>

          ) : (                                                                                         // default branch when user has saved favourite movies

            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">        {/* movie collection list showing responsive grid structure */}
              {favourites.map((movie) => (                                                             // loops through favourites list to map movie item data
                <MovieCard
                  key={movie.tmdbId || movie.id}                                                       // unique React key for list tracking
                  movie={movie}                                                                         // movie object containing data properties
                  isFavouritePage={true}                                                                // shows the remove actions layout
                  onAction={handleRemoveFavourite}                                                     // callback handler when removing items from favourites list
                />
              ))}
            </ul>
          )}

        </section>
      </div>

      {toast && (                                                                                       // conditionally renders popup toast if message is present
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0f0d23] border border-light-100/10 rounded-2xl px-5 py-4 shadow-2xl transition-all duration-300"> {/* floating toast layout container */}
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div> {/* dynamic status dot matching action type */}
          <p className="text-white text-sm font-semibold">{toast.message}</p>                           {/* toast notification text content */}
        </div>
      )}

    </main>
  )
}

export default FavouritesPage
