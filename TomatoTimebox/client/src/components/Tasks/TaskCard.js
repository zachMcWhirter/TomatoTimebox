import React from "react";
import { Card, CardBody } from "reactstrap";

export default function TaskCard({ task }) {
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    console.log(task)
    console.log("task.isFinished", task.isFinished)

    return (

        <Card className="m-4">
            <CardBody>
                <h4>{task.name}</h4>
                <p className="task-description">Description: {task.description} </p>
                <p className="task-description">Category: {task.category.name} </p>
                <p className="task-description">Task Completed: {task.isFinished} </p>
            </CardBody>
            <br />
        </Card>

    );
}