import axios from "axios"
import React, { useState } from "react"
import { useHistory, Link } from 'react-router-dom'

const credentials = {
  email: "",
  password: ""
}
const Login = () => {

  const { push } = useHistory()

  const [userLogin, setUserLogin] = useState(credentials)

  const handleChange = e => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault()
    const newUser = {
      email: userLogin.email.trim(),
      password: userLogin.password.trim(),
    }
    axios.post('https://my-todolist-apps.herokuapp.com/api/auth/login', newUser)
      .then(res => {
        localStorage.setItem("token", res.data.token)
        push('/dashboard')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const error = ""

  return (
    <section>
      <header>
        <div className="logo">
          <Link to='/'><img src="" alt="logo" /></Link>
        </div>
      </header>
      <div className="form_section2">
        <div data-testid="loginForm" className="login-form">
          <h1>Login</h1><br />

          <form onSubmit={login}>
            <div className="form-group form-label mt-3">
              <label htmlFor="email">Email Address:  </label>
              <input
                className="form-control"
                type="text"
                name="email"
                data-testid="email"
                value={userLogin.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
              />
            </div>
            <div className="form-group form-label mt-3">
              <label htmlFor="password">Password: </label>
              <input
                className="form-control"
                type="password"
                name="password"
                data-testid="password"
                value={userLogin.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            <button className="btn-primary">Login</button>
          </form>
        </div>
        <p data-testid="errorMessage" className="error">{error}</p>
      </div>
      <p className="signup_login"> Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </section>
  )
}

export default Login
