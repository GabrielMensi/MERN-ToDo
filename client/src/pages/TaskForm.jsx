import {Formik, Form} from 'formik';
import { useTasks } from '../context/TaskContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskForm() {

  const {createTask, getTask, updateTask} = useTasks();
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const loadTask = async () =>{ 
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask();
  },[params.id])

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);
          if(params.id){
            await updateTask(params.id, values);
            navigate('/');
          } else {
            await createTask(values);
            navigate('/');
          }
          setTask({
            title: '',
            description: '',
            });
        }} >
        {({handleChange, handleSubmit, isSubmitting, values}) => (
          <Form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10'>
            <h1 className='text-xl font-bold uppercase text-center'>{params.id ? 'Edit Task' : 'New Task'}</h1>
            <label htmlFor='title' className='block'>Title</label>
            <input
              type='text' 
              name='title' 
              placeholder='Write a title'
              value={values.title}
              onChange={handleChange}
              className='p-2 py-1 rounded-sm w-full'
              />

            <label htmlFor='description' className='block'>Description</label>
            <textarea 
              name='description'
              rows='3'
              placeholder='Write a description'
              value={values.description}
              onChange={handleChange}
              className='p-2 py-1 rounded-sm w-full resize-none'
              />

            <button 
              type='submit' 
              disabled={isSubmitting} 
              className='block bg-indigo-500 px-2 py-1 w-full text-white rounded-sm'> {isSubmitting? 'loading...' : 'Submit' } </button>
          </Form>
          )}
      </Formik>
    </div>
  )
}

export default TaskForm