import React from "react";
import { useLocation } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const { movie, selectedSeats } = location.state || { movie: {}, selectedSeats: [] };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <p>Movie: {movie.title}</p>
      <p>Seats: {selectedSeats.join(", ")}</p>

      <h2>Payment Method</h2>
      <form className="payment-form">
        <div>
          <label>Cardholder Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Card Number:</label>
          <input type="text" placeholder="1234 5678 9012 3456" />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input type="month" />
        </div>
        <div>
          <label>CVV:</label>
          <input type="text" placeholder="123" />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

console.log("state: ", location.state);

export default PaymentPage;
