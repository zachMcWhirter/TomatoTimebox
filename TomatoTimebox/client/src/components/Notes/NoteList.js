import React, { useContext, useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link, useParams } from "react-router-dom";

export default function NoteList() {
    const { task, notes, getTaskById, getAllNotesForSingleTaskId } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getAllNotesForSingleTaskId(id);
        getTaskById(id);
    }, []);
    console.log(notes)
    return (
        <section>
            <h1>
                Notes for {task.title}
            </h1>
            <div>
                {notes.map(n =>
                    <NoteCard key={n.id} note={n} />
                )}
            </div>
            <p>
                <Link class="btn-red" to="/notes/add">New Task</Link>
            </p>
        </section>
    );
}