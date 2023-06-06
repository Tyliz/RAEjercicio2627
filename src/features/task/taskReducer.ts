import Task from '../../structure/task/task'


export enum TaskFilter {
  SEE_ALL = 'SEE ALL',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface TaskState {
  lstTask: Task[]
  lstToShowTask: Task[]
  idLastTask: number
  filter: TaskFilter
}


export const taskInitialState: TaskState = {
  lstTask: [],
  lstToShowTask: [],
  idLastTask: 0,
  filter: TaskFilter.SEE_ALL
}

export enum TaskActions {
  ADD_TASK = 'ADD_TASK',
  TOGGLE_TASK = 'TOGGLE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  FILTER_TASKS = 'FILTER_TASKS',
}

export interface TaskActionStructure {
  type: TaskActions,
  idTask?: number,
  taskText?: string,
  filter?: TaskFilter,
}


const TaskReducer = (state: TaskState, action: TaskActionStructure): TaskState => {
  let idTask = 0
  let taskText = ''
  if (action.taskText !== undefined) {
    taskText = action.taskText
  }
  if (action.idTask !== undefined) {
    idTask = action.idTask
  }
  let filter = TaskFilter.SEE_ALL
  if (action.filter !== undefined) {
    filter = action.filter
  }
  let lstToShowTask: Task[] = []
  switch (action.type) {
    case TaskActions.ADD_TASK:
      idTask = state.idLastTask++
      return {
        ...state,
        idLastTask: idTask,
        lstTask: [
          ...state.lstTask,
          {
            id: idTask,
            text: taskText,
            completed: false
          },
        ],
      }
    case TaskActions.TOGGLE_TASK:
      return {
        ...state,
        lstTask: state.lstTask.map((task) =>
          task.id === idTask
          ? {
            ...task,
            completed: !task.completed,
          }
          : task),
      }
    case TaskActions.DELETE_TASK:
      return {
        ...state,
        lstTask: state.lstTask.filter((task) => task.id !== idTask),
        lstToShowTask: state.lstToShowTask.filter((task) => task.id !== idTask),
      }
    case TaskActions.FILTER_TASKS:
      switch (filter) {
        case TaskFilter.PENDING:
          lstToShowTask = state.lstTask.filter((task) => !task.completed)
          break
        case TaskFilter.COMPLETED:
          lstToShowTask = state.lstTask.filter((task) => task.completed)
          break
        case TaskFilter.SEE_ALL:
          lstToShowTask = [
            ...state.lstTask
          ]
          break
        default:
          lstToShowTask = [
            ...state.lstToShowTask
          ]
          break
      }

      return {
        ...state,
        filter,
        lstToShowTask,
      }
    default:
      throw new Error('Action doesn\'t exist.')
  }
}

export default TaskReducer
