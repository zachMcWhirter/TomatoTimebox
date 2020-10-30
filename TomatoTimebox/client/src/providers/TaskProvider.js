import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});

    //Get all Tasks for all Users (for testing purposes)
    const getAllTasks = () => {
        getToken().then((token) =>
            fetch("/api/task", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks));
    };

    // Get All Tasks for one user by UserProfileId
    const getAllTasksForSingleUserId = (userProfileId) => {
        getToken().then((token) =>
            fetch(`/api/task/GetAllTasksForSingleUserId/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks));
    };

    // Get a single task by its id
    const getTaskById = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setTask);
    };

    // Create a new task
    const addTask = (task) => {
        return getToken().then((token) =>
            fetch("/api/task", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    };

    // Edit a Task
    const updateTask = (id, task) => {
        return getToken().then((token) =>
            fetch(`/api/task/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }))
    };

    // Toggle IsFinished Checkbox
    const toggleIsFinished = (id, isFinished) => {
        return getToken().then((token) =>
            fetch(`/api/task/toggle/${id}?IsFinished=${isFinished}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }))
    };

    // Delete a Task
    const deleteTask = (id) =>
        getToken().then((token) =>
            fetch(`/api/task/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }))

    // // Get all the notes for single Task By TaskId
    const getAllNotesForSingleTaskId = (taskId) => {

        return getToken().then((token) =>
            fetch(`/api/task/GetTaskWithNotes/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(resp => resp.json())
                .then((res) => {
                    console.log("NOTES!!!!", res)
                    return setNotes(res.notes)
                }));
    }

    return (
        <TaskContext.Provider value={{
            tasks, setTasks, task, setTask, getAllTasks,
            getAllTasksForSingleUserId, notes, setNotes,
            note, setNote, getTaskById, addTask, deleteTask,
            updateTask, getAllNotesForSingleTaskId,
            toggleIsFinished,

        }}>
            {props.children}
        </TaskContext.Provider>
    );

}