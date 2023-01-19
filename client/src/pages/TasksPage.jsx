import { useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { useTasks } from "../context/TaskContext"

function TaskPage() {

  const {tasks, loadTasks} = useTasks();

  useEffect(()=>{
    loadTasks()
  },[])
  
  function renderMain(){
    if(tasks.length === 0){
      return <h2>There are no tasks</h2>
    }
    return tasks.map((task) => <TaskCard key={task.id} task={task} />)
  }

  return(
    <div>
      <h1 className="text-5xl text-white font-bold text-center mb-5">Tasks</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {renderMain()}
      </div>
    </div>
  )
}

export default TaskPage