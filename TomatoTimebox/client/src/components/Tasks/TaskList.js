import React, { useContext, useEffect } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../providers/TaskProvider";

export default function TaskList() {
    const { tasks, getAllTasks } = useContext(TaskContext);

    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <section>
            {tasks.map(t =>
                <TaskCard key={t.id} task={t} />
            )}
        </section>
    );
}