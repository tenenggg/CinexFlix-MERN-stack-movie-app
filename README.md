# CineFlix — MERN Stack Movie Discovery & Favorites Tracker

An elegant, premium, MERN stack movie discovery web application designed with a sleek dark-mode user interface reminiscent of premium streaming services. Users can browse popular movies, search for specific titles, view detailed metadata, and curate their personal favorites list which is persisted in a backend database.



---

## ✨ Features

- **Real-Time Movie Discovery:** Fetches popular and trending movies dynamically from The Movie Database (TMDB) API.
- **Smart Search with Debouncing:** Instantly search through thousands of movies with a 500ms debounce buffer to optimize API requests.
- **Personalized Watchlist (Favorites):** Save and delete favorite movies with persistent storage in MongoDB.
- **Upstash Redis Rate Limiting:** Dynamic protection against abuse with a sliding-window rate limiter (100 requests/minute) powered by Upstash Redis.
- **User-Friendly Notifications:** Elegant CSS toast alerts and top-bar warning banners for active feedback on user operations and rate limit events.
- **Responsive Premium Design:** Sleek dark-mode aesthetic styled using Tailwind CSS and custom glassmorphic properties.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS & Custom CSS variables
- **Navigation:** React Router DOM (active link underline styling)
- **Utilities:** `react-use` (for debouncing search inputs)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ORM)
- **Caching & Rate Limiting:** Redis (via Upstash Redis client and `@upstash/ratelimit`)

### Third-Party APIs
- **Movie Data:** The Movie Database (TMDB) API

---

## 📁 Repository Structure

```text
movie-netflix-app/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection & Upstash Redis configs
│   │   ├── controllers/     # Controller handlers (favorites logic)
│   │   ├── middleware/      # Express middleware (rate limiting)
│   │   ├── models/          # Mongoose schemas (Movie model)
│   │   ├── routes/          # Express route definitions
│   │   └── server.js        # Backend main entry point
│   ├── .env                 # Backend environment secrets
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # API services for fetching TMDB & Backend
│   │   ├── components/      # Reusable UI (Navbar, MovieCard, Spinner, Search)
│   │   ├── hooks/           # Custom React hooks (useMovies, useFavourites)
│   │   ├── pages/           # Page containers (HomePage, FavouritesPage)
│   │   └── main.jsx         # Frontend entry point
│   ├── .env                 # Frontend public environment variables
│   └── package.json
└── README.md
```

---

## ⚙️ Environment Configuration

You will need to set up environment variables in both the `backend` and `frontend` folders before running the app.

### 1. Backend Config (`backend/.env`)
Create a `.env` file inside the `backend` directory and add the following parameters:
```env
PORT=5003
MONGO_URI=mongodb://localhost:27017/cineflix
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

### 2. Frontend Config (`frontend/.env`)
Create a `.env` file inside the `frontend` directory and add:
```env
VITE_TMDB_API_KEY=your_tmdb_bearer_token_or_api_key
```

---

## 💻 Installation & Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed and running locally.

### Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/cineflix.git
cd cineflix
```

### Step 2: Set up the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the Express server in development mode:
   ```bash
   npm run dev
   ```
   *The server should run on http://localhost:5003*

### Step 3: Set up the Frontend
1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   *The client should launch on http://localhost:5173*

---

## 🔌 API Endpoints

All backend routes are protected under rate limiting.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/favourites` | Fetches all favourited movies from MongoDB |
| **POST** | `/api/favourites` | Saves a new movie to MongoDB favorites |
| **DELETE** | `/api/favourites/:tmdbId` | Deletes a movie from MongoDB favorites by TMDB ID |

---

## 🔒 Rate Limiting details

CineFlix protects backend operations using **Upstash Redis**:
- **Limiting Policy:** 100 requests per sliding window of 60 seconds.
- **Frontend Behavior:** If a request receives an HTTP 429 status code, a warning banner triggers at the top of the UI for 10 seconds warning the user to slow down.
