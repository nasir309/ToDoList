import React, { useState } from 'react';
import { useTasks } from '../Context/TaskContext'; 

function TaskList() {
  
  const { tasks, isLoading, error, deleteTask, toggleTaskCompletion, updateTask } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const handleSaveEdit = (id) => {
    if (newTitle.trim() === '') {
      alert("Task title cannot be empty!");
      return;
    }
    updateTask(id, { title: newTitle.trim(), description: newDescription.trim() });
    setEditingTaskId(null); // Exit edit mode
    setNewTitle('');
    setNewDescription('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setNewTitle('');
    setNewDescription('');
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600 text-lg">Loading your tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600 text-lg">Error: {error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500 text-lg">No tasks added yet! Start by adding one above.</div>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
            task.isCompleted ? 'bg-green-50 border-green-200 line-through text-gray-500' : 'bg-white text-gray-800'
          }`}
        >
          {editingTaskId === task.id ? (
            <div className="flex-grow w-full">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-gray-700"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border rounded text-gray-700 h-20 resize-none"
              ></textarea>
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-3 rounded transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-bold py-1 px-3 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-start w-full">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-3 mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-grow">
                <span className="font-semibold text-lg break-words w-full block">
                  {task.title}
                </span>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1 break-words w-full block">
                    {task.description}
                  </p>
                )}
                <span className="text-xs text-gray-400 mt-1 block">
                    Created: {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {!editingTaskId && ( 
            <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
              <button
                onClick={() => handleEditClick(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-3 rounded transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
