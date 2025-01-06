export interface Quiz {
    titre: string;
    id: number;
    categorie: string;
    difficulty: string;
    img: string;
    ELO: number;
    questions: Question[];
}

export interface Question {
    question: string;
    difficulty: string;
    reponses: { text: string; correct: boolean}[];
    note_historique: string;
}

export interface QuizQuestionsProps {
    quiz: Quiz;
    onBack: () => void;
}


export interface QuizCardProps {
    title: string; // Titre du quiz
    category: string;
    difficulty: string; // Difficulté du quiz
    questionsCount: number; // Nombre de questions
    img: string; // URL de l'image associée
    to: string;
}

export interface DuelData {
    titre: string;
    id: number;
    categorie: string;
    img: string;
    difficulty: string;
    ELO: number;
    player: Player[];
  }

export type Player = {
    name: string;
    elo: number;
    img: string;
}
  