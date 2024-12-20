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

export interface DuelData {
    id: number;
    name: string;
    elements: string[];
  }