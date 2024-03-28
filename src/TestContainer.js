import { useEffect, useState } from "react";
import { Fragment } from "react";
import { QUESTIONS } from "./question-data";
import QuestionEntity from "./QuestionEntity";

function TestContainer({ onTestCompleted }) {
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [aggregatingScore, setAggregatingScore] = useState({
    testCount: 0,
    totalScore: 0,
  });

  const questionKeys = Object.keys(QUESTIONS);

  useEffect(() => {
    if (answers.length === questionKeys.length) {
      calculateScore();
    }
  }, [answers]);

  const calculateScore = () => {
    const correctAnswers = answers.filter((ans) => ans === true).length;
    const score = (100 * correctAnswers) / questionKeys.length;
    setScore(score);
    calculateAggregate(score);
    // setTimeout(() => {
    //   onTestCompleted(score);
    // }, 10000);
  };

  const calculateAggregate = (currentScore) => {
    const existingScore = JSON.parse(window.localStorage.getItem("my11Score"));
    let newScore;
    if (existingScore) {
      newScore = {
        totalScore: existingScore.totalScore + currentScore,
        testCount: existingScore.testCount + 1,
      };
      setAggregatingScore(() => newScore);
    } else {
      newScore = {
        testCount: 1,
        totalScore: currentScore,
      };
      setAggregatingScore(() => newScore);
    }
    window.localStorage.setItem("my11Score", JSON.stringify(newScore));
  };

  const onAnswered = (answer) => {
    setAnswers((ans) => [...ans, answer]);
  };

  return (
    <Fragment>
      {answers.length !== questionKeys.length ? (
        <div>
          {questionKeys.map((questionKey) => {
            return (
              <QuestionEntity
                question={QUESTIONS[questionKey]}
                onAnswered={onAnswered}
                key={questionKey}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-purple-700 text-white px-10 py-10 rounded-lg">
          <h3 className="text-lg font-semibold">Your have scored {score}% </h3>
          <h3 className="text-lg font-semibold mt-10">
            Your have taken {aggregatingScore.testCount} tests and the avaerge
            score is{" "}
            {(aggregatingScore.totalScore / aggregatingScore.testCount).toFixed(
              2
            )}
            %
          </h3>
          <button
            className="bg-white text-black font-semibold py-2 rounded-lg px-4 mt-10"
            onClick={onTestCompleted}
          >
            Go To Home
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default TestContainer;
