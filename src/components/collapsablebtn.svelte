<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';

    export let title: string;
    export let desc: string;
    export let go: string;
    export let backgroundImage: string;
    export let unit: number;
    export let count: number;

    let collapsed: HTMLDivElement;

    function collapse() {
        if (collapsed.style.width == "0px" || collapsed.style.width == "") {
            collapsed.style.width = (window.innerWidth - 200) + "px";
            collapsed.style.display = "block";
            collapsed.style.transition = "transition: width 2s";
        } else {
            collapsed.style.width = "0px";
            collapsed.style.display = "none";
        }
    }
</script>

<div class="flex">
    <button class="w-40 h-40 border-2 border-black rounded-2xl bg-cover" style="background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url({backgroundImage}); " on:click={() => collapse()}>
        <div class="w-full h-full flex items-center justify-center text-white">{title}</div>
    </button>
    <div class="h-40 overflow-hidden w-0 hidden border-y-2 border-y-gray-500" bind:this={collapsed}>
        <p class="px-5 py-4">{desc} ({count} Questions)</p>
        <button class="float-right mr-4 bg-sky-500 px-3 py-1 rounded-xl mb-4" on:click={() => $quickQuiz.currentUnit = unit}>
            <a class="w-full h-full" href={go}>Begin Quiz</a>
        </button>
    </div>
</div>