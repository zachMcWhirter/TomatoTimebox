import React, { useState, useEffect, useContext } from "react";
import "./Timer.css";
import { TargetTimeContext } from "./TargetTimeProvider";

//set minutes and seconds to desired default value
export default function TimerWithReset() {

    const [second, setSecond] = useState("--");
    const [minute, setMinute] = useState("--");
    // when the page renders, the timer will not start until the
    // user clicks the start button

    const { targetTime, pauseTimer,
        restartTimer, pauseAt, isActive, msRemaining } = useContext(TargetTimeContext)

    const [targetDate, setTargetDate] = useState(targetTime)

    const counter = () => {
        if (!isActive()) {
            //secs remaining
            return msRemaining / 1000
        }
        const counterTime = (targetTime - new Date().getTime()) / 1000
        if (counterTime < 0) {
            return 0
        }
        return (targetTime - new Date().getTime()) / 1000
    }

    const displayTime = () => {
        const secondCounter = Math.round(counter()) % 60;
        const minuteCounter = Math.floor(counter() / 60);

        let computedSecond =
            String(secondCounter).length === 1
                ? `0${secondCounter}`
                : secondCounter;
        let computedMinute =
            String(minuteCounter).length === 1
                ? `0${minuteCounter}`
                : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
    }

    const handleTimerFinished = () => {
        alert("Great Job! Time for a 5 minute break")
    }

    useEffect(() => {
        let intervalId;

        intervalId = setInterval(() => {
            displayTime()
            if (counter() === 0) {
                clearInterval(intervalId);
                handleTimerFinished();

            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isActive]);

    const handlePausePress = () => {

        if (isActive()) {
            pauseTimer()
        } else {
            restartTimer()
        }
    }

    // set new date
    function resetTimer() {
        pauseAt(1000 * 60 * 25)
        setSecond("00");
        setMinute("25");

    }

    return (
        <div className="container">
            <div className="time">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <div >
                <div className="buttons">
                    <button onClick={() => handlePausePress()} className="start">
                        {isActive() ? "Pause" : "Start"}
                    </button>
                    <button onClick={resetTimer} className="reset">
                        Reset
                </button>
                </div>
            </div>
        </div>
    );
};


