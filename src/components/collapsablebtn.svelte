<script lang="ts">
    export let title: string;
    export let desc: string;
    export let go: string;
    export let backgroundImage: string;

    let collapsed: HTMLDivElement;

    function collapse() {
        if (collapsed.style.maxHeight == "0px" || collapsed.style.maxHeight == "")
            collapsed.style.maxHeight = collapsed.scrollHeight + "px";
        else
            collapsed.style.maxHeight = "0px";
    }
</script>

<button class="w-full border-t-2 border-b-2 border-black h-fit" style="background-image: {backgroundImage};" on:click={() => collapse()}>
    <div class="w-full h-full text-center mt-5 mb-5 block">{title}</div>
</button>
<div class="w-full overflow-hidden max-h-0 transition-all" bind:this={collapsed}>
    <p class="px-5 py-4">{desc}</p>
    <button class="float-right mr-4 bg-sky-500 px-3 py-1 rounded-xl mb-4">
        <a class="w-full h-full" href={go}>Begin Test</a>
    </button>
</div>