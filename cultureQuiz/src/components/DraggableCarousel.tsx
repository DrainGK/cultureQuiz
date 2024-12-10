import React, { useRef, useState } from "react";
import TrendCard from "./trendCard";

const DraggableCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const cardsData = [
        {
            image: "https://lecourrierdesstrateges.fr/wp-content/uploads/2024/07/Signol-Emile-001.jpg",
            title: "Les rois de France",
            difficulty: "facile",
            questionsCount: 10,  
        },
        {
            image: "https://lecourrierdesstrateges.fr/wp-content/uploads/2024/07/Signol-Emile-001.jpg",
            title: "Les rois de France",
            difficulty: "facile",
            questionsCount: 10,  
        },
        {
            image: "https://lecourrierdesstrateges.fr/wp-content/uploads/2024/07/Signol-Emile-001.jpg",
            title: "Les rois de France",
            difficulty: "facile",
            questionsCount: 10,  
        },
    ];

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = x - startX;
        if (carouselRef.current){
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
      };

    return(
        <div
            className="carousel-container w-full relative overflow-hidden cursor-grab active:cursor-grabbing "
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
        >
            <h2 className="text-black font-raleway font-bold text-2xl my-7 px-5">selection de la commu 🔥</h2>
            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth "
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            >
                {cardsData.map((card, index) => (     
                <TrendCard
                key={index}
                    image={card.image}
                    title={card.title}
                    difficulty={card.difficulty}
                    questionsCount={card.questionsCount}
                />
                ))}
            </div>

        </div>
    )
}

export default DraggableCarousel;