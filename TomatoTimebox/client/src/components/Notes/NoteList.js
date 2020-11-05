import React, { useContext, useEffect } from "react";
import NoteCard from "./NoteCard";
import { TaskContext } from "../../providers/TaskProvider";
import { Link, useParams } from "react-router-dom";
import { Card } from "reactstrap";

export default function NoteList() {
    const { task, notes, getTaskById, getAllNotesForSingleTaskId } = useContext(TaskContext);
    const { id } = useParams();

    useEffect(() => {
        getAllNotesForSingleTaskId(id);
        getTaskById(id);
    }, []);

    useEffect(() => {
    }, [notes, task]);

    return (
        <section>
            <Link style={{ textDecoration: 'none' }} to={`/tasks/details/${task.id}`}>
                <button className="custom-btn">&#x2190; Back to {task.name}</button>
            </Link>
            <div className="extra-box">
                <Card className="task-edit-container">
                    <h1 className="noteList-h1">
                        Notes for : {task.name}
                    </h1>
                    <div className="note-list-button-container">
                    </div>
                    <div className="extra-box">
                        <div>
                            <p>
                                <Link className="btn-red" to="/notes/add">Add Note</Link>
                            </p>
                            {notes.map(n =>
                                <NoteCard key={n.id} note={n} />
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}