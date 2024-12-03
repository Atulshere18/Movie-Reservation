import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieListPage.css';

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => {
        setMovies(response.data.movies); // Assuming response contains the 'movies' array
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleBookNow = (movieId) => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');  // Check if the user is logged in
    if (isUserLoggedIn) {
      navigate(`/booking/${movieId}`);
    } else {
      alert('Please log in to book tickets. If you are new, please create an account.');
      navigate('/login');  // Redirect to login page
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className="page-title">Movies Available</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={movie.posterUrl || 'https://via.placeholder.com/150'}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-genre">{movie.genre}</p>
              <h3 className="movie-showtime-title">Showtimes:</h3>
              <ul className="movie-showtimes">
                {movie.showtimes.map((showtime, index) => (
                  <li key={index}>{showtime}</li>
                ))}
              </ul>
              <button
                onClick={() => handleBookNow(movie.id)} 
                className="book-button"
              >
                Book Movie
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
