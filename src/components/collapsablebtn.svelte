<script lang="ts">
    import { quickQuiz } from '$lib/stores/QuickQuizStore';
    import { Button, Card } from 'flowbite-svelte';
    import { ArrowRightOutline } from "flowbite-svelte-icons";

    export let title: string;
    export let desc: string;
    export let go: string;
    export let backgroundImage: string;
    export let unit: number;
    export let count: number;
</script>

<Card img={backgroundImage} horizontal size="md">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ title }</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{ desc } ({count} Questions)</p>
    <Button color="light" on:click={() => {$quickQuiz.currentUnit = unit; $quickQuiz.byUnit = true}}>
        <a class="flex" href={go}>Begin Quiz <ArrowRightOutline class="w-6 h-6 ms-2 text-white"/></a>
    </Button>
</Card>