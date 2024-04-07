export interface Question {
    question: string;
    image_link?: string;
    passage_header?: string;
    passage?: string;
    answers: string[];
    answer: number;
    unit: number;
    subunit: number;
    topics: string[];
}