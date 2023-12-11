import React, { useState, useEffect } from "react";
import { QuestionType } from "../../types/trivia-types";

interface QuizQuestionProps {
  question: QuestionType;
  onSubmit: (selectedAnswer: string) => void;
  onNext: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onSubmit,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleAnswerSubmission = () => {

    if (selectedOption !== null) {
      onSubmit(selectedOption);
      setShowResult(true);
    }else{
      alert('Please select an option')
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-4 shadow rounded-md ">
        <h2 className="text-xl font-semibold mb-4">{question?.question}</h2>
        {showResult && (
          <div className="mb-4">
            {selectedOption === question.correct_answer ? (
              <p className="text-green-500">Correct!</p>
            ) : (
              <div>
                <p className="text-red-500 p-1">Incorrect!</p>
                <p>Correct Answer: {question?.correct_answer}</p>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col space-y-2">
          {question?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`py-2 px-4 rounded-md cursor-pointer ${
                selectedOption === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={showResult ? onNext : handleAnswerSubmission}
          disabled={selectedOption === null}
          className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${
            selectedOption === null ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'
          }`}
          
          // className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {showResult ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
