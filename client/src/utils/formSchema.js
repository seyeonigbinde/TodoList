import * as yup from 'yup'

const formSchema = yup.object().shape({

  email: yup.string()
    .trim()
    .required('Email Address is required')
    .email('Must be a valid email address'),
  password: yup.string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  
})

export default formSchema
