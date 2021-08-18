import React from "react"
import { Switch, Route } from 'react-router-dom'

import NewTodo from './NewTodo'
import DashboardHome from './DashboardHome'
import EditTodo from "./EditTodo"

const Dashboard = () => {

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };


    return (
        <section className="dashboard">
            <div className="sidebar">
                <h2>My Todo App</h2>
                <br />
                <button className="btn-primary" onClick={logOut}> Log Out</button>
            </div>
            <section className="todo_dashboard">
                <Switch>
                    <Route path='/dashboard/edittodo'>
                        <EditTodo />
                    </Route>
                    <Route path='/dashboard/newtodo'>
                        <NewTodo />
                    </Route>
                    <Route exact path='/dashboard'>
                        <DashboardHome />
                    </Route>
                </Switch>
            </section>
        </section>
    )
}

export default Dashboard 
