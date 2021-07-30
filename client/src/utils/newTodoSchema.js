import * as yup from 'yup'

const newTodoSchema = yup.object().shape({

  title: yup.string()
    .trim()
    .required('title is required')
    .min(3, 'Title must be than 3 characters long'),
  activity: yup.string()
    .trim()
    .required('Activity is required')
    .max(50, 'Activity must be more than 50 characters'),
  
})

export default newTodoSchema