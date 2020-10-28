import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TaskProvider } from "./providers/TaskProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import './App.css';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TaskProvider>
          <Header />
          <ApplicationViews />
        </TaskProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
