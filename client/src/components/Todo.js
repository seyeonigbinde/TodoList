import React, { useState } from "react"


const Todo = ({ todo, editing, editTodo, deleteTodo, viewTodo }) => {

    const [isOff, setIsOff] = useState(true)

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteTodo(todo);
    }

    const handleToggle = () => {
        setIsOff(!isOff)

    }



    return (
        <div className="dashboard_card" >
            <button className="btn-primary m-3" onClick={handleToggle}>{isOff ? 'Completed' : 'Not Completed'}</button>
            <br />
            {/* <p>{todo.created_at}</p> */}
            <p><b>Title:</b> {todo.title}</p>
            <p><b>Activity:</b> {todo.activity}</p>
            <div className="button_container">
                <button className="button_edit" onClick={() => editTodo(todo)}><i className="fas fa-edit"></i> Edit</button>
                <button className="button_details" onClick={() => viewTodo(todo)}><i className="fas fa-sticky-note"></i> Details</button><></>
                <button className="button_delete" onClick={handleDelete}><i className="fas fa-trash-alt"></i> Delete</button>
            </div>
        </div>
    )
}
export default Todo
