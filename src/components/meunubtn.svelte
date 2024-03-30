<script lang="ts">
    export let title: string;
    export let go: string;
    export let backgroundImage: string;
</script>

<button class="w-40 h-40 border-2 border-black rounded-2xl bg-cover" style="background-image: url({backgroundImage});">
    <a href={go} class="w-full h-full flex items-center justify-center text-white">{title}</a>
</button>