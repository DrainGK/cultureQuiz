import { useEffect, useState } from "react";
import { QuizQuestionsProps } from "../utils/types";
import { shuffleArray } from "../utils/utils";

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(1);
  const [showScore, setShowScore] = useState(false);

  const endGifs = ["https://media.tenor.com/hz3lwhtXcUEAAAAM/rigolo-so-funny.gif", "https://media.tenor.com/sVUg-nFdn0kAAAAM/the-rock-dwayne-johnson.gif", "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQza3ltYzB4OHI5a2wzeHNnOXRrc2FxdzV0dng1eTZvNjJ6eDB1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBtaWT47wxrgdaa6Qi/giphy.webp"]

  const [shuffledAnswers, setShuffledAnswers] = useState<
    { text: string; correct: boolean }[]
  >([]);

  useEffect(() => {
    if (!quiz?.questions) return;
  
    const currentAnswers = [...quiz.questions[currentQuestionIndex].reponses];
    const shuffled = shuffleArray(currentAnswers);
  
    console.log("Avant shuffle:", quiz.questions[currentQuestionIndex].reponses);
    console.log("Après shuffle:", shuffled);
  
    setShuffledAnswers(shuffled);
  }, [currentQuestionIndex, quiz]);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextQuestionIndex = currentQuestionIndex + 1;
    setProgress(nextQuestionIndex+1);
    if (nextQuestionIndex < (quiz.questions?.length || 0)) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Aucune question disponible pour ce quiz.</p>;
  }

  function endGif() {
    if(score <= 3){
      return endGifs[0]
    } else if(score <= 7 && score >= 3 ){
      return endGifs[1]
    } else if(score>=8){
      return endGifs[2]
    }
  }

  console.log("Quiz Data:", quiz);
  console.log("Current Question:", quiz.questions[currentQuestionIndex]);

  return (
    <div className="max-w-lg text-left mx-auto min-h-screen flex flex-col items-center  border-x border-orange-200">

      {showScore ? (
        <>
        <h2 className="text-black text-5xl font-pirata">
          {score} / {quiz.questions.length}
        </h2>
        <img src={endGif()} alt="" />
        <button className="text-black">encore une fois?</button>
        <button onClick={onBack} className="text-black">selection</button>
        </>
      ) : (
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
            <div className=" h-2 bg-orange-500 rounded-full"
            style={{width: `${progress}0%`}}></div>
          </div>
          <h3 className="text-4xl text-black font-pirata font-bold mb-2">
            {quiz.questions[currentQuestionIndex]?.question || "Question indisponible"}
          </h3>
          <div className="w-fit text-white text-center font-raleway font-regular text-xl bg-orange-500 py-2 px-6 my-10 mx-auto rounded-full">
            <p>{quiz.questions[currentQuestionIndex].difficulty}</p>
          </div>
          <ul className="flex flex-col gap-4">
            {shuffledAnswers.map((response, index) => (
              <li
                key={index}
                className="text-black text-2xl flex cursor-pointer rounded-2xl shadow-md bg-white hover:bg-orange-500"
                onClick={() => handleAnswerClick(response.correct)}
              >
                <div className="bg-orange-500 font-raleway flex items-center font-black text-white text-4xl py-3 px-8 rounded-2xl rounded-tr-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
                }}>
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Partie droite : texte de la réponse */}
                <div className="flex-1 py-6 px-5 text-black font-raleway hover:text-white">
                  {response.text}
                </div>
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
