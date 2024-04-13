import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        //Question component does not get recreated without the key prop
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        // whenever the key prop changes on a component,
        // react will destroy the old component instance and create a new one
        // it unmounts and remounts it
        // that's how we can get new timer for every new question
        onSelectAnswer={handleSelectAnswer}
        onAnswerSkipped={handleSkipAnswer}
      />
    </div>
  );
}
