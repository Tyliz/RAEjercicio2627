import PropTypes, { type InferProps } from 'prop-types'
import { TaskProps } from '../../structure/task/task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'

const TaskComponentProps = {
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  task: PropTypes.shape(TaskProps).isRequired,
}

const TaskComponent = (
  { onToggleTask, onDeleteTask, task }: InferProps<typeof TaskComponentProps>
) => {
  const getClassTask = (): string => {
    let classCss = 'task'
    if (task.completed) {
      classCss += ' task--completed'
    } else {
      classCss += ' task--pending'
    }

    return classCss
  }

  const getClassIcon = (): string => {
    let classCss = 'icon icon--btn'
    if (task.completed) {
      classCss += ' icon--checked'
    } else {
      classCss += ' icon--not-checked'
    }

    return classCss
  }

  return (
    <tr className='table__row'>
      <td className='table__col table__col--center'>
        <FontAwesomeIcon onClick={ onToggleTask } icon={ !task.completed? faSquare : faSquareCheck } className={ getClassIcon() } /> { task.id }
      </td>
      <td className='table__col table__col--center'>{ task.text }</td>
      <td className='table__col table__col--center'>
        <span className={ getClassTask() }>{ task.completed? 'completed': 'pending' }</span>
      </td>
      <td className='table__col table__col--center'>
        <button className='btn-danger' onClick={ onDeleteTask }>
          Delete <FontAwesomeIcon icon={ faTrash } />
        </button>
      </td>
    </tr>
  )
}

TaskComponent.propTypes = TaskComponentProps

export default TaskComponent
