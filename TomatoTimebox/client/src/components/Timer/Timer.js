import * as React from "react";
import { render } from "react-dom";
// import { Button } from 'reactstrap';
import "./Timer.css";


export default function TomatoTimebox() {
    const [counter, setCounter] = React.useState(1500);

    // converter function that allows us to change format in the return 
    function prettifyCounter(numOfSeconds) {
        return new Date(numOfSeconds * 1000).toISOString().substr(14, 5)
    }

    const startCountdown = (e) => {
        e.preventDefault();
        setCounter(1500)

    }

    React.useEffect(() => {
        (counter > 0 && setTimeout(() => setCounter(counter - 1), 1000))
        if (counter === 0) {
            alert("time for a break!");
        }
    }, [counter]);

    console.log("counter:", counter)

    return (
        <div className="TomatoTimer">
            <div className="timer-container">
                <div className="timer-and-label">
                    <div className="timer-title">TOMATO TIMEBOX
          </div>
                    <div className="timer">
                        {prettifyCounter(counter)}
                    </div>
                </div>
                <button
                    onClick={startCountdown}
                >Start</button>
            </div>
        </div>
    );
}
