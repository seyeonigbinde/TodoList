import React from "react"
import { Link } from 'react-router-dom'

const Dashboard = () =>{

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };


return (
    <section className="dashboard">
        <div className="sidebar">
            <h1>My Todo App</h1>
            <br/>
            <button className="btn-primary" onClick={logOut}> Log Out</button>
        </div>
        <section>
            <div>
                <Link to="/newtodo">Add New Todo</Link>
            </div>
        <div className="dashboard_container">
            <div class="dashboard_card">
                <button>Completed</button>
                <br/>
                <p>Title: </p>
                <p>Activity:</p>
                <button>Edit</button><></>
                <button>Details</button><></>
                <button>Delete</button>
            </div>
        </div>
        </section>
    </section>
)
}

export default Dashboard 
