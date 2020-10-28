import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link } from "react-router-dom";

export default function TaskList() {
    const { tasks, getAllTasksForSingleUserId } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);

    useEffect(() => {
        getAllTasksForSingleUserId(JSON.parse(userProfile).id);
    }, []);

    return (
        <section>
            <h1>
                {(JSON.parse(userProfile).displayName)}'s Task List
            </h1>
            <div>
                {tasks.map(t =>
                    <TaskCard key={t.id} task={t} />
                )}
            </div>
            <p>
                <Link class="btn-red" to="/tasks/add">New Task</Link>
            </p>
        </section>
    );
}