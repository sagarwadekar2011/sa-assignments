import { useState } from "react";
import { Fragment } from "react";
function QuestionEntity({ question, onAnswered }) {
  const [isAnswered, setIsAnswered] = useState(false);

  return (
    <Fragment>
      <div className="mt-3">
        <h3 className="text-lg font-bold">{question}</h3>
        <div>
          <button
            className="px-4 py-1 bg-green-700 text-white rounded-md me-4 cursor-pointer disabled:bg-green-200 disabled:cursor-not-allowed disabled:text-gray-500"
            disabled={isAnswered}
            onClick={() => {
              onAnswered(true);
              setIsAnswered(true);
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-1 bg-red-700 text-white rounded-md cursor-pointer disabled:bg-red-200 disabled:cursor-not-allowed disabled:text-gray-500"
            disabled={isAnswered}
            onClick={() => {
              onAnswered(false);
              setIsAnswered(true);
            }}
          >
            No
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default QuestionEntity;
