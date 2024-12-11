import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SelectionButton from '../components/selectionButton';
import DraggableCarousel from '../components/DraggableCarousel';
import QuizCard from '../components/QuizCard';
import Categories from '../components/Categories';

interface Props {};

const Games: React.FC<Props> = () => {
    const [currentSelection, setCurrentSelection] = useState<"quiz" | "duel">("quiz");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectionChange = (selection: "quiz" | "duel") => {
    setCurrentSelection(selection);
    console.log(`${currentSelection === "quiz" ? "Ready for a Quiz? 🧠" : "Ready for a Duel? ⚔️"}`)
  };

  const categories = ["Art de vivre", "Histoire", "Sport", "Science", "Litterature"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  }

  return (
    <div className="max-w-lg text-left mx-auto min-h-screen flex flex-col items-center justify-center border-x border-orange-200">
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-4">
            <SelectionButton onSelectionChange={handleSelectionChange} />
        </div>
            <DraggableCarousel/>
        <div className='w-full px-5 mb-5'>
            <div className="flex justify-between gap-2 mt-7">
                {categories.map((category) => (
                    <div key={category} onClick={() => handleCategoryClick(category)}>
                        <Categories category={category} selected={category === selectedCategory} />
                    </div>
                ))}
            </div>
            <h2 className="text-black font-raleway font-bold text-2xl my-7 ">Les quiz ❓</h2>
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
        </div>
    </div>
  )
}

export default Games