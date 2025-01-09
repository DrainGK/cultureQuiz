import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SelectionButton from '../components/selectionButton';
import DraggableCarousel from '../components/DraggableCarousel';
import QuizCard from '../components/QuizCard';
import Categories from '../components/Categories';
import { Quiz, DuelData } from '../utils/types';
import { slugify } from '../utils/utils';

const Games: React.FC = () => {
    const [currentSelection, setCurrentSelection] = useState<"quiz" | "duel">("quiz");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [dataElement, setDataElement] = useState<Quiz[]>([]);
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
      
      const endPoint = currentSelection === "quiz"? "/data_quiz.json" : "/data_duel.json";
      try{
        const response = await fetch(endPoint);
        if (!response.ok){
          throw new Error("Erreur lors de la recuperation des donnees");
        }
        const data = await response.json();
        if (currentSelection === "quiz") {
          setDataElement(data.quizzes || []); // Charger les données pour les quiz
        } else {
          setDataElement(data.duels || []); // Charger les données pour les duels
        }
      } catch (err){
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentSelection])
  
  if (isLoading) return <p className="text-center">Chargement des données...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  
  
  const getCategories = (quizzes: Quiz[]): string[] =>{
    return [...new Set(quizzes.map((quiz) => quiz.categorie))];
  }

  const categories = getCategories(dataElement);

  return (
      <div className="overflow-hidden h-screen max-w-lg w-full text-left mx-auto flex flex-col items-center  border-x border-orange-200">
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-4">
          <SelectionButton onSelectionChange={handleSelectionChange} />
        </div>
        <DraggableCarousel />
        <div className="w-full h-2/5 px-2 md:px-5 mb-5">
          {/* Catégories */}
          <div className="flex gap-2 mt-7">
            {categories.map((category) => (
              <div key={category} onClick={() => handleCategoryClick(category)}>
                <Categories category={category} selected={category === selectedCategory} />
              </div>
            ))}
          </div>

          <h2 className="text-black font-raleway font-bold text-2xl mt-7 mb-3">{currentSelection === "quiz"? "Les quizzes ❓" : "Les duels 💥"}</h2>
          <div className='h-3/4 xl:h-[90%] overflow-y-scroll no-scrollbar'>
                {dataElement
                  .filter((data) => !selectedCategory || data.categorie === selectedCategory) // Filtrer par catégorie
                  .map((data) => (
                    <div key={data.id} onClick={() => handleQuizClick(data)}>
                      <QuizCard
                        title ={data.titre}
                        category={data.categorie}
                        difficulty={data.difficulty}
                        img={data.img}
                        questionsCount={data.questions?.length}
                        to={`/${currentSelection}/${slugify(data.titre)}-${data.id}`}
                      />
                    </div>
                  ))}
          </div>
      </div>
    </div>
  )
}

export default Games