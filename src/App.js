import { useState } from "react";
import TestContainer from "./TestContainer";
function App() {
  const [isTestStarted, setIsTestStarted] = useState(false);

  const onTestCompleted = () => {
    setIsTestStarted(false);
  };

  return (
    <div className="flex w-6/12 mx-auto flex-col bg-slate-300 h-[100vh] p-10">
      <div className="mt-10">
        <h3 className="text-2xl font-semibold">
          Welcome to the Tech Survey...
        </h3>
      </div>
      {!isTestStarted && (
        <div className="mt-10">
          <button
            className="bg-blue-700 text-white font-semibold py-2 rounded-lg px-4"
            onClick={() => setIsTestStarted(true)}
          >
            Start New Survey
          </button>
        </div>
      )}
      {isTestStarted && (
        <div className="mt-10">
          <TestContainer onTestCompleted={onTestCompleted} />
        </div>
      )}
    </div>
  );
}

export default App;
