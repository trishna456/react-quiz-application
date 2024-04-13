import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);
  // we also need to put setTimeout inside useEffect because since we are updating the state in setIntervals, component will get re-rendered
  // and we'll end up having multiple timers otherwise!
  // dependencies inside useEffect are the state or prop values that the function is dependent upon

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);
  }, []);
  // need to use setInterval inside useEffect because since we are updating the state inside it,
  // we will end up inside an infite loop of state updates and re-renders

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
