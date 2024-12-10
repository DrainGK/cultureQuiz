import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SelectionButton from '../components/selectionButton';
import DraggableCarousel from '../components/DraggableCarousel';
import QuizCard from '../components/QuizCard';

interface Props {};

const Games: React.FC<Props> = () => {
    const [currentSelection, setCurrentSelection] = useState<"quiz" | "duel">("quiz");

  const handleSelectionChange = (selection: "quiz" | "duel") => {
    setCurrentSelection(selection);
    console.log(`${currentSelection === "quiz" ? "Ready for a Quiz? 🧠" : "Ready for a Duel? ⚔️"}`)
  };
  return (
    <div className="max-w-lg text-left mx-auto min-h-screen flex flex-col items-center justify-center border-x border-orange-200">
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-4">
            <SelectionButton onSelectionChange={handleSelectionChange} />
        </div>
            <DraggableCarousel/>
        <div className='w-full px-5'>
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