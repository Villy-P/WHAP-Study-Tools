<script lang="ts">
  import { AccordionItem, Badge, Button, Heading, P } from "flowbite-svelte";
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

<AccordionItem>
    <span slot="header">#{ unit } --- Unit { item.unit }.{ item.subunit }</span>
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
        </div>
    </div>
</AccordionItem>