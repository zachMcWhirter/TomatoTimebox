import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const NoteContext = React.createContext();

export const NoteProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});

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


    
    return (

        <NoteContext.Provider value={{ notes, setNotes, note, setNote, addNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}