import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import axios from "axios"

const Dashboard = () =>{

    const [todos, setTodos] = useState([])

	useEffect(() => {
		axios.get("https://my-todolist-apps.herokuapp.com/api/app/todos")
			.then(res => {
				setTodos(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	})

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };


return (
    <section className="dashboard">
        <div className="sidebar">
            <h2>My Todo App</h2>
            <br/>
            <button className="btn-primary" onClick={logOut}> Log Out</button>
        </div>
        <section>
            <div>
                <Link to="/newtodo">Add New Todo</Link>
            </div>
        <div className="dashboard_container">
            <div class="dashboard_card">
                <button className="btn-secondary">Completed</button>
                <br/>
                {todos.map((todo, i) => {
						return (
							<div className="dashboard_card" key={i}>
								<p>Title: {todo.title}</p>
								<p>Activity: {todo.activity}, 
                                </p>
							</div>
						)
					})}
                <button className="button_edit"><i class="fas fa-edit"></i> Edit</button>
                <button className="button_details"><i class="fas fa-sticky-note"></i> Details</button><></>
                <button className="button_delete"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        </div>
        </section>
    </section>
)
}

export default Dashboard 
