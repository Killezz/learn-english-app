import { useState } from "react";
import { useEffect } from "react";
import "../components/TranslationQuiz.css";

const TranslationQuiz = ({ answerInEnglish }) => {
  // Creates table from database translation pairs. If answerInEnglish == true then toggles between finnish and english inputs.
  const [translationPairs, setTranslationPairs] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const handleAnswerChange = (index, event) => {
    // Handles answer change and sets current answer to pair.answer value.
    const newPairs = [...translationPairs];
    newPairs[index].answer = event.target.value.trim();
    setTranslationPairs(newPairs);
  };

  const handleTryAgain = () => {
    // Try again button click sets score to 0 and clears wrongAnswers table.
    setScore(0);
    setWrongAnswers([]);
    setCheckAnswers(false);
  };

  const checkCorrectAnswers = () => {
    // Checks corrent answers and if answer is not correct it pushes it to wrongAnswers and those are shown to user. Also calculates points and sets it to score.
    setCheckAnswers(true);
    let score = 0;
    let wrongAnswers = [];
    translationPairs.forEach((pair) => {
      if (pair.answer) {
        if (answerInEnglish) {
          if (pair.english.toLowerCase() === pair.answer.toLowerCase()) {
            score++;
          } else {
            wrongAnswers.push(pair);
          }
        } else {
          if (pair.finnish.toLowerCase() === pair.answer.toLowerCase()) {
            score++;
          } else {
            wrongAnswers.push(pair);
          }
        }
      } else {
        wrongAnswers.push(pair);
      }
    });
    setWrongAnswers(wrongAnswers);
    setScore(score);
  };

  useEffect(() => {
    if (!checkAnswers) {
      // Loads all translations from api and shuffles list and returns first 15 or if not that many available returns all pairs.
      fetch("http://localhost/api/translations")
        .then((response) => response.json())
        .then((pairs) => {
          const shuffledPairs = pairs.sort(() => Math.random() - 0.5);
          const randomPairs = shuffledPairs.slice(
            0,
            Math.min(15, shuffledPairs.length)
          );
          setTranslationPairs(randomPairs);
        })
        .catch((error) =>
          console.error("Error fetching translation pairs:", error)
        );
    }
  }, [answerInEnglish, checkAnswers]);

  useEffect(() => {
    if (!checkAnswers) {
      // When answerInEnglish changes it clears all answer-input className fields.
      const inputFields = document.querySelectorAll(".answer-input");
      if (inputFields) {
        inputFields.forEach((inputField) => {
          inputField.value = "";
        });
      }
    }
  }, [answerInEnglish]);

  return (
    <>
      <div className="translations-quiz">
        {!checkAnswers ? (
          translationPairs.length > 0 && !answerInEnglish ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>English</th>
                    <th>Finnish</th>
                  </tr>
                </thead>
                <tbody>
                  {translationPairs.map((pair, index) => (
                    <tr key={pair.id}>
                      <td>{index + 1}</td>
                      <td>{pair.english}</td>
                      <td>
                        <input
                          onChange={(e) => handleAnswerChange(index, e)}
                          type="text"
                          className="answer-input"
                          aria-label="finnish translation input"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={checkCorrectAnswers}>Check answers!</button>
            </>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Finnish</th>
                    <th>English</th>
                  </tr>
                </thead>
                <tbody>
                  {translationPairs.map((pair, index) => (
                    <tr key={pair.id}>
                      <td>{index + 1}</td>
                      <td>{pair.finnish}</td>
                      <td>
                        <input
                          onChange={(e) => handleAnswerChange(index, e)}
                          type="text"
                          className="answer-input"
                          aria-label="english translation input"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={checkCorrectAnswers}>Check answers!</button>
            </>
          )
        ) : (
          <>
            {translationPairs.length > 0 &&
              score == translationPairs.length && <h1>Well done!</h1>}
            <h2>
              Score <br />
              {score}/{translationPairs.length}
            </h2>
            {wrongAnswers.length > 0 &&
              (!answerInEnglish ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>English</th>
                        <th>Finnish</th>
                        <th>Your answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wrongAnswers.map((pair, index) => (
                        <tr key={pair.id}>
                          <td>{index + 1}</td>
                          <td>{pair.english}</td>
                          <td>{pair.finnish}</td>
                          <td className="wrong-answer">{pair.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Finnish</th>
                        <th>English</th>
                        <th>Your answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wrongAnswers.map((pair, index) => (
                        <tr key={pair.id}>
                          <td>{index + 1}</td>
                          <td>{pair.finnish}</td>
                          <td>{pair.english}</td>
                          <td className="wrong-answer">{pair.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ))}
            <button className="try-again-btn" onClick={handleTryAgain}>
              Try again!
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TranslationQuiz;
