<script lang="ts">
    import type { Question } from "../data/types";

    export let unit: number;
    export let item: Question;

    let collapsed: HTMLDivElement;

    function collapse() {
        if (collapsed.style.width == "0px" || collapsed.style.width == "") {
            collapsed.style.width = "100%";
            collapsed.style.display = "flex";
            collapsed.style.transition = "transition: width 2s";
        } else {
            collapsed.style.width = "0px";
            collapsed.style.display = "none";
        }
    }
</script>

<button class="flex border-2 border-black p-4 cursor-pointer" on:click={() => collapse()}>
    <div>#{ unit } --- Unit { item.unit }.{ item.subunit }</div>
</button>
<div class="h-fit overflow-hidden w-0 hidden border-x-2 border-black border-b-2" bind:this={collapsed}>
    <div class="w-1/2 flex flex-col border-r-2 border-black">
        <p class="font-medium p-2">Question:</p>
        <div class="w-full p-2 font-semibold">{item.question}</div>
        {#if item.passage}
            <div class="w-full p-2 pb-0">{item.passage_header}</div>
            <div class="w-full p-2 pt-0">{item.passage}</div>
        {/if}
        {#if item.image_link}
            <div class="flex-grow overflow-auto flex">
                <img class="w-96" alt="data" src={item.image_link}/>
            </div>
        {/if}
        <p class="font-medium p-2">Topics:</p>
        <div class="flex flex-wrap gap-2 p-2">
            {#each item.topics as topic}
                <p class="bg-slate-300 rounded-lg p-2">{ topic }</p>
            {/each}
        </div>
    </div>
    <div class="w-1/2">
        <p class="font-medium p-4">Answer Choices:</p>
        <div class="w-full flex flex-col gap-2 p-2">
            {#each item.answers as answer, index}
                <button class="question-response">{answer}</button>
            {/each}
        </div>
        <p class="font-medium p-4">Correct Answer:</p>
        <div class="w-full flex flex-col gap-2 p-2">
            <button class="question-response">{item.answers[item.answer]}</button>
        </div>
    </div>
</div>