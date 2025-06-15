// src/App.js
import React from 'react'
// CORRECT IMPORT: Assuming your folder is 'context' (lowercase)
import { TaskProvider } from './Context/TaskContext' 
// CORRECT IMPORTS: Assuming your folder is 'components' (lowercase)
import TaskForm from './Components/TaskForm'
import TaskList from './Components/TaskList'
import './index.css'

function App() {
  return (
    // It's good practice to wrap everything in a single div for layout/styling,
    // though a fragment (<> </>) would also work syntactically if no styling on root.
    // Adding a div here as previously recommended for better structure and Tailwind styling.
    <TaskProvider>
      <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen rounded-lg shadow-xl my-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          My Awesome To-Do List
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App