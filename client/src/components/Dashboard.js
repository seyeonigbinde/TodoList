import React, { useState, useEffect } from "react"
import { Switch, Route } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

import NewTodo from './NewTodo'
import DashboardHome from './DashboardHome'
import EditTodo from "./EditTodo"

const Dashboard = () => {

    const [date, setDate] = useState(new Date());

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

        // const options = {
    //     method: 'GET',
    //     url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    //     params: {
    //         q: 'London,uk',
    //         lat: '0',
    //         lon: '0',
    //         callback: 'test',
    //         id: '2172797',
    //         lang: 'null',
    //         units: '"metric" or "imperial"',
    //         mode: 'xml, html'
    //     },
    //     headers: {
    //         'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    //         'x-rapidapi-key': '881fb379f0msh4019f80abe2a374p1f1b6bjsn6f262b9727df'
    //     }
    // };

    // axiosWithAuth().request(options)
    //     .then(function (response) {
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.error(error);
    //     });


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
