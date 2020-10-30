import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { useHistory, Link, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function NoteForm() {
    const { addNote } = useContext(NoteContext);
    const history = useHistory();
    const { task } = useContext(TaskContext);


    const [note, setNote] = useState({
        content: "",
        createDateTime: "",
        taskId: task.id
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = e => {
        const stateToChange = { ...note };
        stateToChange[e.target.id] = e.target.value;
        setNote(stateToChange);
    };

    const createNewNote = e => {
        e.preventDefault();
        if (note.content === "") {
            alert("You forgot to write your note!")
        } else {
            setIsLoading(true);
        }
        addNote(note)
            .then((n) => {
                history.push(`/tasks`)
            })
    };

    return (
        <>
            <div className="form-container">
                <Form className="newPostForm">
                    <FormGroup className="newPost">
                        <div className="input-container">
                            <Label for="name">Content</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="content"
                                placeholder="Content"
                                value={note.content}
                            />
                            <br />
                            <Label for="createDateTime">Note Created On: </Label>
                            <Input
                                type="datetime-local"
                                required
                                onChange={handleFieldChange}
                                id="createDateTime"
                                placeholder="Note Created On:"
                                value={note.createDateTime}
                            />
                            <div className="s">
                                <Button
                                    className="newPostSubmitButton"
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={createNewNote}
                                >Submit</Button>
                                <Link to={`/tasks`}><Button type="button" color="warning">Cancel</Button></Link>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}