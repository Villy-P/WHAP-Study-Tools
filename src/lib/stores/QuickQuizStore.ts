import { writable, type Writable } from 'svelte/store';
import type { Question } from '../../data/types';

type Store = Writable<{
    totalTime: number;
    timeRemaining: number;
    currentUnit: number;
    questionCount: number;
    currentQuestion: number;
    right: Question[];
    wrong: Question[];
}>

export let quickQuiz: Store = writable({
    totalTime: 0,
    timeRemaining: 0,
    currentUnit: 0,
    questionCount: 0,
    currentQuestion: 1,
    right: [],
    wrong: [],
});