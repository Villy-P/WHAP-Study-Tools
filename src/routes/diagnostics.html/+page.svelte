<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { formatTime } from '../../utilities/time';
    import '../../app.css'
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto'
    import { getSubUnitsFromUnit } from '../../utilities/unit';
    import Diagnostic from '../../components/diagnostic.svelte';

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
    <div class="w-11/12 rounded-lg border-2 border-gray-900 h-fit flex-col p-5 justify-center items-center">
        <div class="flex gap-10 justify-center text-center flex-wrap pb-4">
            <div>Unit {$quickQuiz.currentUnit} Quick Quiz</div>
            <div>{$quickQuiz.questionCount} Questions</div>
        </div>
        <div class="flex gap-10 justify-center text-center flex-wrap pb-4">
            <div>You took {formatTime($quickQuiz.totalTime - $quickQuiz.timeRemaining)}s</div>
            <div>{$quickQuiz.right.length} right</div>
            <div>{$quickQuiz.wrong.length} wrong</div>
            <div>{$quickQuiz.questionCount - $quickQuiz.wrong.length - $quickQuiz.right.length} unfinished</div>
        </div>
        <div class="flex justify-center text-center text-2xl">{getAccuracy()}% Accuracy</div>
    </div>
    <button class="bg-sky-500 px-3 py-1 rounded-xl my-4">
        <a class="w-full h-full" href="/">Go to Home</a>
    </button>
    <div class="text-3xl py-4">Diagnostics</div>
    <div class="flex flex-col w-11/12">
        {#if $quickQuiz.right.length > 0}
            <p class="text-lg font-medium">Answered Correctly:</p>
            {#each $quickQuiz.right as item, index}
                <Diagnostic unit={index + 1} item={item}/>
             {/each}
        {/if}
    
        {#if $quickQuiz.wrong.length > 0}
            <p class="text-lg font-medium">Answered Incorrectly:</p>
            {#each $quickQuiz.wrong as item, index}
                <Diagnostic unit={index + 1} item={item}/>
             {/each}
        {/if}
        <br>
    </div>
</div>