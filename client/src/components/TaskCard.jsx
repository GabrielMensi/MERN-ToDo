import { useTasks } from "../context/TaskContext"
import { useNavigate } from "react-router-dom";

function TaskCard({task}){

  const {deleteTask, toggleTask} = useTasks();
  const navigate = useNavigate();

  const handleToggle = async (task) => {
    await toggleTask(task.id)
  }

    return (
      <div className="bg-zinc-700 text-white rounded-md p-4 flex flex-col border-box w-72">

        <header className="flex justify-between">
          <h2 className="text-lg font-bold select-none ... break-all">{task.title}</h2>
          <span>{task.done === 1 ? '✅' : '❌'}</span>
        </header>

        <p className="text-xs select-none ... my-1 break-all">{task.description}</p>
        <span className="text-xs text-slate-500 text-right select-none ... my-1">{task.createAt}</span>

        <div className="flex float-right gap-x-2 mt-2">
          <button 
            className="bg-red-600 px-2 py-1 text-white rounded-sm hover:bg-red-500" 
            onClick={() => deleteTask(task.id)}>Delete</button>
          <button
            className="bg-slate-600 px-2 py-1 text-white rounded-sm hover:bg-slate-500" 
            onClick={() => navigate(`/new/${task.id}`)}>Edit</button>
          <button
            className="bg-green-600 px-2 py-1 text-white rounded-sm hover:bg-green-500" 
            onClick={()=> handleToggle(task)}>Toggle Task</button>
        </div>
        
      </div>
  )
}

export default TaskCard