import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../providers/TaskProvider";
// import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function TaskEditForm() {
    const { getTaskById, updateTask, task } = useContext(TaskContext);
    // const { categories, getAllCategories } = useContext(CategoryContext);
    // const [categoryId, setCategoryId] = useState();

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

    // const handleChange = (e) => {
    //     setCategoryId(e.target.value);
    // }

    useEffect(() => {
        getTaskById(parseInt(id));
    }, [])

    // useEffect(() => {
    //     getAllCategories();
    // }, [])

    useEffect(() => {
        setEditedTask(task)
    }, [task]);

    const editTask = (e) => {
        updateTask({
            name: editedTask.name,
            description: editedTask.description,

            id: task.id
        })


        // const parsedCat = parseInt(categoryId);
        // editedPost.categoryId = parsedCat;

        // if (!editedPost.categoryId) {
        //     editedPost.categoryId = post.categoryId;
        // }

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
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>

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
                                    <Label for="name">Name</Label>
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
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="text"
                                        id="description"
                                        required
                                        defaultValue={editedTask.description}
                                        name="description"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label for="category">Category</Label>
                                    <br />
                                    <select className="userEditDropdown" onChange={handleChange}>
                                        {categories.map(category =>
                                            category.id === post.categoryId ?
                                                <option selected value={category.id}>
                                                    {category.name}
                                                </option> :
                                                <option value={category.id}>
                                                    {category.name}
                                                </option>
                                        )}
                                    </select>
                                </FormGroup> */}

                            </Form>
                            <Button type="button" color="success" onClick={e => { editTask() }}>Save</Button> &nbsp;&nbsp;
                                <Link to={`/posts`}><Button type="button" color="warning">Cancel</Button></Link>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}