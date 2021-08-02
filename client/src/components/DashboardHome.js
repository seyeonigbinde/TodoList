import React, { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard_Home = () => {

    const [todos, setTodos] = useState([])

    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth().get("/app/todos")
            .then(res => {
                setTodos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const handleDetailTodo = () => {
        axiosWithAuth().get(`/app/todo/:id`)
            .then(res => {
                setTodos(res.data)
                push('/dashboard')
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpdateTodo = () => {
        axiosWithAuth().put(`/app/todo/:id`)
            .then(res => {
                setTodos(res.data)
                push('/dashboard')
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDeleteTodo = () => {
        axiosWithAuth().delete(`/app/todo/:id`)
            .then(res => {
                setTodos(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section className="dashboard">
            <section>
                <div>
                    <Link to="/dashboard/newtodo">Add New Todo</Link>
                </div>
                <div className="dashboard_container">
                    <div className="dashboard_card">
                        <button className="btn-secondary">Completed</button>
                        <br />
                        {todos.map((todo, i) => {
                            return (
                                <div className="dashboard_card" key={i}>
                                    <p>Title: {todo.title}</p>
                                    <p>Activity: {todo.activity}</p>
                                </div>
                            )
                        })}
                        <button className="button_edit" onClick={handleUpdateTodo}><i className="fas fa-edit"></i> Edit</button>
                        <button className="button_details" onClick={handleDetailTodo}><i className="fas fa-sticky-note"></i> Details</button><></>
                        <button className="button_delete" onClick={handleDeleteTodo}><i className="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Dashboard_Home 
