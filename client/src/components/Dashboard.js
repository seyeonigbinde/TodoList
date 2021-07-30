import React from "react"

const Dashboard = () =>{

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    };


return (
    <section>
        <div className="sidebar">
            <button className="btn-primary" onClick={logOut}> Log Out</button>
        </div>
        <div className="dashboard_container">
            <div class="dashboard_card">
                +
            </div>
        </div>
    </section>

)

}

export default Dashboard 