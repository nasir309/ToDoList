import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodos } from '../contexts/TodosContext';

const TodoForm = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
          <Plus className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;