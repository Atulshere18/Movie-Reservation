import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListPage from './pages/MovieListPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import Newuser from './pages/newuser';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/booking/:movieId" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/newuser' element={<Newuser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
