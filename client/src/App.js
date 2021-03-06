import React from 'react'
import { Route, Switch } from "react-router-dom"
import './App.css'
import PrivateRoute from "./utils/PrivateRoute"
import Dashboard from './components/Dashboard'

import Login from './components/Login'
import Signup from './components/Signup'
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
  
      <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
     <Footer/>
    </div>
  )
}

export default App
