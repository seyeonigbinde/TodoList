import React from 'react'


const EditTodo = ({ todoEdit, saveEdit, setTodoEdit, setEditing }) => {


    return (
        <div className="col">
            <div className="modal-content">
                <form odata-testid="editForm" onSubmit={saveEdit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Editing </h4>
                    </div>
                    <div className="form-group form-label mt-3">
                        <label htmlFor="title">Title:</label>
                        <input className="form-control" onChange={(e) =>
                            setTodoEdit({ ...todoEdit, title: e.target.value })
                        }
                            value={todoEdit.title} name="title" id="title" />
                    </div>
                    <div className="form-group form-label mt-3">
                        <label htmlFor="activity">Activity:</label>
                        <input className="form-control" onChange={(e) =>
                            setTodoEdit({
                                ...todoEdit, activity: e.target.value })
                        }
                            value={todoEdit.activity} name="activity" id="activity" />
                    </div>
                    <div className="modal-footer">
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTodo
