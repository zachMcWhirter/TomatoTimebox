import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom"

export default function TaskCard({ task }) {
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory();
    console.log(task)
    console.log("task.isFinished", task.isFinished)

    return (

        <Card className="m-4">
            <CardBody>
                <h4>{task.name}</h4>
                {/* <Button onClick={() => history.push(`/task/delete/${task.id}`)}>Delete</Button> */}

                <Link to={`/tasks/details/${task.id}`}>
                    <button className="tag-btn">Details</button>
                </Link>
                <Link to={`/tasks/edit/${task.id}`}>
                    <button className="tag-btn">Edit</button>
                </Link>
                <Link to={`/tasks/delete/${task.id}`}>
                    <button className="tag-btn">Delete</button>
                </Link>
                <p className="task-description">Description: {task.description} </p>
                <p className="task-description">Category: {task.category.name} </p>
                <p className="task-description">Task Completed: {task.isFinished} </p>
            </CardBody>
            <br />
        </Card>

    );
}