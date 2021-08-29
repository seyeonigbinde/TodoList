import React from "react"

const DetailTodo = ({detailTodo, setDetail, todoDetail}) => {


    return (
        <section>
            Title: {todoDetail.title}
            Activity: {todoDetail.activity}
            <button onClick={() => setDetail(false)}>cancel</button>
        </section>
    )
}

export default DetailTodo 
