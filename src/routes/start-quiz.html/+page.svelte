<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { questions } from '../../data/questions';
    import '../../app.css'
    import { onMount } from 'svelte';

    const units = getQuestionTypeOfUnit($quickQuiz.currentUnit);
    const topics = getQuestionTypeOfTopic($quickQuiz.currentTopic);

    let questionCount: number = Math.floor(
        $quickQuiz.byUnit
            ? units / 2
            : topics / 2);
    let minutes: number = 20;

    function startQuiz() {
        $quickQuiz.totalTime = minutes * 60;
        $quickQuiz.timeRemaining = minutes * 60;
        $quickQuiz.questionCount = questionCount;
        $quickQuiz.currentQuestion = 0;
        $quickQuiz.right = [];
        $quickQuiz.wrong = [];
    }

    onMount(() => {
        localStorage.clear();
    });

    function getQuestionTypeOfUnit(unit: number): number {
        return questions.filter((e) => {
            return e.unit == unit
        }).length;
    }

    function getQuestionTypeOfTopic(topic: string): number {
        return questions.filter((e) => {
            return e.topics.includes(topic);
        }).length;
    }
</script>

<div class="w-full h-screen flex justify-center items-center flex-col gap-1">
    <div>
        <h1 class="text-xl">Options:</h1>
        <div>
            <input type="range" min="1" max={$quickQuiz.byUnit ? units : topics} id="questions" bind:value={questionCount}/>
            <label for="questions">Question Count ({questionCount})</label>
        </div>
        <div>
            <input type="range" min="1" max="200" id="time" bind:value={minutes}/>
            <label for="time">{minutes === 200 ? "No Time Limit" : `${minutes} Minutes`}</label>
        </div>
        <button class="mr-4 bg-sky-500 px-3 py-1 rounded-xl mb-4">
            <a class="w-full h-full" href="/question.html" on:click={() => startQuiz()}>Start</a>
        </button>
    </div>
</div>