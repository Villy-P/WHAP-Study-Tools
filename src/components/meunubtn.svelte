<script lang="ts">
    import { quickQuiz } from "$lib/stores/QuickQuizStore";
    import { Button, Card } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";

    interface Props {
        title: string;
        go: string;
        backgroundImage: string;
    }

    let { title, go, backgroundImage }: Props = $props();
</script>

<Card img={backgroundImage} horizontal size="md" class="w-fit">
    <h5 class="capitalize mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <Button on:click={() => {$quickQuiz.currentTopic = title; $quickQuiz.byUnit = false}}>
      <a class="flex" href={go}>Start <ArrowRightOutline class="w-6 h-6 ms-2 text-white" /></a>
    </Button>
</Card>