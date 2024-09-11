import { writable, type Writable } from 'svelte/store';
import type { Question } from '../../data/types';

type Store = Writable<{
    totalTime: number;
    timeRemaining: number;
    currentUnit: number;
    currentTopic: string;
    questionCount: number;
    currentQuestion: number;
    byUnit: boolean;
    right: Question[];
    wrong: Question[];
}>

export const quickQuiz: Store = writable({
    totalTime: 0,
    timeRemaining: 0,
    currentUnit: 0,
    currentTopic: "",
    questionCount: 0,
    currentQuestion: 1,
    byUnit: false,
    right: [],
    wrong: [],
});