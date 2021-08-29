import React, { useState, useEffect } from "react"
import { Switch, Route } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

import NewTodo from './NewTodo'
import TodoList from './TodoList'
import EditTodo from "./EditTodo"
import DetailTodo from "./DetailTodo"

const Dashboard = () => {

    const [todoList, setTodoList] = useState([])
    const [date, setDate] = useState(new Date());

    
    useEffect(() => {
        axiosWithAuth().get(`/todos`)
            .then(res => {
                setTodoList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        })


    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });


    return (
        <section className="dashboard">
            <div className="sidebar">
                <h2><b>My Todo App </b></h2>
                <br />
                <h4> Time : {date.toLocaleTimeString()}</h4>
                <h4> Date : {date.toLocaleDateString()}</h4>
                <br />
                <button className="btn-primary" onClick={logOut}> Log Out</button>
            </div>
            <section className="todo_dashboard">
                <Switch>
                    <Route path='/dashboard/detailtodo'>
                        <DetailTodo />
                    </Route>
                    <Route path='/dashboard/edittodo'>
                        <EditTodo />
                    </Route>
                    <Route path='/dashboard/newtodo'>
                        <NewTodo />
                    </Route>
                    <Route exact path='/dashboard'>
                        <TodoList todos= {todoList} updateTodo={setTodoList}/>
                    </Route>
                </Switch>
            </section>
        </section>
    )
}

export default Dashboard 
