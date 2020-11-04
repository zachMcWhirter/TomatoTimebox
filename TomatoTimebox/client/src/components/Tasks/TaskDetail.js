import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../providers/TaskProvider";

import { Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";

export default function TaskDetail() {
    const { task, getTaskById } = useContext(TaskContext);
    const { id } = useParams();

    useEffect(() => {
        getTaskById(id)
    }, []);

    // we need the if statement to return true on the first render.
    // so we must include !task.userProfile because react will not let us
    // ask for the property of an undefined object
    if (!task || !task.userProfile) {
        return null
    }

    return (
        <>
            <div>
                <Link style={{ textDecoration: 'none' }} to={`/tasks`}>
                    <button className="std-btn">&#x2190; Back to Tasks</button>
                </Link>
            </div>
            <div className="delete-body">
                <div className="task-edit-container">

                    <div>
                        <div className="edit-task-h1-container">
                            <h1 className="edit-task-h1">Task Details</h1>
                        </div>
                        <div className="task-edit">
                            <div className="task-details-container">
                                <div className="h1-and-h3">
                                    <div>
                                        <h1 className="h1-task-detail-name">{task.name}</h1>
                                    </div>
                                    <div>
                                        <p className="task-detail-category">{task.category.name}</p>
                                    </div>
                                </div>
                                <p className="col-sm-12 mt-5">{task.description}</p>
                                <br />
                            </div>
                            <hr />
                            <div className="under-hr">
                                <div>
                                    <Link to={`/notesbytask/${id}`}><Button type="button" className="notes-btn">View Notes</Button></Link>
                                </div>
                                <div className="task-card-button-container">
                                    <Link to={`/tasks/delete/${task.id}`}><Button type="button" className="std-btn">Delete</Button></Link>
                                    <Link to={`/tasks/edit/${task.id}`}><Button type="button" className="std-btn">Edit</Button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}