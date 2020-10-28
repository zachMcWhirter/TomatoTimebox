import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    // const apiUrl = "/api/task";
    const { getToken } = useContext(UserProfileContext);

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});

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

    return (
        <TaskContext.Provider value={{
            tasks, setTasks, task, setTask, getAllTasks, getAllTasksForSingleUserId

        }}>
            {props.children}
        </TaskContext.Provider>
    );

}