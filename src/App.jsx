import React from 'react';
import { useAuth } from './Contexts/AuthContext';
import { AuthProvider } from './Contexts/AuthContext';
import { TodosProvider } from './Contexts/TodosContext';
import Login from './Components/Login';
import TodoApp from './Components/TodoApp';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  ) : (
    <Login />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;