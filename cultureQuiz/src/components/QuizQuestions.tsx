import { useState } from "react";

interface Quiz {
    titre: string;
    categorie: string;
    difficulty: string;
    img: string;
    ELO: number;
    questions: Question[];
  }

  interface Question {
    question: string;
    responses: { text: string; correct: boolean}[];
    note_historique: string;
  }

interface QuizQuestionsProps {
    quiz: Quiz;
    onBack: () => void;
  }
  
  const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
  
    const handleAnswerClick = (isCorrect: boolean) => {
      if (isCorrect) setScore((prev) => prev + 1);
  
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quiz.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowScore(true);
      }
    };
  
    return (
      <div>
        <button onClick={onBack} className="text-blue-500 mb-4">← Retour</button>
  
        {showScore ? (
          <h2 className="text-2xl font-bold">
            Score final : {score} / {quiz.questions.length}
          </h2>
        ) : (
          <div>
            <h3 className="text-lg font-bold mb-2">{quiz.questions[currentQuestionIndex].question}</h3>
            <ul>
              {quiz.questions[currentQuestionIndex].responses.map((response, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 bg-gray-100 hover:bg-orange-300 rounded mb-2"
                  onClick={() => handleAnswerClick(response.correct)}
                >
                  {response.text}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-2 text-gray-500">
              {quiz.questions[currentQuestionIndex].note_historique}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default QuizQuestions;
  