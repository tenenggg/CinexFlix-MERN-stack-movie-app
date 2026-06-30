// Imports
import express from 'express';
import dotenv from 'dotenv';

import favouriteRoutes from './routes/favouriteRoute.js';
import { connectDB } from './config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";




dotenv.config();        // Load environment variables from .env file, if present.




// Server setup
const app = express();




// Global middleware
app.use(express.json());                // Parse JSON request bodies
app.use(rateLimiter);                   // apply rate limiting to all routes. can see at middleware folder and config folder.







// API routes 
app.use('/api/favourites', favouriteRoutes);






// connect with database and start the server 

connectDB().then(() => {                                                // Connect to MongoDB using the connection function defined in db.js. 

    const PORT = process.env.PORT || 5003;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {                                           // error listener for server startup issues.
        if (err.code === 'EADDRINUSE') {                                // port is already taken, or previous instance is still running
            console.error(`Port ${PORT} is already in use.`);
        } else {
            console.error('Server error:', err);                        // other startup errors (e.g. permissions, invalid config, network issues)
        }
        process.exit(1);                                                // crash loudly or kills the process on startup failure
    });


});


