<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        document.body.classList.add("bg-[#111827]", "dark")
    });
</script>

<slot/>