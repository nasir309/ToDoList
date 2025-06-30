// src/components/LoginForm.js
import  { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
  <h2>Login</h2>
  {error && <p className="error-message">{error}</p>}
  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
  <button type="submit">Login</button>
  <p>
    Don't have an account? <a href="/signup">Sign Up</a></p>
</form>

</>
  );
};

export default LoginForm;
