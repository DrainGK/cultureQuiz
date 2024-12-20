import { useState } from "react";
import { QuizQuestionsProps } from "../utils/types";

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < (quiz.questions?.length || 0)) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Aucune question disponible pour ce quiz.</p>;
  }

  console.log("Quiz Data:", quiz);
  console.log("Current Question:", quiz.questions[currentQuestionIndex]);

  return (
    <div className="text-black">
      <button onClick={onBack} className="text-blue-500 mb-4">
        ← Retour
      </button>

      {showScore ? (
        <h2 className="text-2xl font-bold">
          Score final : {score} / {quiz.questions.length}
        </h2>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-2">
            {quiz.questions[currentQuestionIndex]?.question || "Question indisponible"}
          </h3>
          <ul>
            {quiz.questions[currentQuestionIndex]?.reponses?.map((response, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 bg-gray-100 hover:bg-orange-300 rounded mb-2"
                onClick={() => handleAnswerClick(response.correct)}
              >
                {response.text}
              </li>
            )) || <p className="text-red-500">Réponses indisponibles.</p>}
          </ul>
          <p className="text-sm mt-2 text-gray-500">
            {quiz.questions[currentQuestionIndex]?.note_historique || ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
