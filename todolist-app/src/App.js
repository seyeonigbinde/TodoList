import React from 'react'
import { Route, Switch } from "react-router-dom"
import PrivateRoute from './utils/PrivateRoute'
import './App.css'

import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  return (
    <div className="App">
  
      <Switch>
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
