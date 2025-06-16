// src/components/SignUpForm.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <h2>SignUp</h2>
  {error && <p className="error-message">{error}</p>}
  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
  <button type="submit">SignUp</button>
</form>

  );
};

export default SignUpForm;
