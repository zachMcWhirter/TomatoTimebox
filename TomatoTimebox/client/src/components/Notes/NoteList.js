import React, { useContext, useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link, useParams } from "react-router-dom";

export default function NoteList() {
    const { task, notes, setNotes, getTaskById, getAllNotesForSingleTaskId } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);
    const { id } = useParams();
    // const [notes, setNotes] = useState([]);


    useEffect(() => {
        getAllNotesForSingleTaskId(id);
        getTaskById(id);
    }, []);

    useEffect(() => {
        console.log("notes:", notes);
        console.log("id:", id);
        console.log("task.id:", task.id)
    }, [notes, task]);



    return (
        <section>
            <h1 className="noteList-h1">
                Notes for Task: {task.name}
            </h1>
            <div>
                {notes.map(n =>
                    <NoteCard key={n.id} note={n} />
                )}
            </div>
            <p>
                <Link className="btn-red" to="/notes/add">Add Note</Link>
            </p>
        </section>
    );
}