import React from "react";

interface QuizCardProps {
  title: string; // Titre du quiz
  category: string;
  difficulty: string; // Difficulté du quiz
  questionsCount: number; // Nombre de questions
  img: string; // URL de l'image associée
}

const QuizCard: React.FC<QuizCardProps> = ({ title, category, difficulty, questionsCount, img }) => {
  return (
    <div className="flex w-full h-24 items-center mt-5 bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300">
      {/* Section Texte */}
      <div className="flex-1 p-4">
        <h2 className="text-black text-xl font-bold">{title}</h2>
        <div className="flex gap-2 mt-2">
          <span className="px-4 py-1 bg-orange-500 text-white rounded-full text-xs">
            {difficulty}
          </span>
          <span className="px-4 py-1 bg-orange-500 text-white rounded-full text-xs">
            {questionsCount} {questionsCount > 1 ? "questions" : "question"}
          </span>
        </div>
      </div>

      {/* Section Image */}
      <div
        className="relative w-40 h-32"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", // Diagonale côté gauche
        }}
      >
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default QuizCard;
