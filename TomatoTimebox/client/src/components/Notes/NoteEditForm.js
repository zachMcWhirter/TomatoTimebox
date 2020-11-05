import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function NoteEditForm() {
    const { getNoteById, updateNote, note } = useContext(NoteContext);

    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();
    const { task } = useContext(TaskContext);

    const [editedNote, setEditedNote] = useState({
        content: "",
        createDateTime: "",
        taskId: task.id
    });

    useEffect(() => {
        getNoteById(id);
    }, [])

    useEffect(() => {
        setEditedNote(note)
    }, [note]);

    const editNote = (e) => {
        updateNote({
            content: editedNote.content,
            createDateTime: editedNote.createDateTime,
            id: note.id
        })

        updateNote(editedNote.id, editedNote)
            .then(() => {
                history.push(`/notesbytask/${note.taskId}`);
            })

    }
    const handleFieldChange = e => {
        const stateToChange = { ...editedNote };
        stateToChange[e.target.id] = e.target.value;
        setEditedNote(stateToChange);
    };

    if (!editedNote) {
        return null
    }

    return (
        <>
            <div className="delete-body">
                <div className="task-edit-container">
                    <div>
                        <h1 className="add-task-h1">Edit Note</h1>
                    </div>
                    <div className="task-edit">
                        <Form>
                            <fieldset className="add-task">
                                <FormGroup>
                                    <Input
                                        id={editedNote.id}
                                        onChange={handleFieldChange}
                                        type="hidden"
                                        value={note.id}
                                    />
                                    <Input
                                        id={editedNote.taskId}
                                        onChange={handleFieldChange}
                                        type="hidden"
                                        value={note.taskId}
                                    />
                                </FormGroup>
                                <Label for="content" style={{ fontWeight: "bold" }}>Content</Label>
                                <Input
                                    type="textarea"
                                    id="content"
                                    maxlength="200"
                                    required
                                    defaultValue={editedNote.content}
                                    name="content"
                                    onChange={handleFieldChange}
                                />
                            </fieldset>
                        </Form>
                        <hr />
                        <Button
                            className="btn-red"
                            type="submit"
                            onClick={e => { editNote() }}
                        >Save
                        </Button>
                        <Link to={`/notesbytask/${note.taskId}`}>
                            <Button
                                type="button"
                                className="btn-blue"
                            >Cancel
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}