export interface Question {
    question: string;
    image_link?: string;
    passage_header?: string;
    passage?: string;
    explanation: string;
    answers: string[];
    answer: number;
    unit: number;
    subunit: number;
    topics: string[];
}