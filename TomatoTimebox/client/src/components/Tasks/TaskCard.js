import React, { useContext, useState } from "react";
import { Card, CardBody, Label, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom"
import { TaskContext } from "../../providers/TaskProvider";

export default function TaskCard({ task }) {
    const history = useHistory();
    const { toggleIsFinished } = useContext(TaskContext);

    const [checked, setChecked] = useState(task.isFinished)
    const isChecked = e => {
        if (checked == false) {
            toggleIsFinished(task.id, true)
            setChecked(true)
        } else {
            toggleIsFinished(task.id, false)
            setChecked(false)
        }
        //// Alternative solution (that also works) using code that is more condensed ////
        // toggleIsFinished(task.id, !checked)
        // setChecked(!checked)
    };

    return (
        <Card className="m-4">
            <CardBody >
                <div>
                    <h3>{task.name}</h3>
                </div>
                <div className="task-card-container">
                    <div>
                        <Link to={`/tasks/details/${task.id}`}>
                            <button className="tag-btn">Details</button>
                        </Link>
                        <Link to={`/tasks/edit/${task.id}`}>
                            <button className="tag-btn">Edit</button>
                        </Link>
                        <Link to={`/tasks/delete/${task.id}`}>
                            <button className="tag-btn">Delete</button>
                        </Link>
                    </div>
                    <div>
                        <p className="task-description">Description: {task.description} </p>
                        <p className="task-description">Category: {task.category.name} </p>
                        <Label for="isFinished">Task Completed</Label>
                        <Input
                            name="isFinished"
                            type="checkbox"
                            checked={checked}
                            onChange={isChecked}
                        />
                    </div>
                </div>
            </CardBody>
            <br />
        </Card>
    );
}
