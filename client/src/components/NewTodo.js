import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import * as yup from 'yup'
import newTodoSchema from '../utils/newTodoSchema'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFormValues = {
  title: '',
  activity: '',
}

const initialFormErrors = {
  title: '',
  activity: '',
}

const NewTodo = () => {

  const { push } = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  const handleChange = e => {
    yup.reach(newTodoSchema, e.target.name)
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
    newTodoSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const handleSubmit = e => {
    e.preventDefault();
    const newTodo = {
      title: formValues.title.trim(),
      activity: formValues.activity.trim(),
    }

    axiosWithAuth().post('/todos', newTodo)
      .then(res => {
        console.log(res)
        push('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <section>
      <header>
        <div className="logo">
          <Link to='/'><img src="" alt="logo" /></Link>
        </div>
      </header>
      <section className="form_section">
        <h1>Add New Todo</h1><br />
        <form onSubmit={handleSubmit}>
          <div className="form-group form-label mt-3">
            <label htmlFor="title">Title:</label>
            <input className="form-control" onChange={handleChange} value={formValues.title} name="title" id="title" placeholder="Title" />
          </div>
          <p className='errors'>{formErrors.title}</p>
          <div className="form-group form-label mt-3">
            <label htmlFor="activity">Activity:</label>
            <input className="form-control" onChange={handleChange} value={formValues.activity} name="activity" id="activity" placeholder="Activity" />
            <p className='errors'>{formErrors.activity}</p>
          </div>
          <br />
          <button disabled={disabled}>Create New Todo</button>
          <Link to={'/dashboard'}><button className="btn btn-secondary"  type="button"  value="Cancel"> Cancel </button></Link>
        </form>
      </section>
    </section>
  );
}

export default NewTodo