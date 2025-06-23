// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1>What To Do?</h1>
      <nav className="space-x-4">
        {isLoggedIn ? (
          <>
            <span>{user.email}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
