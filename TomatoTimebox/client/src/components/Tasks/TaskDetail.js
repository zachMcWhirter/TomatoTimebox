import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

import { Card, CardBody, Button, Label, Input } from "reactstrap";
import { useParams, Link, useHistory } from "react-router-dom";

export default function TaskDetail() {
    const { task, getTaskById } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getTaskById(id)
        // if (task.userProfileId != userProfile.id) {

        // }
    }, []);

    console.log(task.isFinished);
    // console.log(userProfile.id);
    console.log("task:", task);

    // we need the if statement to return true on the first render.
    // so we must include !task.userProfile because react will not let us
    // ask for the property of an undefined object
    if (!task || !task.userProfile) {
        return null
    }

    console.log(task.isFinished);

    console.log("task:", task);
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
                            <section >

                                <div className="row justify-content-between">
                                    <h1 className="text-secondary">{task.name}</h1>
                                </div>
                                <div className="task-card-container">
                                    <div className="task-card-details">
                                        <h3 className="text-black-50">{task.category.name}</h3>
                                        <p >{task.isFinished}</p>
                                        <section className="row post__content">
                                            <p className="col-sm-12 mt-5">{task.description}</p>
                                        </section>
                                    </div>
                                    <br />
                                </div>
                            </section>
                            <hr />
                            <div className="under-hr">
                                <div>
                                    <Link to={`/notesbytask/${id}`}><Button type="button" className="std-btn">View Notes</Button></Link>
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