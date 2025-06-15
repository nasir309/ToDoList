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
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="block w-full mb-2" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input className="block w-full mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button className="bg-green-500 text-white px-4 py-2" type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
