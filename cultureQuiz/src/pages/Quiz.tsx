import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Quiz as QuizType } from "../utils/types";
import QuizQuestions from "../components/QuizQuestions";

const Quiz: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupération de l'ID dans l'URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/data_quiz.json");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        const foundQuiz = data.quizzes.find(
          (quiz: QuizType) => quiz.id === parseInt(id ?? "", 10)
        );

        if (!foundQuiz) {
          throw new Error("Quiz introuvable.");
        }

        setQuiz(foundQuiz);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate("/")}>Retour</button>
      </div>
    );
  }

  if (!quiz) {
    return <p>Quiz introuvable.</p>;
  }

  return (
    <QuizQuestions
      quiz={quiz} // On passe le quiz trouvé comme prop
      onBack={() => navigate("/")} // Retour à la page principale
    />
  );
};

export default Quiz;
