import { useState } from "react";
import TranslationQuiz from "../components/TranslationQuiz";

const LearnEnglish = () => {
  const [answerInEnglish, setAnswerInEnglish] = useState(
    localStorage.getItem("answerInEnglish") === "true" || false
  );

  const handleToggleLanguage = () => {
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
