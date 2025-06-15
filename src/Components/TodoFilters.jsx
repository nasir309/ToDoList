import React from 'react';
import { Search } from 'lucide-react';
import { useTodos } from '../contexts/TodosContext';

const TodoFilters = () => {
  const { filter, setFilter, searchQuery, setSearchQuery, stats } = useTodos();

  const filters = [
    { key: 'all', label: 'All Tasks', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === key
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white/80 backdrop-blur text-gray-600 hover:bg-white border border-gray-200 hover:border-gray-300'
            }`}
          >
            {label}
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                filter === key
                  ? 'bg-blue-400 bg-opacity-30 text-blue-100'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;