import React from "react";

const QuizCard: React.FC = () => {
  return (
    <div className="flex w-full h-24 items-center mt-5 bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Text Section */}
      <div className="flex-1 p-4">
        <h2 className="text-black text-xl font-bold">Art de vivre</h2>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 bg-orange-500 text-white rounded-full text-sm">
            facile
          </button>
          <button className="px-4 py-1 bg-orange-500 text-white rounded-full text-sm">
            10 questions
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="relative w-40 h-32"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", // Left side diagonal
        }}
      >
        <img
          src="https://ffcuisine.fr/wp-content/uploads/2023/09/Decouvrez-les-secrets-caches-de-la-cuisine-francaise-le-coq-au-vin-traditionnel-devoile.jpg"
          alt="Art de vivre"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default QuizCard;
