import { useEffect, useState } from "react";
import { QuizQuestionsProps } from "../utils/types";
import { shuffleArray } from "../utils/utils";

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(1);
  const [showScore, setShowScore] = useState(false);
  

  // Pour savoir si l'utilisateur a déjà répondu
  const [answered, setAnswered] = useState(false);
  // Pour savoir si la réponse choisie est correcte ou non
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number |null>(null);

  const endGifs = [
    "https://media.tenor.com/hz3lwhtXcUEAAAAM/rigolo-so-funny.gif",
    "https://media.tenor.com/sVUg-nFdn0kAAAAM/the-rock-dwayne-johnson.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQza3ltYzB4OHI5a2wzeHNnOXRrc2FxdzV0dng1eTZvNjJ6eDB1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBtaWT47wxrgdaa6Qi/giphy.webp"
  ];

  const [shuffledAnswers, setShuffledAnswers] = useState<
    { text: string; correct: boolean }[]
  >([]);

  useEffect(() => {
    if (!quiz?.questions) return;

    const currentAnswers = [...quiz.questions[currentQuestionIndex].reponses];
    const shuffled = shuffleArray(currentAnswers);

    setShuffledAnswers(shuffled);
  }, [currentQuestionIndex, quiz]);

  const handleAnswerClick = (isCorrect: boolean, index:number) => {
    setAnswered(true);
    setSelectedAnswerIndex(index);
    setIsAnswerCorrect(isCorrect);
  };


  const handleNextQuestion = () => {
    // Si la réponse précédente était correcte
    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    setProgress(nextQuestionIndex + 1);

    // S'il reste encore des questions
    if (nextQuestionIndex < (quiz.questions?.length || 0)) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Sinon on affiche le score final
      setShowScore(true);
    }

    // On cache la note historique pour la question suivante
    setAnswered(false);
    // On réinitialise la « bonne réponse » pour la suite
    setIsAnswerCorrect(false);
    setSelectedAnswerIndex(null);
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Aucune question disponible pour ce quiz.</p>;
  }

  function endGif() {
    if (score <= 3) {
      return endGifs[0];
    } else if (score <= 7 && score >= 3) {
      return endGifs[1];
    } else if (score >= 8) {
      return endGifs[2];
    }
  }

  return (
    <div className="max-w-lg text-left mx-auto min-h-screen flex flex-col items-center border-x border-orange-200">

      {showScore ? (
        // --- Écran de fin ---
        <div className="w-[600px] max-w-lg flex flex-col items-center mx-auto px-4 gap-y-10 mt-10">
          <h2 className="text-black text-6xl font-pirata">
            {score} / {quiz.questions.length}
          </h2>
          <img className="w-full rounded-3xl" src={endGif()} alt="score gif" />
          <div className="w-full flex flex-col gap-y-4 font-raleway text-xl">
            <button
              onClick={() => window.location.reload()}
              className="text-white w-full bg-orange-500 py-6 rounded-2xl"
            >
              Encore une fois?
            </button>
            <button
              onClick={onBack}
              className="text-white w-full bg-orange-500 py-6 rounded-2xl"
            >
              Retour à la sélection
            </button>
          </div>
        </div>
      ) : (
        // --- Questions en cours ---
        <div className="px-5">
          <div className="flex justify-between w-full p-4 items-center">
            <button onClick={onBack} className="text-black text-4xl items-center">
              ←-
            </button>
            <div className="bg-orange-500 py-1 px-3 rounded-full text-white">
              {score} / {quiz.questions.length}
            </div>
          </div>
          <div className="w-full h-2 mb-5 mt-3 bg-gray-200 rounded-full shadow-inner">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}0%` }}
            />
          </div>

          {/* Intitulé de la question */}
          <h3 className="text-4xl text-black font-pirata font-bold mb-2">
            {quiz.questions[currentQuestionIndex]?.question ||
              "Question indisponible"}
          </h3>

          {/* Difficulté */}
          <div className="w-fit text-white text-center font-raleway font-regular text-xl bg-orange-500 py-2 px-6 my-10 mx-auto rounded-full">
            <p>{quiz.questions[currentQuestionIndex].difficulty}</p>
          </div>

          {/* Liste des réponses */}
          <ul className="flex flex-col gap-4">
            {shuffledAnswers.length > 0 ? (
              shuffledAnswers.map((response, index) => (
                <li
                  key={index}
                  className={`text-black text-2xl flex cursor-pointer rounded-2xl shadow-lg shadow-black/25
                    ${
                      selectedAnswerIndex === index
                        ? isAnswerCorrect
                          ? "bg-green-500 text-white" // Bonne réponse sélectionnée
                          : "bg-orange-500 text-white" // Mauvaise réponse sélectionnée
                        : answered && response.correct
                        ? "bg-green-500 text-white" // Autres réponses correctes après sélection
                        : "bg-white hover:bg-orange-500 hover:text-white"
                    }`}
                  onClick={() => handleAnswerClick(response.correct, index)}
                >
                  <div
                    className="bg-orange-500 font-raleway flex items-center font-black text-white text-4xl py-3 px-8 rounded-2xl rounded-tr-none"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)"
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div className="flex-1 py-6 px-5 text-black font-raleway hover:text-white">
                    {response.text}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-red-500">Réponses indisponibles.</p>
            )}
          </ul>

          {/* Note historique et bouton « question suivante » */}
          {answered && (
            <div className="flex flex-col gap-y-3 items-end mt-6">
              <p className="text-sm py-2 px-2 font-raleway text-gray-500 bg-slate-50 border-l-8 border-orange-500">
                {quiz.questions[currentQuestionIndex]?.note_historique || ""}
              </p>
              <span
                className="bg-orange-500 text-4xl w-fit px-6 py-2 rounded-xl shadow-xl cursor-pointer hover:bg-transparent hover:text-orange-500"
                onClick={handleNextQuestion}
              >
                &#10230; {/* Flèche vers la droite */}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
