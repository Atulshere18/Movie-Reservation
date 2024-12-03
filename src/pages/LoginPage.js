import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();  // Use navigate instead of history

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    setEmailValid(true);
    setLoading(true);
    const loginData = { email, password };

    axios.post('http://localhost:5000/login', loginData)
      .then((response) => {
        setLoading(false);
        alert('Login successful!');
        // Redirect to another page
        // navigate('/dashboard'); // Uncomment and adjust to your route
      })
      .catch((error) => {
        setLoading(false);
        console.error('Login failed:', error);
        setError('Invalid credentials or user does not exist');
      });
  };

  const handleCreateAccount = () => {
    // Navigate to the Create Account page
    navigate('/newuser');  // Use navigate to redirect
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!emailValid && <p style={{ color: 'red' }}>Please enter a valid email.</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>
        Don't have an account?{' '}
        <span onClick={handleCreateAccount} style={{ color: 'blue', cursor: 'pointer' }}>
          Create an account
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
