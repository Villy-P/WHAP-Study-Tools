<script lang="ts">
    import { onMount } from "svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    onMount(() => {
        document.body.classList.add("bg-[#111827]", "dark")
    });
</script>

{@render children?.()}