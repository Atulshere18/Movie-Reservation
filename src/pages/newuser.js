import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for navigation

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();  // Use navigate to handle redirection

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = () => {
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setEmailValid(true);
    setLoading(true);
    const accountData = { email, password };

    axios.post('http://localhost:5000/create-account', accountData)
      .then((response) => {
        setLoading(false);
        alert('Account created successfully!');
        // Redirect to login page or another page after account creation
        navigate('/login');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Account creation failed:', error);
        setError('Account creation failed, please try again.');
      });
  };

  return (
    <div className="create-account-page">
      <h2>Create Account</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCreateAccount} disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer' }}>
          Login
        </span>
      </p>
    </div>
  );
};

export default CreateAccountPage;
