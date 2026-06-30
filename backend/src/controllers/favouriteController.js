import Movie from '../models/movieModel.js';




// GET /api/favourites - Retrieve all favourites
export async function getFavourites(req, res) {
    try {
        // Find all favourited movies and sort them by creation date descending (newest first)
        const favourites = await Movie.find().sort({ createdAt: -1 });
        res.status(200).json(favourites);
    } catch (error) {
        console.error('Error retrieving favourites:', error);
        res.status(500).json({ message: "Error retrieving favourites", error: error.message });
    }
}





// POST /api/favourites - Save a movie to favourites
export async function addFavourite(req, res) {
    const { tmdbId, title, poster_path, overview, release_date, vote_average } = req.body;

    // Validate required fields
    if (!tmdbId || !title || !poster_path || !overview || !release_date || vote_average === undefined) {
        return res.status(400).json({ message: "Missing required fields in request body" });
    }

    try {
        // Check if the movie is already favourited to avoid duplicates
        const existing = await Movie.findOne({ tmdbId });
        if (existing) {
            return res.status(200).json({ message: "Movie already in favourites", movie: existing });
        }

        // Create and save new favourite movie document
        const newFavourite = new Movie({
            tmdbId,
            title,
            poster_path,
            overview,
            release_date,
            vote_average
        });

        await newFavourite.save();
        res.status(201).json(newFavourite);

    } catch (error) {
        console.error('Error saving movie to favourites:', error);
        res.status(500).json({ message: "Error saving movie to favourites", error: error.message });
    }
}






// DELETE /api/favourites/:tmdbId - Remove a movie from favourites
export async function removeFavourite(req, res) {
    const { tmdbId } = req.params;

    if (!tmdbId) {
        return res.status(400).json({ message: "tmdbId parameter is required" });
    }

    try {
        // Delete the movie document by its tmdbId (matching TMDB ID)
        const deletedMovie = await Movie.findOneAndDelete({ tmdbId: Number(tmdbId) });

        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found in favourites" });
        }

        res.status(200).json({ message: "Movie removed from favourites successfully", movie: deletedMovie });
    } catch (error) {
        console.error('Error removing movie from favourites:', error);
        res.status(500).json({ message: "Error removing movie from favourites", error: error.message });
    }
}
