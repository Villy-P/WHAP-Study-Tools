import { writable } from 'svelte/store';

export const quickQuiz = writable({
    timeRemaining: 0,
    currentUnit: 0,
    questionCount: 0,
    currentQuestion: 1
});