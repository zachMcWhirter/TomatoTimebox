import React, { useState, useEffect, useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { useHistory, useParams, Link } from "react-router-dom";

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
            <main className="postContainer">
                <section className="post">
                    <h4> Delete this Note: "{note.content}"?</h4>
                    <hr />
                    <div className="row">
                        <div className="actionBtns">
                            <div className="form-group">
                                <input type="submit" onClick={deleteThisNote} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
                                <Link to={`/tasks`}>
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}