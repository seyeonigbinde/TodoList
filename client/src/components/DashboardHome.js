import React, { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard_Home = () => {

    const [todos, setTodos] = useState([])
    const [isOff, setIsOff] = useState(true);

    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth().get("/todos")
            .then(res => {
                setTodos(res.data)
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
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpdateTodo = () => {
        axiosWithAuth().put(`/todo/:id`)
            .then(res => {
                setTodos(res.data)
                push('/dashboard/edittodo')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDeleteTodo = (todo_id) => {
        axiosWithAuth().delete(`/todo/:id`)
            .then(res => {
                setTodos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        const removeItem = todos.filter((todo) => {
            return todo.todo_id !== todo_id;
        });
        setTodos(removeItem);
        console.log(todo_id)
    }


    const handleClick = () => {
        setIsOff(!isOff)
    }

return (
    <section>
        <div>
            <Link to="/dashboard/newtodo" className="dashboard_addbutton"> + Add New Todo</Link>
        </div>
        <div className="dashboard_bg">
            {todos.map((todo, i) => {
                return (
                    <div className="dashboard_card" key={i}>
                        <button className="btn-primary m-3" onClick={handleClick}>{isOff ? 'Completed' : 'Not Completed'}</button>
                        {/* <button className="btn-secondary m-2">Completed</button> */}
                        <br />
                        <p>{todo.created_at}</p>
                        <p><b>Title:</b> {todo.title}</p>
                        <p><b>Activity:</b> {todo.activity}</p>
                        <div className="button_container">
                            <button className="button_edit" onClick={handleUpdateTodo}><i className="fas fa-edit"></i> Edit</button>
                            <button className="button_details" onClick={handleDetailTodo}><i className="fas fa-sticky-note"></i> Details</button><></>
                            <button className="button_delete" onClick={handleDeleteTodo}><i className="fas fa-trash-alt"></i> Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </section>
)
}

export default Dashboard_Home 
