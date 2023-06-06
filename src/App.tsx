import { createContext, useReducer } from 'react'

// Fontaweason
import '@fortawesome/fontawesome-svg-core/styles.css'

// Styles
import './styles/app.scss'
import { TaskListComponent } from './components/pure/TaskListComponent'
import TaskReducer, { TaskActions, TaskFilter, taskInitialState, TaskState } from './features/task/taskReducer'

interface TaskContextValue {
  state: TaskState
  addTask: (taskText: string) => void
  toggleTask: (idTask: number) => void
  deleteTask: (idTask: number) => void
  filterTasks: (filter: TaskFilter) => void
}

export const TaskContext  = createContext<TaskContextValue>(
  {
    state: taskInitialState,
    addTask: (taskText:string) => { throw new Error('not Implement: ' + taskText) },
    toggleTask: (idTask: number) => { throw new Error('not Implement: ' + idTask) },
    deleteTask: (idTask: number) => { throw new Error('not Implement: ' + idTask) },
    filterTasks: (filter: TaskFilter) => { throw new Error('not Implement: ' + filter) },
  }
)


function App() {

  const [state, dispatch] = useReducer(TaskReducer, taskInitialState)

  const addTask = (taskText: string) => {
    dispatch({ type: TaskActions.ADD_TASK, taskText })
    filterTasks(state.filter)
  }

  const toggleTask = (idTask: number) => {
    dispatch({ type: TaskActions.TOGGLE_TASK, idTask })
    filterTasks(state.filter)
  }

  const deleteTask = (idTask: number) => {
    dispatch({ type: TaskActions.DELETE_TASK, idTask })
  }

  const filterTasks = (filter: TaskFilter) => {
    dispatch({ type: TaskActions.FILTER_TASKS, filter })
  }


  return (
    <>
      <TaskContext.Provider value={ { state, addTask, toggleTask, deleteTask, filterTasks } }>
        <TaskListComponent></TaskListComponent>
      </TaskContext.Provider>
    </>
  )
}

export default App
