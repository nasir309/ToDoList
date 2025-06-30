import  { createContext, useState, useEffect, useContext } from 'react';

export const TaskContext = createContext();

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setIsLoading(true);
            const storedTasks = localStorage.getItem('todo_tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (err) {
            console.error("Failed to load tasks from local storage:", err);
            setError("Failed to load your tasks. Data might be corrupted.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('todo_tasks', JSON.stringify(tasks));
            } catch (err) {
                console.error("Failed to save tasks to local storage:", err);
                setError("Failed to save tasks automatically. Your changes might not be remembered.");
            }
        }
    }, [tasks, isLoading]);

    const addTask = (title, description = '') => {
        const newTask = {
            id: generateUniqueId(),
            title: title.trim(),
            description: description.trim(),
            isCompleted: false,
            createdAt: Date.now(),
        };

        if (newTask.title === '') {
                alert("Task title cannot be empty!");
                return;
        }
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        console.log(` Task with ID ${id} deleted.`);
    };

    const toggleTaskCompletion = (id) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? {...tasks, isCompleted: !task.isCompleted} : task))
        console.log(`Task with ID ${id} completion toggled.`);
    };

    const updateTask = (id, updatedData) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? {...task, ...updatedData} : task) )
        console.log(`Task with ID ${id} updated with:`, updatedData);
    };

    const contextValue = {
        tasks,
        isLoading,
        error,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        updateTask,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
