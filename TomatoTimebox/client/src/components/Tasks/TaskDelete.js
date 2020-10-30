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
            <main className="postContainer">
                <section className="post">
                    <h4> Delete this Task: "{task.name}"?</h4>
                    <hr />
                    <div className="row">
                        <div className="actionBtns">
                            <div className="form-group">
                                <input type="submit" onClick={deleteThisTask} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
                                <Link to={`/tasks`}>
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}