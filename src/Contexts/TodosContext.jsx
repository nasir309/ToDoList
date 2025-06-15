import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TodosContext = createContext(null);

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'ADD_TODO':
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { ...state, todos: [...state.todos, newTodo] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, updatedAt: new Date() }
            : todo
        ),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'CLEAR_ALL_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  filter: 'all',
  searchQuery: '',
};

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const { user } = useAuth();

  // Load todos from localStorage when user is authenticated
  useEffect(() => {
    if (user) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          const todos = JSON.parse(savedTodos).map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
          }));
          dispatch({ type: 'SET_TODOS', payload: todos });
        } catch (error) {
          console.error('Error loading todos:', error);
        }
      }
    } else {
      dispatch({ type: 'SET_TODOS', payload: [] });
    }
  }, [user]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (user && state.todos.length >= 0) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }, [state.todos, user]);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const clearAllCompleted = () => {
    dispatch({ type: 'CLEAR_ALL_COMPLETED' });
  };

  // Filter and search todos
  const filteredTodos = state.todos.filter(todo => {
    const matchesFilter = 
      state.filter === 'all' ||
      (state.filter === 'active' && !todo.completed) ||
      (state.filter === 'completed' && todo.completed);
    
    const matchesSearch = 
      state.searchQuery === '' || 
      todo.text.toLowerCase().includes(state.searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(todo => !todo.completed).length,
    completed: state.todos.filter(todo => todo.completed).length,
  };

  return (
    <TodosContext.Provider
      value={{
        ...state,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
        setSearchQuery,
        clearAllCompleted,
        filteredTodos,
        stats,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};