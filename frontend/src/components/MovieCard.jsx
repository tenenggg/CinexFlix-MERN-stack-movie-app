// ============================================================
// MovieCard.jsx — REUSABLE MOVIE CARD COMPONENT
// Used in TWO places:
//   1. Home page (isFavouritePage=false) → "Add to Favourites" button
//   2. Favourites page (isFavouritePage=true) → "Remove" button
// ============================================================

import React from 'react'

const MovieCard = ({
  movie,                                                                                // full movie object from TMDB or MongoDB backend
  isFavourite = false,                                                                  // boolean indicating if this movie is already in user's favourites list
  isFavouritePage = false,                                                              // boolean indicating if this card is rendered on the favourites page
  onAction                                                                              // callback function triggered on button click (add or remove action)
}) => {

  const { title, vote_average, poster_path, release_date, original_language } = movie   // destructure necessary fields from the movie object

  return (
    <div className="movie-card flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02]"> {/* outer card container with zoom on hover */}
      <div>                                                                             {/* top section wrapper for poster and info */}
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `/no-movie.png`}
          alt={title}
          className="rounded-lg h-auto w-full object-cover"
        />                                                                              {/* poster image using TMDB path or local fallback, alt is movie title */}

        <div className="mt-4">                                                          {/* movie info container */}
          <h3>{title}</h3>                                                              {/* movie title header */}

          <div className="content">                                                     {/* content metadata row */}
            <div className="rating">                                                    {/* rating wrapper */}
              <img src="/star.svg" alt="Star Icon" />                                   {/* star rating icon */}
              <p>
                {vote_average ? Number(vote_average).toFixed(1) : 'N/A'}                {/* rounds vote_average to 1 decimal place or displays N/A */}
              </p>
            </div>

            {original_language && (                                                     // renders only if original_language is truthy
              <>
                <span>•</span>                                                          {/* bullet separator */}
                <p className="lang">{original_language}</p>                             {/* original language of movie */}
              </>
            )}

            <span>•</span>                                                              {/* bullet separator */}
            <p className="year">
              {release_date ? release_date.split('-')[0] : 'N/A'}                       {/* extracts release year from YYYY-MM-DD string */}
            </p>
          </div>
        </div>
      </div>

      {isFavouritePage ? (                                                              // check if rendered on favourites page to decide action button style

        <button
          className="w-full mt-4 bg-red-600/10 border border-red-500/20 hover:border-red-500/50 hover:bg-red-600/20 text-red-200 hover:text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 cursor-pointer text-sm flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation()                                                         // prevents click event from bubbling up to parent cards
            if (onAction) onAction(movie)                                               // calls handleRemoveFavourite in the FavouritesPage component
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Remove
        </button>

      ) : (

        <button
          className={`w-full mt-4 font-medium py-2 px-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer ${isFavourite
            ? 'bg-[#AB8BFF]/10 border border-[#AB8BFF]/40 text-[#D6C7FF]'
            : 'bg-primary border border-light-100/10 hover:border-light-100/30 text-white hover:bg-light-100/5'
            }`}
          onClick={(e) => {
            e.stopPropagation()                                                         // prevents click event from bubbling up to parent cards
            if (!isFavourite && onAction) {
              onAction(movie)                                                           // calls handleAddFavourite in parent HomePage component
            }
          }}
          disabled={isFavourite}
        >                                                                               {/* button is disabled if the movie is already in favourites list */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 ${isFavourite ? 'fill-current stroke-none text-[#AB8BFF]' : 'fill-none'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          {isFavourite ? 'Favourited' : 'Add to Favourites'}                            {/* button label text changes dynamically */}
        </button>
      )}

    </div>
  )
}

export default MovieCard