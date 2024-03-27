<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { onMount } from 'svelte';
    import { formatTime } from '../../utilities/time';
    import { questions } from '../../data/questions.json';
    import type { Question } from '../../data/types';
    import '../../app.css'
    import { shuffleArray } from '../../utilities/random';

    onMount(() => {
        setInterval(() => {
            $quickQuiz.timeRemaining--;
        }, 1000);
        shuffleArray(questions);
        getNewQuestion();
    });

    let questionWrapper: HTMLDivElement;
    let hasSelectedQuestion = false;

    function clickAnswer(answer: EventTarget | null) {
        if (answer == null)
            return;
        for (const question of questionWrapper.children)
            question.classList.remove("bg-slate-200");
        const div = answer as HTMLDivElement;
        div.classList.add("bg-slate-200");
        hasSelectedQuestion = true;
    }

    let currentQuestion: Question;

    function getNewQuestion() {
        currentQuestion = questions.shift() as Question;
    }
</script>

<div class="flex w-full border-b-2 border-gray-600 h-12 items-center">
    <button class="flex justify-center items-center h-3/4 mx-3 hover:bg-slate-100 p-2 rounded-lg text-sm text-blue-500 font-medium">
        <a href="/">Exit</a>
    </button>
    <p class="text-sm font-semibold ml-auto">12 / 30</p>
    <p class="text-sm font-semibold mx-3">{formatTime($quickQuiz.timeRemaining)}</p>
</div>
<div class="w-full flex items-center flex-col gap-1 pt-10 pb-5">
    <div class="w-8/12 flex flex-col gap-3">
        {#if currentQuestion}
            <div class="w-full p-2 font-semibold">{currentQuestion.question}</div>
            {#if currentQuestion.passage}
                <div class="w-full p-2 pb-0">{currentQuestion.passage_header}</div>
                <div class="w-full p-2 pt-0">{currentQuestion.passage}</div>
            {/if}
            <!-- <div class="flex-grow overflow-auto flex">
                <img class="w-96" alt="data" src="https://wpapp.kaptest.com/study/wp-content/uploads/West_African_Trade_Routes___APWHM.png"/>
            </div> -->
            <div class="w-full flex flex-col gap-2" bind:this={questionWrapper}>
                {#each currentQuestion.answers as answer}
                    <button class="question-response" on:click={(e) => clickAnswer(e.target)}>{answer}</button>
                {/each}
            </div>
            {#if hasSelectedQuestion}
                <button class="flex justify-center items-center h-3/4 ml-auto mx-3 w-fit hover:bg-slate-100 p-2 rounded-lg text-sm text-blue-600 font-medium">
                    Check Answer
                </button>
            {/if}
        {/if}
    </div>
</div>