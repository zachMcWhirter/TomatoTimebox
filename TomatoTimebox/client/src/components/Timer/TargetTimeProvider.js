import React, { useState, useContext } from "react";

export const TargetTimeContext = React.createContext();

export const TargetTimeProvider = (props) => {

    const [targetTime, setTargetTime] = useState(null);

    const [msRemaining, setMsRemaining] = useState(1000 * 5);
    // What we need: [ elapsed time, ]    
    const pauseTimer = () => {
        if (!targetTime) {
            return
        }
        const milliSecsRemaining = targetTime - new Date().getTime()
        // set targetTime to null
        setTargetTime(null)
        // store milliseconds remaining
        setMsRemaining(milliSecsRemaining)
    }

    const restartTimer = () => {
        if (targetTime) {
            return
        }
        // set targetTime to (time now(ms) + milliseconds remaining)
        setTargetTime(msRemaining + new Date().getTime());
        setMsRemaining(null);
    }

    const pauseAt = (ms) => {
        setTargetTime(null)
        setMsRemaining(ms)
    }

    const isActive = () => {
        return targetTime != null
    }

    return (
        <TargetTimeContext.Provider value={{
            targetTime, setTargetTime, restartTimer, pauseTimer, pauseAt, isActive,
            msRemaining
        }}>
            {props.children}
        </TargetTimeContext.Provider>
    );
}
