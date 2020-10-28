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
        categoryId: 2,
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
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="name"
                            placeholder="Name"
                            value={task.name}
                        />
                        <Label for="category">Category</Label>
                        <br />
                        <select className="userEditDropdown" onChange={handleChange}>
                            {categories.map(category =>
                                category.id === task.categoryId ?
                                    <option selected value={category.id}>
                                        {category.name}
                                    </option> :
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                            )}
                        </select>
                        <br />
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="description"
                            placeholder="Description"
                            value={task.description}
                        />
                        <br />
                        <div>
                            <Button
                                className="newPostSubmitButton"
                                type="submit"
                                disabled={isLoading}
                                onClick={createNewTask}
                            >Submit</Button>
                            <Link to={`/tasks`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    )

}