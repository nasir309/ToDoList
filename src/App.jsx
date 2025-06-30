

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import { TaskProvider } from './Context/TaskContext' 
import TaskForm from './Components/TaskForm'
import TaskList from './Components/TaskList'
import './index.css'; 

const Dashboard = () => <div className="page-content">Welcome to your dashboard!</div>;

const App = () => (
  <>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<div className="page-content">Home Page</div>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    <TaskProvider>
      <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen rounded-lg shadow-xl my-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          To-Do List
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  </>
);

export default App;


