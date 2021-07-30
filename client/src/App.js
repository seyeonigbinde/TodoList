import React from 'react'
import { Route, Switch } from "react-router-dom"
import './App.css'
import Dashboard from './components/Dashboard'

import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  return (
    <div className="App">
  
      <Switch>
      <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
     
    </div>
  )
}

export default App
