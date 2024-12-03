const { prisma } = require("../config/db");

// Fetch all movies
const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany(); // Fetch movies
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
};

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseDate } = req.body; // Movie data from request
    const movie = await prisma.movie.create({
      data: { title, genre, releaseDate },
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie" });
  }
};

module.exports = { getMovies, addMovie };
