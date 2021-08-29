import React from "react"

const DetailTodo = ({ detailTodo, setDetail, todoDetail }) => {


    return (
        <section>
            <h5> Title: {todoDetail.title}</h5>
            <h5>Activity: {todoDetail.activity}</h5>
            <button onClick={() => setDetail(false)}>cancel</button>
        </section>
    )
}

export default DetailTodo 
