import mongoose from 'mongoose';

// Schema for movie document stored in favourites collection
// schema is like the blueprint of the data we are going to store in the database
// and the rules and constraints of the data we are going to store in the database
// for example, what data is required and what data is not required

// its the same concept as mysql, which has table but called collection in mongodb
// and mysql has rows but called documents in mongodb, columns are called fields in mongodbs
// but mongodb is not strict like mysql, thus you have to create your own rules 

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,             // data type 
        required: true,           // required field, your data can't be empty 
        unique: true              // unique field, your data can't be repeated
    },
    title: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number,
        required: true
    }
}, {
    timestamps: true                        // createdAt and updatedAt fields will be automatically added and managed by Mongoose
});

// Create model 'Movie' mapping specifically to the 'favourites' collection
//  so that other files in the backend can use this model to interact with the favourites collection
const Movie = mongoose.model('Movie', movieSchema, 'favourites');
export default Movie;

