import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TaskProvider } from "./providers/TaskProvider";
import { NoteProvider } from "./providers/NoteProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import './App.css';
import "./main.css"
import { TargetTimeProvider } from './components/Timer/TargetTimeProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TaskProvider>
          <NoteProvider>
            <CategoryProvider>
              <TargetTimeProvider>
                <Header />
                <ApplicationViews />
              </TargetTimeProvider>
            </CategoryProvider>
          </NoteProvider>
        </TaskProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
