import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  //if shuffled answers has already been defined, i will not shuffle the answers again even when the component re-renders
  //using ref
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    //making a copy first, because sort() will not make a new copy and i need the original answers order unchanged
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //50% negative values, 50% positive values
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;

        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              className={cssClass}
              onClick={() => onSelect(answer)}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
