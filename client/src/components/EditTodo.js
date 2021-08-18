import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth'


const EditTodo = (props) => {
    const { push } = useHistory();
    const { id } = useParams();

    const [todo, setTodo] = useState({
        title: "",
        activity: "",
    });

    useEffect(() => {
        axiosWithAuth().get('/todo/:id')
            .then(res => {
                setTodo(res.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [id]);

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().put(`/todo${id}`, todo)
            .then(res => {
                setTodo(res.data);
                push(`/dashboard`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const { title, activity } = todo;

    return (
        <div className="col">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Editing <strong>{todo.title}</strong></h4>
                    </div>
                    <div className="form-group form-label mt-3">
                        <label htmlFor="title">Title:</label>
                        <input className="form-control" onChange={handleChange} value={title} name="title" id="title" placeholder="Title" />
                    </div>
                    <div className="form-group form-label mt-3">
                        <label htmlFor="activity">Activity:</label>
                        <input className="form-control" onChange={handleChange} value={activity} name="activity" id="activity" placeholder="Activity" />
                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-info" value="Save" />
                        <Link to={`/dashboard`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
                    </div>
                </form>
            </div>
        </div>);
}

export default EditTodo;
