<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { formatTime } from '../../utilities/time';
    import '../../app.css'
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto'
    import { getSubUnitsFromUnit } from '../../utilities/unit';

    let byunit: HTMLCanvasElement;

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

    onMount(() => {
        const subunits = getSubUnitsFromUnit($quickQuiz.currentUnit);
        new Chart(byunit, {
            type: "bar",
            data: {
                labels: [Array.from({ length: subunits }, (_, i) => (i + 1).toString())],
                datasets: [
                    {
                        label: "Questions Correct by Subunit",
                        data: [Array.from({ length: subunits }, (_, i) => getSubUnitCorrect(i).length)],
                        borderWidth: 1
                    }, {
                        label: "Questions Wrong by Subunit",
                        data: [Array.from({ length: subunits }, (_, i) => getSubUnitWrong(i)).length],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
</script>

<div class="w-full flex items-center flex-col gap-1 pt-10 pb-5 justify-center">
    <div class="w-11/12 rounded-lg border-2 border-gray-900 h-fit flex-col p-5 justify-center items-center">
        <div class="flex gap-10 justify-center text-center flex-wrap pb-4">
            <div>Unit {$quickQuiz.currentUnit} Quick Quiz</div>
            <div>{$quickQuiz.questionCount} Questions</div>
        </div>
        <div class="flex gap-10 justify-center text-center flex-wrap pb-4">
            <div>You took {formatTime($quickQuiz.totalTime - $quickQuiz.timeRemaining)}</div>
            <div>{$quickQuiz.right.length} right</div>
            <div>{$quickQuiz.wrong.length} wrong</div>
            <div>{$quickQuiz.questionCount - $quickQuiz.wrong.length - $quickQuiz.right.length} unfinished</div>
        </div>
        <div class="flex justify-center text-center text-2xl">{getAccuracy()}% Accuracy</div>
    </div>
    <div class="text-3xl py-4">Diagnostics</div>
    <canvas class="w-1/2" bind:this={byunit}/>
</div>