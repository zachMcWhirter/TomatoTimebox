import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

import { Card, CardBody, Button, Label, Input } from "reactstrap";
import { useParams, Link } from "react-router-dom";

export default function TaskDetail() {
    const { task, getTaskById } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getTaskById(id)
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
            <Link style={{ textDecoration: 'none' }} to={`/tasks`}>
                <button className="std-btn">&#x2190; Back to Tasks</button>
            </Link>
            <div className="postContainer">
                <div className="post">
                    <section className="px-3">
                        <div className="row justify-content-between">
                            <h1 className="text-secondary">{task.name}</h1>
                            <h3 className="text-black-50">{task.category.name}</h3>
                            <p >{task.isFinished}</p>
                        </div>

                        <br />
                        <div className="row postBtns justify-content-between">
                            <Link to={`/tasks/delete/${task.id}`}><Button type="button" color="warning">Delete</Button></Link>
                            <Link to={`/tasks/edit/${task.id}`}><Button type="button" color="warning">Edit</Button></Link>
                        </div>
                    </section>
                    <hr />
                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{task.description}</p>
                    </section>
                    <Link to={`/notesbytask/${id}`}><Button type="button" color="warning">View Notes</Button></Link>
                </div>
            </div>
        </>
    )
}