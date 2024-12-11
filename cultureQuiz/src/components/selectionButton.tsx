import React, { useState } from "react";

interface SelectionButtonProps {
  onSelectionChange?: (selection: "quiz" | "duel") => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({ onSelectionChange }) => {
  const [selected, setSelected] = useState<"quiz" | "duel">("quiz");

  const handleSelection = (selection: "quiz" | "duel") => {
    setSelected(selection);
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
  };

  return (
    <div className="w-full mt-5 flex gap-4 font-pirata">
      {/* Quiz Button */}
      <button
        onClick={() => handleSelection("quiz")}
        className={`flex items-center justify-center px-6 py-3 rounded-lg text-5xl font-bold transition-all ${
          selected === "quiz" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Quiz 🧠
      </button>

      {/* Duel Button */}
      <button
        onClick={() => handleSelection("duel")}
        className={`flex items-center justify-center px-6 py-3 rounded-lg text-5xl font-bold transition-all ${
          selected === "duel" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Duel ⚔️
      </button>
    </div>
  );
};

export default SelectionButton;
