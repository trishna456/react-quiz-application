import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  //making a copy first, because sort() will not make a new copy and i need the original answers order unchanged
  shuffledAnswers.sort(() => Math.random() - 0.5); //50% negative values, 50% positive values

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

  return (
    <div id="quiz">
      <div id="question">
        {/* QuestionTimer component does not get recreated without the key prop */}
        <QuestionTimer
          key={activeQuestionIndex}
          // whenever the key prop changes on a component,
          // react will destroy the old component instance and create a new one
          // it unmounts and remounts it
          // that's how we can get new timer for every new question
          timeout={10000}
          onTimeout={() => {
            handleSelectAnswer(null);
          }}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={handleSkipAnswer}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
