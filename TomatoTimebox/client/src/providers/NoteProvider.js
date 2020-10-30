// import React, { useContext, useState } from "react";
// import { UserProfileContext } from "./UserProfileProvider";
// import { TaskContext } from "./TaskProvider"

// export const NoteContext = React.createContext();

// export const NoteProvider = (props) => {
//     const { getToken } = useContext(UserProfileContext);
//     const { task,} = useContext(TaskContext)

//     const [notes, setNotes] = useState([]);
//     const [note, setNote] = useState({});

//     const getAllNotesForSingleTaskId = (taskId) =>
//         getToken().then((token) =>
//             fetch(`api/task/GetTaskWithNotes/${taskId}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-type": "application/json"
//                 }
//             }).then(resp => resp.json())
//                 .then(setNotes));

//     return (

//         <NoteContext.Provider value={{ notes, setNotes, note, setNote, getAllNotesForSingleTaskId }}>
//             {props.children}
//         </NoteContext.Provider>
//     );
// }