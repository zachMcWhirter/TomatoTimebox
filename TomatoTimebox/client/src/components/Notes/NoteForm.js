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
                history.push(`/notesbytask/${task.id}`)
            })
    };

    return (
        <>
            <div className="extra-box">
                <Form className="add-task">
                    <div>
                        <h1 className="add-task-h1">Create a New Note</h1>
                    </div>
                    <fieldset className="add-task">
                        <Label className for="content" style={{ fontWeight: "bold" }}>Content</Label>
                        <Input
                            type="textarea"
                            maxlength="200"
                            required
                            onChange={handleFieldChange}
                            id="content"
                            placeholder="Note Content...."
                            value={note.content}
                        />
                    </fieldset>
                    <br />
                    <div className="submit-cancel-buttons">
                        <Button
                            className="btn-red"
                            type="submit"
                            disabled={isLoading}
                            onClick={createNewNote}
                        >Submit</Button>
                        <Link to={`/notesbytask/${task.id}`}><Button type="button" className="btn-blue">Cancel</Button></Link>
                    </div>
                </Form>
            </div>
        </>
    )
}