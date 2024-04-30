<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { onMount } from 'svelte';
    import { formatTime } from '../../utilities/time';
    import { questions } from '../../data/questions';
    import type { Question } from '../../data/types';
    import '../../app.css'
    import { shuffleArray } from '../../utilities/random';
    import { writable } from 'svelte/store';

    onMount(() => {
        const s = getStore();
        setInterval(() => {
            $quickQuiz.timeRemaining--;
        }, 1000);
        if (s)
            return;
        shuffleArray(validQuestions);
        getNewQuestion();
    });

    let questionWrapper: HTMLDivElement;
    let selectedAnswer = -1;
    let validQuestions = JSON.parse(JSON.stringify(questions));

    function saveStore(store: any) {
        localStorage.setItem("store", JSON.stringify(store));
        localStorage.setItem("question", JSON.stringify(currentQuestion));
        localStorage.setItem("questions", JSON.stringify(validQuestions));
        localStorage.setItem("correct", correct.toString());
        console.log("Store saved: " + JSON.stringify(store))
    }

    function getStore() {
        const store = localStorage.getItem("store");
        const question = localStorage.getItem("question");
        const questions = localStorage.getItem("questions");
        const correctItems = localStorage.getItem("correct");
        if (store) {
            console.log(`Store get: ` + JSON.parse(store) + "\n" + store);
            $quickQuiz = JSON.parse(store);
            if (question)
                currentQuestion = JSON.parse(question);
            if (questions)
                validQuestions = JSON.parse(questions);
            if (correctItems)
                correct = parseInt(correctItems);
            return true;
        }
        return false;
    }

    function clickAnswer(answer: EventTarget | null, index: number) {
        if (answer == null)
            return;
        for (const question of questionWrapper.children)
            question.classList.remove("bg-slate-200");
        const div = answer as HTMLDivElement;
        div.classList.add("bg-slate-200");
        selectedAnswer = index;
    }

    let currentQuestion: Question;
    let correct = 0;

    function getNewQuestion() {            
        currentQuestion = validQuestions.shift() as Question;
        if (currentQuestion.unit != $quickQuiz.currentUnit) {
            getNewQuestion();
            return;
        }
        $quickQuiz.currentQuestion++;
        correct = 0;
        selectedAnswer = -1
        if (questionWrapper)
            for (const question of questionWrapper.children)
                question.classList.remove("bg-slate-200");
        saveStore($quickQuiz);
    }

    function checkAnswer() {
        correct = currentQuestion?.answer == selectedAnswer ? 1 : 2;
        if (correct == 1) 
            $quickQuiz.right.push(currentQuestion);
        else
            $quickQuiz.wrong.push(currentQuestion);
        saveStore($quickQuiz);
    }
</script>

<div class="flex w-full border-b-2 border-gray-600 h-12 items-center">
    <button class="flex justify-center items-center h-3/4 mx-3 hover:bg-slate-100 p-2 rounded-lg text-sm text-blue-500 font-medium">
        <a href="/">Exit</a>
    </button>
    <p class="text-sm font-semibold ml-auto">{$quickQuiz.currentQuestion} / {$quickQuiz.questionCount}</p>
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
            {#if currentQuestion.image_link}
                <div class="flex-grow overflow-auto flex">
                    <img class="w-96" alt="data" src={currentQuestion.image_link}/>
                </div>
            {/if}
            <div class="w-full flex flex-col gap-2" bind:this={questionWrapper}>
                {#each currentQuestion.answers as answer, index}
                    <button class="question-response" on:click={(e) => clickAnswer(e.target, index)}>{answer}</button>
                {/each}
            </div>
            {#if selectedAnswer != -1 && correct == 0}
                <button class="check-ans-btn" on:click={(e) => checkAnswer()}>
                    Check Answer
                </button>
            {/if}
            <div class="flex w-full justify-center items-center flex-col">
                {#if correct == 1}
                <div class="w-11/12 bg-green-500 rounded-lg text-gray-100">
                    <p class="p-4 font-semibold">That's the correct answer! Good job</p>
                </div>
                <button class="check-ans-btn mr-2 mt-2" on:click={(e) => getNewQuestion()}>
                    Next Question
                </button>
                {/if}
                {#if correct == 2}
                    <div class="w-11/12 bg-red-500 rounded-lg text-gray-100">
                        <p class="p-4 pb-1 font-semibold">That's not the right answer. The correct answer is:</p>
                        <p class="p-4 pt-0">{currentQuestion.answers[currentQuestion.answer]}</p>
                    </div>
                    {#if $quickQuiz.currentQuestion == $quickQuiz.questionCount}
                        <button class="check-ans-btn mr-2 mt-2">
                            <a href="/diagnostics.html">Finish Quiz</a>
                        </button>
                    {:else}
                        <button class="check-ans-btn mr-2 mt-2" on:click={(e) => getNewQuestion()}>
                            Next Question
                        </button>
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
</div>