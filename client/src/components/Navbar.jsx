import { Link } from "react-router-dom"

function Navbar(){
  return(
    <div className="bg-zinc-700 flex px-2 py-4 justify-between">
      <Link to='/' className='text-white font-bold text-lg'><h1>React MySQL</h1></Link>
      <ul className="flex gap-x-1">
        <Link to='/' className="bg-slate-200 px-2 py-1 rounded-sm font-semibold hover:bg-slate-50"><li>Home</li></Link>
        <Link to='/new' className="bg-slate-200 px-2 py-1 rounded-sm font-semibold hover:bg-slate-50"><li>New Task</li></Link>
      </ul>
    </div>
  )
}

export default Navbar