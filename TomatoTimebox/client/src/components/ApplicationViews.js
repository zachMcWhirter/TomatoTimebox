import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TaskList from "../components/Tasks/TaskList"
import TaskForm from "../components/Tasks/TaskForm"
import TaskDeletePage from "../components/Tasks/TaskDelete"
import TaskDetail from "../components/Tasks/TaskDetail"
import NoteDetail from "../components/Notes/NoteDetail"
import NoteList from "../components/Notes/NoteList"
import TaskEditForm from "../components/Tasks/TaskEditForm"


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks" exact>
                    {isLoggedIn ? <TaskList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks/add" exact>
                    {isLoggedIn ? <TaskForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks/details/:id">
                    {isLoggedIn ? <TaskDetail /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks/edit/:id">
                    {isLoggedIn ? <TaskEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks/delete/:id">
                    {isLoggedIn ? <TaskDeletePage /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/tasks/details/:id/notes">
                    {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                </Route> */}

                <Route path="/notesbytask/:id/" exact>
                    {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
