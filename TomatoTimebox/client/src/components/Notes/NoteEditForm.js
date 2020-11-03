import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
            <div className="post-container">
                <CardBody>
                    <Form>
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
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                type="text"
                                id="content"
                                required
                                defaultValue={editedNote.content}
                                name="content"
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Form>
                    <Button type="button" color="success" className="btn-red" onClick={e => { editNote() }}>Save</Button> &nbsp;&nbsp;
                                <Link to={`/tasks`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </div>
        </>
    );
}