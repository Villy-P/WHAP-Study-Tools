<script lang="ts">
    import { AccordionItem, Badge, Button, Heading, P } from "flowbite-svelte";
        import type { Question } from "../data/types";

    interface Props {
        unit: number;
        item: Question;
    }

    let { unit, item }: Props = $props();

    let collapsed: HTMLDivElement | undefined = $state(undefined);
</script>

<AccordionItem>
    {#snippet header()}
        <span >#{ unit } --- Unit { item.unit }.{ item.subunit }</span>
    {/snippet}
    <div class="h-fit overflow-hidden w-full flex" bind:this={collapsed}>
        <div class="w-1/2 flex flex-col border-r-2 border-gray-500">
            <Heading tag="h6">Question:</Heading>
            <P tag="h6">{item.question}</P>
            {#if item.passage}
                <P class="mb-3 md:text-xl" weight="light" size="lg" color="text-gray-500 dark:text-gray-400">{item.passage_header}</P>
                <P weight="light" color="text-gray-500 dark:text-gray-400">{item.passage}</P>
            {/if}
            {#if item.image_link}
                <div class="flex-grow overflow-auto flex">
                    <img class="w-96" alt="data" src={item.image_link}/>
                </div>
            {/if}
            <Heading tag="h6">Topics:</Heading>
            <div class="flex flex-wrap gap-2 p-2">
                {#each item.topics as topic}
                    <Badge color="dark">{topic}</Badge>
                {/each}
            </div>
        </div>
        <div class="w-1/2">
            <Heading tag="h6" class="p-4">Answer Choices:</Heading>
            <div class="w-full flex flex-col gap-2 p-2">
                {#each item.answers as answer, index}
                    <Button color="dark">{answer}</Button>
                {/each}
            </div>
            <Heading tag="h6" class="p-4">Correct Answer:</Heading>
            <div class="w-full flex flex-col gap-2 p-2">
                <Button color="dark">{item.answers[item.answer]}</Button>
            </div>
            <div class="w-full flex flex-col gap-2 p-2">
                <p>Explanation: {item.explanation}</p>
            </div>
        </div>
    </div>
</AccordionItem>