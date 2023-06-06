import React, { useContext, useRef } from 'react'
import TaskComponent from './TaskComponent'
import { TaskFormComponent } from '../forms/TaskFormComponent'
import { TaskContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'
import { TaskFilter } from '../../features/task/taskReducer'


export const TaskListComponent = (): React.JSX.Element => {
  const { state, toggleTask, deleteTask, filterTasks } = useContext(TaskContext)

  const filterOption = useRef<HTMLSelectElement>(null)

  const changeFilter = () => {
    if (filterOption.current !== null) {
      filterTasks(TaskFilter[filterOption.current.value as keyof typeof TaskFilter])
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Your Tasks</h1>
      <div className='row'>
        <label className='label'>Filter:</label>
        <select className='select-form' onChange={ changeFilter } ref={ filterOption }>
          {
            (Object.keys(TaskFilter) as Array<keyof typeof TaskFilter>).map((key) =>
              (<option key={key}>{ TaskFilter[key] }</option>)
            )
          }
        </select>
      </div>
      <h4>
        Please press on <FontAwesomeIcon icon={ faSquare } className='icon icon--btn icon--not-checked' /> when you complete your task
      </h4>
      {
        state.lstToShowTask.length > 0 ?
        <table className='table'>
          <thead>
            <tr className='table__row'>
              <th className='table__head-col'>id</th>
              <th className='table__head-col'>task</th>
              <th className='table__head-col'>state</th>
              <th className='table__head-col'>actions</th>
            </tr>
          </thead>
          <tbody>
            {
              state.lstToShowTask.map((task, index) => (
                <TaskComponent key={ index } onToggleTask={ () => toggleTask(task.id) } onDeleteTask={ () => deleteTask(task.id) } task={ task } />
              ))
            }
          </tbody>
        </table>
        : <>
          <div className='message'>
            <FontAwesomeIcon icon={ faSadCry } />
            You don't have any task jet, please add one or change the filter
          </div>
        </>
      }
      <TaskFormComponent />
    </div>
  )
}
