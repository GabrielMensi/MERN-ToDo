import { createContext, useContext, useState } from "react";
import { getTasksRequest, deleteTaskRequest, createTaskRequest, getTaskRequest, updateTaskRequest, toggleTaskRequest } from "../api/tasks.api";

export const TaskContext = createContext();

export const useTasks = () => {

  const context = useContext(TaskContext);
  
  if(!context) {
    throw new Error('useTasks must be used within a TaskContextProvider');
  }
  return context
}


export const TaskContextProvider = ({ children }) => {

  const [tasks, setTasks] = useState([])
  
  async function deleteTask (id) {
  try {
    const response = await deleteTaskRequest(id)
    setTasks(tasks.filter(task => task.id !== id))
    console.log(response)
  } catch (error){
    console.log(error)
  }
  }

  async function loadTasks  () {
    const response = await getTasksRequest()
    setTasks(response.data)
  }

  async function createTask (task) {
  try {
    const response = await createTaskRequest(task)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
  }

  async function getTask (id) {
    try{
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async function updateTask (id, newFields) {
    try{
      const response = await updateTaskRequest(id, newFields)
      console.log(response)
    } catch (error) {
    console.log(error)
    }
  }

  const toggleTask = async (id) => {
    try{
      const taskFound = tasks.find(task => task.id === id);
      await toggleTaskRequest(id, taskFound.done === 1 ? 0 : 1);
      tasks.map(task => task.id === id ? task.done = task.done === 1 ? 0 : 1 : task.done)
      setTasks([...tasks])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, deleteTask, createTask, getTask, updateTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
    );
};