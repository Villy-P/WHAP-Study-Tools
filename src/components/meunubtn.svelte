<script lang="ts">
    export let title: string;
    export let go: string;
    export let backgroundImage: string;
</script>

<button class="w-full border-t-2 border-b-2 border-black h-fit" style="background-image: {backgroundImage};">
    <a href={go} class="w-full h-full text-center mt-5 mb-5 block">{title}</a>
</button>