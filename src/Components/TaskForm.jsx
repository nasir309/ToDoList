import { useState } from 'react';
import { useTasks } from '../Context/TaskContext';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTask } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title, description);
            setTitle('');
            setDescription('');
        } else {
            alert("Task title cannot be empty!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
                <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2">
                    Task Title:
                </label>
                <input
                    type="text"
                    id="taskTitle"
                    placeholder="e.g., Buy groceries"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2">
                    Description (Optional):
                </label>
                <textarea
                    id="taskDescription"
                    placeholder="e.g., Milk, eggs, bread for the week"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;