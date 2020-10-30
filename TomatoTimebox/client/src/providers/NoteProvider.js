import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const NoteContext = React.createContext();

export const NoteProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});


    // Get a single task by its id
    const getNoteById = (noteId) => {
        return getToken().then((token) =>
            fetch(`/api/note/${noteId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setNote);
    };

    // Create a new Note
    const addNote = (note) => {
        return getToken().then((token) =>
            fetch("/api/note", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    };


    // Delete a Note
    const deleteNote = (id) => {
        return getToken().then((token) =>
            fetch(`/api/note/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }))
    };

    // Edit a Note
    const updateNote = (id, note) => {
        return getToken().then((token) =>
            fetch(`/api/note/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            }))
    };

    return (

        <NoteContext.Provider value={{
            notes, setNotes, note, setNote, addNote,
            deleteNote, getNoteById, updateNote
        }}>
            {props.children}
        </NoteContext.Provider>
    );
}