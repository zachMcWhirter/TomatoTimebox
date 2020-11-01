import React, { useState, useEffect } from "react";
import "./styles.css";

//set minutes and seconds to desired default value
export default function TimerWithReset() {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("25");
  // when the page renders, the timer will not start until the
  // user clicks the start button
  const [isActive, setIsActive] = useState(false);

  const [counter, setCounter] = useState(1500);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

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

        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(1500);
    setSecond("00");
    setMinute("25");
  }

  return (
    <div class="container">
      <div class="time">
        <span class="minute">{minute}</span>
        <span>:</span>
        <span class="second">{second}</span>
      </div>
      <div class="buttons">
        <button onClick={() => setIsActive(!isActive)} class="start">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} class="reset">
          Reset
        </button>
      </div>
    </div>
  );
};


