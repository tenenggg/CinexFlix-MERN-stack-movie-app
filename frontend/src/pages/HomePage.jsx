
import React, { useEffect } from 'react'                              // a built in react hook
import { useMovies } from '../hooks/useMovies'                        // custom hook for movies state and logic
import { useFavourites } from '../hooks/useFavourites'                // custom hook for favourites state and logic
import Navbar from '../components/Navbar'                              // nav component
import Search from '../components/Search'                              // search component
import Spinner from '../components/Spinner'                            // spinner component
import MovieCard from '../components/MovieCard'                      // movie card component

const HomePage = () => {
  const {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    isLoading
  } = useMovies()                                 //  destructure the properties from the object returned from useMovies() for easy access

  const {
    favouritedIds,
    isRateLimited,
    setIsRateLimited,
    toast,
    fetchFavouritedIds,
    handleAddFavourite
  } = useFavourites()                             //  destructure the properties from the object returned from useFavourites() for easy access


  useEffect(() => {
    fetchFavouritedIds()
  }, [])                                        // empty array = run once when component first mounts (URL hits /) and  never runs again unless component unmounts and remounts


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
        <header>
          <img src="./hero.png" alt="Hero Banner" />                                                   {/* main header decorative background banner */}
          <h1>
            Find <span className="text-gradient">Movies </span>                                        {/* movie search title with custom text gradient styling */}
            You'll Enjoy Without The Hassle.
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />                             {/* search component with props handling search terms logic */}
        </header>

        <section className="all-movies">                                                               {/* movies listing container section */}
          <h2 className="mt-[40px]">All Movies</h2>                                                     {/* section subtitle text */}

          {isLoading ? (                                                                                // checks loading state to show spinner component
            <Spinner />
          ) : errorMessage ? (                                                                          // checks error state to show error paragraph element
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (                                                               // maps movie list to movie card items
                <MovieCard
                  key={movie.id}                                                                        // unique key identifier for list item matching TMDB ID
                  movie={movie}                                                                         // movie object representation
                  isFavourite={favouritedIds.has(movie.id)}                                             // checks favourited state utilizing lookups in favourited Set
                  isFavouritePage={false}                                                               // enables default page layout behavior
                  onAction={handleAddFavourite}                                                         // callback handle triggered when movie gets added to favourites
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

export default HomePage
