export interface Question {
    question: string;
    passage_header?: string;
    passage?: string;
    answers: string[];
    answer: number;
    unit: number;
    subunit: number;
    topics: string[];
}