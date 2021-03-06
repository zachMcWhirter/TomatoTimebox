import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function TaskEditForm() {
    const { getTaskById, updateTask, task } = useContext(TaskContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [categoryId, setCategoryId] = useState();

    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();

    const [editedTask, setEditedTask] = useState({
        name: "",
        description: "",
        categoryId: task.categoryId,
        isFinished: task.isFinished,
        userProfileId: task.userProfileId
    });

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    }

    useEffect(() => {
        getTaskById(parseInt(id));
    }, [])

    useEffect(() => {
        getAllCategories();
    }, [])

    useEffect(() => {
        setEditedTask(task)
    }, [task]);

    const editTask = (e) => {
        updateTask({
            name: editedTask.name,
            description: editedTask.description,
            id: task.id
        })


        const parsedCat = parseInt(categoryId);
        editedTask.categoryId = parsedCat;

        if (!editedTask.categoryId) {
            editedTask.categoryId = task.categoryId;
        }

        updateTask(editedTask.id, editedTask)
            .then(() => {
                history.push(`/tasks/details/${id}`);
            })

    }
    const handleFieldChange = e => {
        const stateToChange = { ...editedTask };
        stateToChange[e.target.id] = e.target.value;
        setEditedTask(stateToChange);
    };


    if (!editedTask) {
        return null
    }

    return (
        <>
            <div className="task-edit-container">
                <Card >
                    <h1 className="edit-task-h1">Edit Task: {task.name} </h1>
                    <div className="task-edit">

                        <Form>
                            <FormGroup>
                                <Input
                                    id={editedTask.id}
                                    onChange={handleFieldChange}
                                    type="hidden"
                                    value={task.id}
                                />
                                <Input
                                    id={editedTask.isFinshed}
                                    onChange={handleFieldChange}
                                    type="hidden"
                                    value={task.isFinished}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name: </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    required
                                    defaultValue={editedTask.name}
                                    name="name"
                                    onChange={handleFieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description: </Label>
                                <Input
                                    type="text"
                                    id="description"
                                    required
                                    defaultValue={editedTask.description}
                                    name="description"
                                    onChange={handleFieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category: </Label>

                                <select className="userEditDropdown" onChange={handleChange}>
                                    {categories.map(category =>
                                        category.id === task.categoryId ?
                                            <option selected value={category.id}>
                                                {category.name}
                                            </option> :
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                    )}
                                </select>
                            </FormGroup>
                        </Form>
                        <Button type="button" className="btn-red" onClick={e => { editTask() }}>Save</Button> &nbsp;&nbsp;
                                <Link to={`/tasks`}><Button type="button" color="warning">Cancel</Button></Link>
                    </div>
                </Card>
            </div>
        </>
    );
}