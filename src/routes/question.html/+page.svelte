<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { onMount } from 'svelte';
    import { formatTime } from '../../utilities/time';
    import { questions } from '../../data/questions';
    import type { Question } from '../../data/types';
    import '../../app.css'
    import { shuffleArray } from '../../utilities/random';
    import { writable } from 'svelte/store';
    import { Button, Heading, P } from 'flowbite-svelte';

    onMount(() => {
        const s = getStore();
        interval = setInterval(() => {
            $quickQuiz.timeRemaining--;
        }, 1000);
        if (s)
            return;
        shuffleArray(validQuestions);
        getNewQuestion();
    });

    let questionWrapper: HTMLDivElement | undefined = $state(undefined);
    let selectedAnswer = $state(-1);
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
        if (answer == null || !questionWrapper)
            return;
        for (const question of questionWrapper.children)
            question.classList.remove("bg-slate-200");
        const div = answer as HTMLDivElement;
        div.classList.add("bg-slate-200");
        selectedAnswer = index;
    }

    let currentQuestion: Question | undefined = $state(undefined);
    let correct = $state(0);
    let interval = $state(0);

    function getNewQuestion() {            
        currentQuestion = validQuestions.shift() as Question;
        if (($quickQuiz.byUnit && (currentQuestion.unit != $quickQuiz.currentUnit)) || (!$quickQuiz.byUnit && !currentQuestion.topics.includes($quickQuiz.currentTopic))) {
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
        if (!currentQuestion)
            return;
        correct = currentQuestion?.answer == selectedAnswer ? 1 : 2;
        if (correct == 1) 
            $quickQuiz.right.push(currentQuestion);
        else
            $quickQuiz.wrong.push(currentQuestion);
        saveStore($quickQuiz);
    }
</script>

<div class="flex w-full border-b-2 border-gray-600 h-12 items-center">
    <Button href='/' color="blue" on:click={() => clearInterval(interval)}>Exit</Button>
    <div class="flex ml-auto gap-3">
        <Heading tag="h6">{$quickQuiz.currentQuestion} / {$quickQuiz.questionCount}</Heading>
        <Heading tag="h6" class="pr-4">{formatTime($quickQuiz.timeRemaining)}</Heading>
    </div>
</div>
<div class="w-full flex items-center flex-col gap-1 pt-10 pb-5">
    <div class="w-8/12 flex flex-col gap-3">
        {#if currentQuestion}
            <Heading tag="h4">{currentQuestion.question}</Heading>
            {#if currentQuestion.passage}
                <P class="mb-3 md:text-xl" weight="light" size="lg" color="text-gray-500 dark:text-gray-400">{currentQuestion.passage_header}</P>
                <P weight="light" color="text-gray-500 dark:text-gray-400">{currentQuestion.passage}</P>
            {/if}
            {#if currentQuestion.image_link}
                <div class="flex-grow overflow-auto flex">
                    <img class="w-96" alt="data" src={currentQuestion.image_link}/>
                </div>
            {/if}
            <div class="w-full flex flex-col gap-2" bind:this={questionWrapper}>
                {#each currentQuestion.answers as answer, index}
                    <Button color="dark" on:click={(e) => clickAnswer(e.target, index)}>{answer}</Button>
                {/each}
            </div>
            {#if selectedAnswer != -1 && correct == 0}
                <Button on:click={(e) => checkAnswer()} color="blue">Check Answer</Button>
            {/if}
            <div class="flex w-full justify-center items-center flex-col">
                {#if correct == 1}
                <div class="w-11/12 bg-green-500 rounded-lg text-gray-100">
                    <p class="p-4 font-semibold">That's the correct answer! Good job</p>
                </div>
                <Button on:click={(e) => getNewQuestion()} color="blue">Next Question</Button>
                {/if}
                {#if correct == 2}
                    <div class="w-11/12 bg-red-500 rounded-lg text-gray-100">
                        <p class="p-4 pb-1 font-semibold">That's not the right answer. The correct answer is:</p>
                        <p class="p-4 pt-0">{currentQuestion.answers[currentQuestion.answer]}</p>
                        <p class="p-4 pt-1">Explanation: {currentQuestion.explanation}</p>
                    </div>
                    {#if $quickQuiz.currentQuestion == $quickQuiz.questionCount}
                        <Button href="/diagnostics.html" color="blue" class="float-right mt-4">Finish Quiz</Button>
                    {:else}
                        <Button on:click={(e) => getNewQuestion()} color="blue" class="float-right mt-4">Next Question</Button>
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
</div>