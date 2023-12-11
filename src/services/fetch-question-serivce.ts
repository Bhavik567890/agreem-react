import { QuestionType } from "../types/trivia-types";

export const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
      if (data?.results) {
        const formattedQuestions = data?.results?.map((question: QuestionType) => ({
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        }));
        return formattedQuestions;
      }
    } catch (error) {
      console.log('Error fetching questions:', error);
      throw new Error('Failed to fetch questions');
    }
  };
  