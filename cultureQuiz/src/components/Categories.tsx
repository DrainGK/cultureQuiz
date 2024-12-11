import React from "react";

interface CategoryProps {
    category: string;
    selected: boolean;
}

const Categories: React.FC<CategoryProps > = ({category, selected}) => {
    return (
        <div className={`px-4 py-1 text-black text-xs rounded-full cursor-pointer ${
            selected ? "bg-orange-500 text-white" : "bg-white border-gray-300"
        } border shadow-sm`}>
            <p>{category}</p>
        </div>
    )
}

export default Categories;