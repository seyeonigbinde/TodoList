import React, { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard_Home = () => {

    const [todos, setTodos] = useState([])

    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth().get("/todos")
            .then(res => {
                setTodos(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const handleDetailTodo = () => {
        axiosWithAuth().get(`/todo/:id`)
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
        axiosWithAuth().put(`/todo/:id`)
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
        axiosWithAuth().delete(`/todo/:id`)
            .then(res => {
                setTodos(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
            <section>
                <div>
                    <Link to="/dashboard/newtodo">Add New Todo</Link>
                </div>
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
                </section>
    )
}

export default Dashboard_Home 
