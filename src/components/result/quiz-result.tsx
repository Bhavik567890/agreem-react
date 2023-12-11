import React from "react";

interface ResultProps {
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  onRestart: () => void;
}

export const QuizResult: React.FC<ResultProps> = ({
  totalQuestions,
  totalCorrect,
  totalIncorrect,
  onRestart,
}) => {
  const incorrectQuestionTotal = totalQuestions - totalCorrect;
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="bg-white p-4 shadow rounded-md w-1/3">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Quiz Results
        </h2>
        <p className="text-xl font-semibold mb-4 text-center">
          Total Questions Served: {totalQuestions}
        </p>
        <p className="text-xl font-semibold mb-4 text-center">
          Total Correct Questions: {totalCorrect}
        </p>
        <p className="text-xl font-semibold mb-4 text-center">
          Total Incorrect Questions: {incorrectQuestionTotal}
        </p>
        <div className="flex items-center justify-center ">
        <button
          onClick={onRestart}
          className="mt-4 bg-blue-500 p-3 hover:bg-blue-600 text-white px-4 py-2 rounded-md  "
        >
          Restart Quiz
        </button>
        </div>
       
      </div>
    </div>
  );
};
