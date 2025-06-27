# Music App Frontend

This is the React-based frontend for the Music App — a full-stack music streaming platform that supports secure login, playlist creation, and audio playback. It interacts with a Flask REST API for user authentication and media data.

---

# Tech Stack

- React (with Hooks)
- React Router
- Fetch API for HTTP requests
- HTML5 Audio API
- JWT-based authentication

---

# Getting Started

# 1. Clone the repo

bash
git clone https://github.com/yourusername/music-frontend.git
cd music-frontend


# 2. Install dependencies

bash
npm install


# 3. Set environment variables

Create a .env file in the root folder:

env
VITE_API_BASE_URL=http://localhost:5000


If using a deployed backend (e.g. Render):

env
VITE_API_BASE_URL=https://your-flask-api.onrender.com


---

# Running the App Locally

bash
npm run dev


App will be available at:  
[http://localhost:5173](http://localhost:5173)

---

#Authentication Flow

- Login via POST /api/auth/login to get a JWT token
- JWT is stored in localStorage
- All protected requests attach the token via Authorization: Bearer <token>

---

# Features

-  User login and registration
-  Browse all available songs
-  Play any track using <audio>
-  Create playlists and add songs
-  Persistent JWT session
-  Custom audio streaming route support

---

# File Structure


src/
├── components/
│   ├── LoginPage.jsx
│   ├── Dashboard.jsx
│   ├── AudioPlayer.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx


---

# Deployment

To build for production:

bash
npm run build


Then host the dist/ folder on:
- Netlify
- Vercel
- GitHub Pages
- or any static hosting platform

> Make sure to set VITE_API_BASE_URL to your deployed backend URL in production.

---

# Coming Soon (Tests & Enhancements)

- Auth guards for protected routes
-  Audio player controls & loading state
-  Unit tests with Vitest or Jest
-  Playlist editing & removal

---

# Credits

Backend powered by Flask + SQLAlchemy
