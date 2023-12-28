import { useState } from "react";
import TranslationQuiz from "../components/TranslationQuiz";

const LearnEnglish = () => {
  const [answerInEnglish, setAnswerInEnglish] = useState(
    localStorage.getItem("answerInEnglish") === "true" || false
  );

  const handleToggleLanguage = () => {
    // Changes answerInEnglish value and saves it to browsers local storage so it will be the same on page refresh.
    const newValue = !answerInEnglish;
    setAnswerInEnglish(newValue);
    localStorage.setItem("answerInEnglish", newValue.toString());
  };

  return (
    <>
      <div className="center">
        <h1>Learn English</h1>
      </div>
      <button onClick={handleToggleLanguage}>Toggle language</button>
      <div className="center">
        <TranslationQuiz answerInEnglish={answerInEnglish} />
      </div>
    </>
  );
};

export default LearnEnglish;
