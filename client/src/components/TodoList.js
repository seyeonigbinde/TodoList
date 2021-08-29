import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import DetailTodo from "./DetailTodo"
import EditTodo from "./EditTodo"
import Todo from "./Todo"

const initialTodo = {
    title: "",
    activity: ""
}

const TodoList = ({ todos, updateTodo }) => {

    const [detail, setDetail] = useState(false)
    const [todoDetail, setTodoDetail] = useState(initialTodo)
    const [editing, setEditing] = useState(false)
    const [todoEdit, setTodoEdit] = useState(initialTodo)

    const { push } = useHistory()

    const detailTodo = e => {
        e.preventDefault();
        axiosWithAuth().get(`/todo/${todoDetail.todo_id}`)
            .then(res => {
                setTodoDetail(res.data)
                push('/dashboard')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const viewTodo = () => {
        setDetail(true);
    };


    const editTodo = todo => {
        setEditing(true);
        setTodoEdit(todo);
    };

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`/todo/${todoEdit.todo_id}`, todoEdit)
            .then(res => {
                setTodoEdit(res.data);
                push('/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    };

    const deleteTodo = todo => {
        axiosWithAuth().delete(`/todo/${todo.todo_id}`)
            .then(res => {
                setEditing(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };


    return (
        <section>
            <div>
                <Link to="/dashboard/newtodo" className="dashboard_addbutton"> + Add New Todo</Link>
            </div>
            <div className="dashboard_bg">
                {todos.map(todo => <Todo key={todo.id} editing={editing} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} viewTodo={viewTodo} />)}
            { editing && <EditTodo todoEdit={todoEdit} saveEdit={saveEdit} setTodoEdit={setTodoEdit} setEditing={setEditing} />}
            { detail && <DetailTodo detailTodo={detailTodo} setDetail={setDetail} todoDetail={todoDetail} setTodoDetail={setTodoDetail} />}
            </div>
        </section>
    )
}

export default TodoList 
