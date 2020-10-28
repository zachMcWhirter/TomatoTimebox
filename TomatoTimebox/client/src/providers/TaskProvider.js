import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    // const apiUrl = "/api/task";
    const { getToken } = useContext(UserProfileContext);

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});

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

    return (
        <TaskContext.Provider value={{
            tasks, setTasks, task, setTask, getAllTasks, getAllTasksForSingleUserId,
            getTaskById, addTask

        }}>
            {props.children}
        </TaskContext.Provider>
    );

}