import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'RESTORE_SESSION':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Restore session from localStorage
    const savedUser = localStorage.getItem('todo-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'RESTORE_SESSION', payload: user });
      } catch (error) {
        localStorage.removeItem('todo-user');
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  }, []);

  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple demo authentication - in production, this would be an API call
    if (username && password.length >= 6) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email: `${username}@example.com`,
      };
      
      localStorage.setItem('todo-user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('todo-user');
    localStorage.removeItem('todos');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};