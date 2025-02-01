<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { questions } from '../../data/questions';
    import '../../app.css'
    import { onMount } from 'svelte';
    import { Button, Card, Label, Range } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import SEO from '../../components/SEO.svelte';

    const units = getQuestionTypeOfUnit($quickQuiz.currentUnit);
    const topics = getQuestionTypeOfTopic($quickQuiz.currentTopic);

    let questionCount: number = $state(Math.floor(
        $quickQuiz.byUnit
            ? units / 2
            : topics / 2));
    let minutes: number = $state(20);

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
    <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Options</h5>
        <Label class="py-3">Question Count ({questionCount})</Label>
        <Range id="default-range" size="md" min="1" max={$quickQuiz.byUnit ? units : topics} bind:value={questionCount}/>
        <Label class="py-3">{minutes === 200 ? "No Time Limit" : `${minutes} Minutes`}</Label>
        <Range id="default-range" size="md" min="1" max="200" bind:value={minutes}/>
        <Button class="w-fit mt-5" href="/question.html" on:click={() => startQuiz()}>
            Start <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
        </Button>
    </Card>
</div>

<SEO title="Start Quiz" description="Start a quiz with the options you choose --- Pick your question count and the time limit you wish to set for yourself."/>