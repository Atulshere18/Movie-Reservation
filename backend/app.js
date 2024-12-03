const express = require("express"); // Import Express.js
const cors = require("cors"); // Middleware for handling CORS
const dotenv = require("dotenv"); // Load environment variables
const movieRoutes = require("./routes/movieRoutes"); // Import movie routes
const { connectDB } = require("./config/db"); // Import DB connection function
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config(); // Load .env variables
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes); // Protecting these routes with the JWT middleware

// Routes
app.use("/api/movies", movieRoutes); // Movies-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
