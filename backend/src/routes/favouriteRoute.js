import express from 'express';
import { getFavourites, addFavourite, removeFavourite } from '../controllers/favouriteController.js';

const router = express.Router();


router.get('/', getFavourites);                         // Route: GET /api/favourites - Retrieve all favourites
router.post('/', addFavourite);                         // Route: POST /api/favourites - Save a movie to favourites
router.delete('/:tmdbId', removeFavourite);             // Route: DELETE /api/favourites/:tmdbId - Remove a movie from favourites by TMDB ID

export default router;
