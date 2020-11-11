import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link } from "react-router-dom";

export default function TaskList() {
    const { tasks, getAllTasksForSingleUserId, taskUpdated, setTaskUpdated } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);


    useEffect(() => {
        getAllTasksForSingleUserId(JSON.parse(userProfile).id);
    }, [taskUpdated]);

    return (
        <>
            <div className="task-list-view">
                <div className="task-container">
                    <section >
                        <div className="extra-box">
                            <h1 className="task-list-h1">
                                {(JSON.parse(userProfile).displayName)}'s Task List
                            </h1>
                        </div>
                        <p>
                            <Link className="btn-red" to="/tasks/add">New Task</Link>
                        </p>
                        <div>
                            {tasks.map(t =>
                                <TaskCard key={t.id} task={t}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}