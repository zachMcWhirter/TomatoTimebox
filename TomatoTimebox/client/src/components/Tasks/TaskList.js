import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link } from "react-router-dom";
import TomatoTimebox from "../Timer/Timer";
import TimerWithReset from "../Timer/Timer2"

export default function TaskList() {
    const { tasks, getAllTasksForSingleUserId } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);

    useEffect(() => {
        getAllTasksForSingleUserId(JSON.parse(userProfile).id);
    }, []);

    return (
        <div className="task-container">


            <section >
                <h1 className="task-list-h1">
                    {(JSON.parse(userProfile).displayName)}'s Task List
                </h1>
                <p>
                    <Link class="btn-red" to="/tasks/add">New Task</Link>
                </p>
                <div>
                    {tasks.map(t =>
                        <TaskCard key={t.id} task={t} />
                    )}
                </div>
            </section>
            <div className="TomatoTimebox-container">
                <TomatoTimebox></TomatoTimebox>
                <T
            </div>
        </div>
    );
}