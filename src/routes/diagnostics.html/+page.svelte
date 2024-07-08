<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { formatTime } from '../../utilities/time';
    import '../../app.css'
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto'
    import { getSubUnitsFromUnit } from '../../utilities/unit';
    import Diagnostic from '../../components/diagnostic.svelte';
    import { Card, Button, Heading, Accordion } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

    function getAccuracy() {
        const right = $quickQuiz.right.length;
        return (right / $quickQuiz.questionCount * 100).toFixed(2);
    }

    function getSubUnitCorrect(subunit: number) {
        return $quickQuiz.right.filter((value) => {
            return value.subunit = subunit;
        });
    }

    function getSubUnitWrong(subunit: number) {
        return $quickQuiz.wrong.filter((value) => {
            return value.subunit = subunit;
        });
    }

    let subunitData = new Map<number, number>();

    function getSubUnits() {
        for (const item of $quickQuiz.right.concat($quickQuiz.wrong))
            subunitData.set(item.subunit, (subunitData.get(item.subunit) || 0) + 1);
    }

    onMount(() => {
        const store = localStorage.getItem("store");
        if (store)
            $quickQuiz = JSON.parse(store);
    });
</script>

<div class="w-full flex items-center flex-col gap-1 pt-10 pb-5 justify-center">
    <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Unit {$quickQuiz.currentUnit} Quick Quiz</h5>
        <h6 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{$quickQuiz.questionCount} Questions</h6>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">You took {formatTime($quickQuiz.totalTime - $quickQuiz.timeRemaining)}s</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{$quickQuiz.right.length} right</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{$quickQuiz.wrong.length} wrong</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{$quickQuiz.questionCount - $quickQuiz.right.length - $quickQuiz.wrong.length} unanswered</p>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{getAccuracy()}% Accuracy</p>
        <Button class="w-fit mt-3" color="blue">
            Go Home <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
        </Button>
    </Card>
    <Heading tag="h2" customSize="text-4xl font-extrabold" class="text-center pt-3">Diagnostics</Heading>
    <div class="flex flex-col w-11/12">
        {#if $quickQuiz.right.length > 0}
            <Heading tag="h4">Answered Correctly:</Heading>
            <Accordion>
                {#each $quickQuiz.right as item, index}
                    <Diagnostic unit={index + 1} item={item}/>
                 {/each}
            </Accordion>
        {/if}
    
        {#if $quickQuiz.wrong.length > 0}
        <Heading tag="h4">Answered Incorectly:</Heading>
            <Accordion>                
                {#each $quickQuiz.wrong as item, index}
                    <Diagnostic unit={index + 1} item={item}/>
                 {/each}
            </Accordion>
        {/if}
        <br>
    </div>
</div>