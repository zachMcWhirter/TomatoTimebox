import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function TaskDeletePage() {

    const { task, deleteTask, getTaskById } = useContext(TaskContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getTaskById(parseInt(id))
    }, [])

    const deleteThisTask = () => {
        deleteTask(parseInt(id))
            .then(() => history.push("/tasks"));
    }

    if (!task) {
        return null;
    }

    return (
        <>
            <div className="delete-body">
                <div className="delete-confirm-container">
                    <h3> Delete this Task ?</h3>
                    <section className="delete-task">
                        <div>
                            <h1 className="delete-task-h1">{task.name}</h1>
                        </div>
                        <div className="actionBtns">
                            <div className="form-group">
                                <hr />
                                <input type="submit" onClick={deleteThisTask} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
                                <Link to={`/tasks`}>
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}