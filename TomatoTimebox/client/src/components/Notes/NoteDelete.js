import React, { useEffect, useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function NoteDeletePage() {

    const { note, deleteNote, getNoteById } = useContext(NoteContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getNoteById(id)
    }, [])

    const deleteThisNote = () => {
        deleteNote(parseInt(id))
            .then(() => history.push(`/notesbytask/${note.taskId}`));
    }

    if (!note) {
        return null;
    }

    return (
        <>
            <div className="delete-body">
                <div className="delete-confirm-container">
                    <h3> Delete this Note: ?</h3>
                    <div className="delete-task">
                        <div>
                            <h1 className="delete-task-h1">{note.content}</h1>
                        </div>
                        <div className="actionBtns">
                            <div className="form-group">
                                <hr />
                                <input type="submit" onClick={deleteThisNote} value="Confirm" className="btn-red" />
                                <Link to={`/notesbytask/${note.taskId}`}><Button type="button" className="btn-blue">Cancel</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}