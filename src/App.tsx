import  { useEffect, useState } from "react";
import { QuizResult } from "./components/result/quiz-result";
import { fetchQuestions } from "./services/fetch-question-serivce";
import { QuestionType } from "./types/trivia-types";
import { Spinner } from "./components/loader/loader";
import QuizQuestion from "./components/question/quiz-question";

const App = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriviaQuestions();
  }, []);

  const handleAnswerSubmission = (selectedAnswer: string) => {
    const currentQuestion = questions[currentIndex];
    if (selectedAnswer === currentQuestion?.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < 9) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {isLoading ? (
          <Spinner />
        ) : showResult ? (
          <QuizResult
            totalQuestions={questions?.length}
            totalCorrect={correctAnswers}
            totalIncorrect={incorrectAnswers}
            onRestart={resetQuiz}
          />
        ) : questions?.length > 0 && currentIndex < questions?.length ? (
          <QuizQuestion
            question={questions[currentIndex]}
            onSubmit={handleAnswerSubmission}
            onNext={handleNextQuestion}
          />
        ) : null}
      </div>
    </>
  );
};

export default App;
