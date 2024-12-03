const express = require("express");
const { getMovies, addMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies); // Get all movies
router.post("/", addMovie); // Add a movie

module.exports = router;
