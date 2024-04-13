import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
    /* the clean up function (mentioned inside return) will automatically be executed by react 
    before the useEffect runs again or when the component is unmounted from the DOM (clears from the screen)*/
  }, [timeout, onTimeout]);
  // we also need to put setTimeout inside useEffect because since we are updating the state in setIntervals, component will get re-rendered
  // and we'll end up having multiple timers otherwise!
  // dependencies inside useEffect are the state or prop values that the function is dependent upon

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      //clean up function
      clearInterval(interval);
    };
  }, []);
  // need to use setInterval inside useEffect because since we are updating the state inside it,
  // we will end up inside an infite loop of state updates and re-renders

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
