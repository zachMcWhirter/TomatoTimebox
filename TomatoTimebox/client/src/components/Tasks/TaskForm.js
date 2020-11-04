import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function TaskForm() {
    const history = useHistory();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { addTask } = useContext(TaskContext);
    const [categoryId, setCategoryId] = useState();

    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const [task, setTask] = useState({
        name: "",
        description: "",
        categoryId: "",
        isFinished: false,
        userProfileId: sessionUser
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = e => {
        const stateToChange = { ...task };
        stateToChange[e.target.id] = e.target.value;
        setTask(stateToChange);
    };

    const createNewTask = e => {
        e.preventDefault();
        if (task.name === "") {
            alert("Give your task a name!")
        } else {
            setIsLoading(true);
        }
        const parsedCat = parseInt(categoryId);
        task.categoryId = parsedCat;
        addTask(task)
            .then((p) => {
                history.push(`/tasks`)
            })
    };

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <>
            <div className="extra-box">
                <div className="add-task-form-container">
                    <div>
                        <h1 className="add-task-h1">Create a New Task</h1>
                    </div>
                    <Form className="task-edit">
                        <fieldset className="add-task">
                            <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                <Label for="name" style={{ fontWeight: "bold" }}>Name:</Label>
                                <Input
                                    type="text"
                                    required
                                    onChange={handleFieldChange}
                                    id="name"
                                    placeholder="Name"
                                    value={task.name}
                                />
                            </FormGroup>
                            <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                <Label for="description" style={{ fontWeight: "bold" }}>Description:</Label>
                                <Input
                                    type="textarea"
                                    required
                                    onChange={handleFieldChange}
                                    id="description"
                                    placeholder="Description"
                                    value={task.description}
                                />
                            </FormGroup>
                            <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                <Label for="category" style={{ fontWeight: "bold" }}>Category:</Label>
                                <select className="userEditDropdown" onChange={handleChange}>
                                    {categories.map(category =>
                                        category.id === task.categoryId ?
                                            <option defaultValue="" selected value={category.id}>
                                                {category.name}
                                            </option> :
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                    )}
                                </select>
                            </FormGroup>
                            <br />
                        </fieldset>

                        <hr />
                        <div className="submit-cancel-buttons">
                            <Button
                                className="btn-red"
                                type="submit"
                                disabled={isLoading}
                                onClick={createNewTask}
                            >Submit</Button >
                            <Link to={`/tasks`}><Button type="button" className="btn-blue">Cancel</Button></Link>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    )
}