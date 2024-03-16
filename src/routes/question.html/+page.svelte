<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { onMount } from 'svelte';
    import '../../app.css'

    function formatTime(duration: number) {
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
        let ret = "";
        if (hrs > 0)
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    onMount(() => {
        setInterval(() => {
            $quickQuiz.timeRemaining--;
        }, 1000)
    });

    let questionWrapper: HTMLDivElement;

    function clickAnswer(answer: EventTarget | null) {
        if (answer == null)
            return;
        for (const question of questionWrapper.children)
            question.classList.remove("bg-slate-200");
        const div = answer as HTMLDivElement;
        div.classList.add("bg-slate-200");
    }
</script>

<div class="flex w-full border-b-2 border-gray-600 h-12 items-center">
    <button class="flex justify-center items-center h-3/4 mx-3 hover:bg-slate-100 p-2 rounded-lg text-sm text-blue-500 font-medium">
        <a href="/">Exit</a>
    </button>
    <p class="text-sm font-semibold ml-auto">12 / 30</p>
    <p class="text-sm font-semibold mx-3">{formatTime($quickQuiz.timeRemaining)}</p>
</div>
<div class="w-full flex items-center flex-col gap-1 pt-10">
    <div class="w-8/12 flex flex-col gap-3">
        <div class="w-full p-2">Musa I (also known as Mansa Musa) made a notable pilgrimage to Mecca and worked to spread Islam throughout his reign. This is an example of which of the following?</div>
        <div class="flex-grow overflow-auto flex">
            <img class="w-96" alt="data" src="https://wpapp.kaptest.com/study/wp-content/uploads/West_African_Trade_Routes___APWHM.png"/>
        </div>
        <div class="w-full flex flex-col gap-2" bind:this={questionWrapper}>
            <button class="question-response" on:click={(e) => clickAnswer(e.target)}>Forced conversion of conquered populations</button>
            <button class="question-response" on:click={(e) => clickAnswer(e.target)}>The spread of Islam facilitating trade relationships</button>
            <button class="question-response" on:click={(e) => clickAnswer(e.target)}>Religious conflict between native African religions</button>
            <button class="question-response" on:click={(e) => clickAnswer(e.target)}>A sectarian split between Sunni and Shi’a in Africa</button>
        </div>
    </div>
</div>