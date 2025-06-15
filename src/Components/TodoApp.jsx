import React from 'react';
import { LogOut, CheckCircle2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTodos } from '../contexts/TodosContext';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const { user, logout } = useAuth();
  const { filteredTodos, stats, clearAllCompleted } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TodoFlow</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.username}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Todo */}
          <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Task</h2>
            <TodoForm />
          </div>

          {/* Filters and Search */}
          <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
              {stats.completed > 0 && (
                <button
                  onClick={clearAllCompleted}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Completed
                </button>
              )}
            </div>
            <TodoFilters />

            {/* Todo List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    {stats.total === 0 ? 'No tasks yet' : 'No tasks match your filters'}
                  </p>
                  <p className="text-gray-400">
                    {stats.total === 0 ? 'Add your first task to get started!' : 'Try adjusting your search or filter.'}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoApp;
