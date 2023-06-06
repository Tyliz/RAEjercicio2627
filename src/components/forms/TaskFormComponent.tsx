import { useContext } from 'react'

// Formik
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TaskContext } from '../../App'


export const TaskFormComponent = () => {
  const { addTask } = useContext(TaskContext)


  const newTaskSchema = Yup.object().shape(
    {
      text: Yup.string()
        .required('Text is required'),
    }
  )

  const initialValues = {
    text: '',
  }

  const onSubmitNewTask = (values: { text:string }): void => {
    if (values.text !== '') {
      addTask(values.text)
      values.text = ''
    }
  }

  return (
    <div className='sub-container'>
      <fieldset className='fieldset'>
        <legend className='fieldset__legend'>Create a new task</legend>
        <Formik initialValues={ initialValues } onSubmit={ onSubmitNewTask } validationSchema={ newTaskSchema }>
          <Form className='form-container' >
            <div className='form-field'>
              <Field id='text' name='text' className='form-field__input' />
              <label htmlFor='text' className='form-field__label'>Task Content</label>
              <ErrorMessage name='text' component='div' className='error-message' />
            </div>
            <div className='text-center'>
              <button type='submit' className='btn btn-success'>
                Add New Task <FontAwesomeIcon icon={ faPlus } />
              </button>
            </div>
          </Form>
        </Formik>
      </fieldset>
    </div>
  )
}
