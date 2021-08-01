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

    return (
        <section className="dashboard">
            <section>
                <div>
                    <Link to="/dashboard/newtodo"> My Todo</Link>
                </div>
                <div className="dashboard_container">
                    <div class="dashboard_card">
                        <br />
                        {todos.map((todo, i) => {
                            return (
                                <div className="dashboard_card" key={i}>
                                    <p>Title: {todo.title}</p>
                                    <p>Activity: {todo.activity},
                                </p>
                                </div>
                            )
                        })}
                        <Link to={'/dashboard'}><button className="btn btn-secondary" type="button" value="Cancel"> Cancel </button></Link>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Dashboard_Home 
