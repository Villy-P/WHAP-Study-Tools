<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { questions } from '../../data/questions.json';
    import '../../app.css'

    const options = [
        {
            id: "mcq",
            name: "Multiple Choice Questions",
        }, {
            id: "order-items",
            name: "Timeline Ordering"
        }, {
            id: "allow-images",
            name: "Allow Questions with Images"
        }
    ];

    let questionCount: number = getQuestionTypeOfUnit($quickQuiz.currentUnit) / 2;
    let minutes: number = 20;

    function startQuiz() {
        $quickQuiz.timeRemaining = minutes * 60;
        $quickQuiz.questionCount = questionCount;
    }

    function getQuestionTypeOfUnit(unit: number): number {
        return questions.filter((e) => {
            return e.unit == unit
        }).length;
    }
</script>

<div class="w-full h-screen flex justify-center items-center flex-col gap-1">
    <div>
        <h1 class="text-xl">Options:</h1>
        {#each options as option}
            <div>            
                <input type="checkbox" id={option.id}/>
                <label for={option.id}>{option.name}</label><br>
            </div>
        {/each}
        <div>
            <input type="range" min="1" max={getQuestionTypeOfUnit($quickQuiz.currentUnit)} id="questions" bind:value={questionCount}/>
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