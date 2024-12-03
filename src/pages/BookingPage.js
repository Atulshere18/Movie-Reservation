import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingPage.css";

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/movies/${movieId}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setIsBookingConfirmed(true);
  };

  const handlePaymentRedirect = () => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn'); // Check login status
    if (isUserLoggedIn) {
      navigate("/payment", { state: { movie, selectedSeats } });
    } else {
      alert('Please log in to proceed with payment.');
      navigate('/login');
    }
  };

  if (!movie) {
    return <div className="loading">Loading movie details...</div>;
  }

  return (
    <div className="booking-page">
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(${movie.bannerUrl || "https://via.placeholder.com/1500x500"})`,
        }}
      >
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-description">{movie.description}</p>
      </div>

      <div className="seats-section">
        <h2>Select Your Seats</h2>
        <div className="seats-grid">
          {Array.from({ length: 50 }, (_, i) => {
            const seatNumber = i + 1;
            const isSelected = selectedSeats.includes(seatNumber);
            return (
              <button
                key={seatNumber}
                className={`seat ${isSelected ? "selected" : ""}`}
                onClick={() => handleSeatSelection(seatNumber)}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>
      </div>

      <div className="booking-controls">
        <button className="confirm-booking-button" onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
      </div>

      {isBookingConfirmed && (
        <div className="booking-success">
          <h3>Booking Confirmed!</h3>
          <p>Seats: {selectedSeats.join(", ")}</p>
          <button onClick={handlePaymentRedirect}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
