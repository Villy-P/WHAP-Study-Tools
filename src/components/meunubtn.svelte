<script lang="ts">
    import { quickQuiz } from "$lib/stores/QuickQuizStore";
    import { Button, Card } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";

    export let title: string;
    export let go: string;
    export let backgroundImage: string;
</script>

<Card img={backgroundImage}>
    <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <Button on:click={() => {$quickQuiz.currentTopic = title; $quickQuiz.byUnit = false}}>
      <a class="flex" href={go}>Start <ArrowRightOutline class="w-6 h-6 ms-2 text-white" /></a>
    </Button>
</Card>
<!-- 
<button class="w-40 h-40 border-2 border-black rounded-2xl bg-cover" style="background-image: url({backgroundImage});" on:click={() => {$quickQuiz.currentTopic = title; $quickQuiz.byUnit = false}}>
    <a href={go} class="w-full h-full flex items-center justify-center text-white capitalize">{title}</a>
</button> -->