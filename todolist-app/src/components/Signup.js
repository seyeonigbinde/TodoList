import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import * as yup from 'yup'
import formSchema from '../utils/formSchema'
import axios from 'axios'

import altrestlogo2 from '../images/altrestlogo2.png'
import DashFooter from './DashFooter'

const initialFormValues = {
  email: '',
  password: '',
}

const initialFormErrors = {
  email: '',
  password: '',
}

const Signup = () => {
  const { push } = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  const handleChange = e => {
    yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setFormErrors({ ...formErrors, [e.target.name]: '' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] })
      })

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })

  }

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }

    axios.post('https://altrest-app.herokuapp.com/api/auth/register', newUser)
      .then(res => {
        console.log(res)
        push('/login')
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <section>
      <header>
        <div className="logo">
          <Link to='/'><img src={altrestlogo2} alt="logo" /></Link>
        </div>
      </header>
      <section className="form_section">
        <h1>Sign Up</h1><br />
        <form onSubmit={handleSubmit}>
          <div className="form-group form-label mt-3">
            <label htmlFor="email">Email Address:</label>
            <input className="form-control" onChange={handleChange} value={formValues.email} name="email" id="email" placeholder="Email Address" />
          </div>
          <p className='errors'>{formErrors.email}</p>
          <div className="form-group form-label mt-3">
            <label htmlFor="password">Password:</label>
            <input className="form-control" onChange={handleChange} value={formValues.password} name="password" id="password" type="password" placeholder="Password" />
            <p className='errors'>{formErrors.password}</p>
          </div>
          <br />
          <button disabled={disabled}>Sign Up</button>
        </form><br />
        <p className="signup_login"> Already have an account? <Link to="/login">Login</Link></p>
      </section>
      <DashFooter/>
    </section>
  );
}

export default Signup
