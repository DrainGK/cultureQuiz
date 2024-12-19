import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SelectionButton from '../components/selectionButton';
import DraggableCarousel from '../components/DraggableCarousel';
import QuizCard from '../components/QuizCard';
import Categories from '../components/Categories';
import QuizQuestions from '../components/QuizQuestions';

interface Quiz{
  titre: string;
  categorie: string;
  difficulty: string;
  img: string;
  ELO: number;
  questions: Question[];
};

interface Question {
  question: string;
  responses: { text: string; correct: boolean}[];
  note_historique: string;
}

interface DuelData {
  id: number;
  name: string;
  elements: string[];
}

const Games: React.FC = () => {
    const [currentSelection, setCurrentSelection] = useState<"quiz" | "duel">("quiz");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  const handleSelectionChange = (selection: "quiz" | "duel") => {
    setCurrentSelection(selection);
    console.log(selection === "quiz" ? "Ready for a Quiz? 🧠" : "Ready for a Duel? ⚔️");  
  };

  const handleCategoryClick = (category: string) => {
    if(selectedCategory === category){
      setSelectedCategory(null)
    } else {

      setSelectedCategory(category);
    }
    
  }

  const handleQuizClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("/data_quiz.json");
        if (!response.ok){
          throw new Error("Erreur lors de la recuperation des donnees");
        }
        const data = await response.json();
        setQuizzes(data.quizzes)
      } catch (err){
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])
  
  if (isLoading) return <p className="text-center">Chargement des données...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  
  
  const getCategories = (quizzes: Quiz[]): string[] =>{
    return [...new Set(quizzes.map((quiz) => quiz.categorie))];
  }

  const categories = getCategories(quizzes);

  return (
    <div className="max-w-lg text-left mx-auto min-h-screen flex flex-col items-center  border-x border-orange-200">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-4">
        <SelectionButton onSelectionChange={handleSelectionChange} />
      </div>
      <DraggableCarousel />
      <div className="w-full px-5 mb-5">
        {/* Catégories */}
        <div className="flex gap-2 mt-7">
          {categories.map((category) => (
            <div key={category} onClick={() => handleCategoryClick(category)}>
              <Categories category={category} selected={category === selectedCategory} />
            </div>
          ))}
        </div>

        {/* Liste des quiz */}
        {!selectedQuiz ? (
          <>
            <h2 className="text-black font-raleway font-bold text-2xl my-7">Les quiz ❓</h2>
            {quizzes
              .filter((quiz) => !selectedCategory || quiz.categorie === selectedCategory) // Filtrer par catégorie
              .map((quiz, index) => (
                <div key={index} onClick={() => handleQuizClick(quiz)}>
                  <QuizCard
                    title ={quiz.titre}
                    category={quiz.categorie}
                    difficulty={quiz.difficulty}
                    img={quiz.img}
                    questionsCount={quiz.questions.length}
                  />
                </div>
              ))}
          </>
        ) : (
          <QuizQuestions quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
        )}
      </div>
    </div>
  )
}

export default Games