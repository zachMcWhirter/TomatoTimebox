import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function TaskList() {
    const { tasks, getAllTasksForSingleUserId } = useContext(TaskContext);
    const { userProfile } = useContext(UserProfileContext);

    console.log("user:", (JSON.parse(userProfile).displayName))

    useEffect(() => {
        getAllTasksForSingleUserId(JSON.parse(userProfile).id);
    }, []);

    console.log("userProfile:", JSON.parse(userProfile));

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
        </section>
    );
}