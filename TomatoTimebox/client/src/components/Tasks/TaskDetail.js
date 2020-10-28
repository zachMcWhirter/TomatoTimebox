import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { Card, CardBody, Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";

export default function TaskDetail() {
    const { task, getTaskById } = useContext(TaskContext);
    const { id } = useParams();

    useEffect(() => {
        getTaskById(id)
    }, []);

    // we need the if statement to return true on the first render.
    // so we must include !post.userProfile because react will not let us
    // ask for the property of an undefined object
    if (!task || !task.userProfile) {
        return null
    }

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
                            <h1 className="text-black-50">{task.category.name}</h1>
                        </div>
                        <div className="row justify-content-between">
                            <p className="text-secondary">{task.userProfile.displayName}</p>
                        </div>
                        <div className="row postBtns justify-content-between">
                            <Link to={`/tasks/delete/${task.id}`}><Button type="button" color="warning">Delete</Button></Link>
                            <Link to={`/tasks/edit/${task.id}`}><Button type="button" color="warning">Edit</Button></Link>
                        </div>
                    </section>
                    <hr />
                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{task.description}</p>
                    </section>
                    {/* Future home of Notes!!! <Link to={`/tasks/edit/${task.id}`}><Button type="button" color="warning">Edit</Button></Link> */}
                </div>
            </div>
        </>
    )
}