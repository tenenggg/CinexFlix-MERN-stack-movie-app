// ============================================================
// favouritesApi.js — FAVOURITES API SERVICES (Backend DB calls)
// fetches data from your nodejs/express backend server

// we need this because frontend is built using reactjs and backend is built using nodejs
// reactjs and nodejs have a different runtime and port, so this is used as a bridge for those 2 runtimes and ports
// and for reactjs to have access to the backend's database
// ============================================================



export const fetchFavouritesFromDb = async () => {
  const response = await fetch('/api/favourites')           // this is accessing the backend server and calls whatever is in the /api/favourites route (which is need to be the same as the route in the backend server)
  return response                                           // we dont have try catch or throw errors here because we handled it in the backend
}




export const addFavouriteToDb = async (movie) => {

  const payload = {                                   // payload is the data that we are sending to the backend server, which is the movie's properties
    tmdbId: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date || '',
    vote_average: movie.vote_average || 0
  }

  const response = await fetch('/api/favourites', {
    method: 'POST',                                       // the order of method, headers, and body doesnt matter, it doesnt have to be this order, it can be any order
    headers: { 'Content-Type': 'application/json' },    // tells express the body is JSON, not a form submission.
    body: JSON.stringify(payload)                        // JSON.stringify converts the JS object to a JSON string because HTTP bodies are text, not JS objects.
  })
  return response
}



export const removeFavouriteFromDb = async (tmdbId) => {

  const response = await fetch(`/api/favourites/${tmdbId}`, {
    method: 'DELETE'                                            // DELETE method specifies that we want to delete the resource at this URL path
  })
  return response
}

// the reason it isnt the same as above is because we are deleting a specific resource (the movie we want to remove from the favourites) 
// from the backend database, and the backend controller only accepts the tmdbId of the movie we want to remove from the favourites 
// not the whole movie object like above (addFavouriteToDb)






// from the way we need to define the key, the error handling, etc, to even the route
// so it quite a different writing process depends on how you structure your project, and how do you plan to use it
// like for example external api will need the throw errors, 
// but in the backend server we handle the error in the backend and send it to the frontend, etc, 
// (though you can also do it in the frontend like how we did with this movieApi.js, it's up to you.)
// it just depends on how you structure your project, and how do you plan to use it.

