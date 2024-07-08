<script lang="ts">
    import { quickQuiz } from "$lib/stores/QuickQuizStore";
    import { Button, Card } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";

    export let title: string;
    export let go: string;
    export let backgroundImage: string;
</script>

<Card img={backgroundImage} href="/" horizontal size="md" class="w-fit">
    <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <Button on:click={() => {$quickQuiz.currentTopic = title; $quickQuiz.byUnit = false}}>
      <a class="flex" href={go}>Start <ArrowRightOutline class="w-6 h-6 ms-2 text-white" /></a>
    </Button>
</Card>