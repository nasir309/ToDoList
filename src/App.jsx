import React from 'react'
import { TaskProvider } from './Context/TaskContext' 
import TaskForm from './Components/TaskForm'
import TaskList from './Components/TaskList'
import './index.css'

function App() {
  return (
    
    <TaskProvider>
      <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen rounded-lg shadow-xl my-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          To-Do List
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App