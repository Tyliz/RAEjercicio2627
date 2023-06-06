import PropTypes from 'prop-types'


export default interface Task {
  id: number
  text: string
  completed: boolean
}

export const TaskProps = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
}
