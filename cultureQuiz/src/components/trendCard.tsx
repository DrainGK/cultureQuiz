import React from "react";

interface TrendCardProps {
    image: string;
    title: string;
    difficulty: string;
    questionsCount: number;
}

const TrendCard: React.FC<TrendCardProps> = ({image, title, difficulty, questionsCount}) => {
    return(
        <div className="bg-white rounded-[25px] shadow-md border overflow-hidden w-[280px] shrink-0">
            <img src={image} alt={title} className="w-full h-[120px] object-cover" draggable={false}/>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 font-pirata">{title}</h3>
                <div className="flex justify-around text-sm text-gray-600">
                    <span className="bg-orange-500 text-white py-1 px-4 rounded-full text-xs cursor-pointer">
                        {difficulty}
                    </span>
                    <span className="bg-orange-500 text-white py-1 px-4 rounded-full text-xs shadow-inner">{questionsCount} questions</span>
                </div>
            </div>
        </div>
    )
};

export default TrendCard;