import Axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com/todos"

export const getTasks = () => Axios.get(API_URL); 
export const getTask = (id) => Axios.get(`${API_URL}/${id}`); 
export const createTask = (task) => Axios.post(API_URL, task); 
export const updateTask = (id, updatedTask) => 
Axios.put(`${API_URL}/${id}`, updatedTask); 
export const deletePost = (id) => Axios.delete(`${API_URL}/${id}`); 