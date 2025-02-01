<script lang="ts">
    import MenuButton from '../components/meunubtn.svelte';
    import { Heading, Card } from 'flowbite-svelte';

    import '../app.css'
    import { onMount } from 'svelte';
	import SEO from '../components/SEO.svelte';

    onMount(() => {
        localStorage.clear();
    });
</script>

<Heading tag="h2" customSize="text-4xl font-extrabold text-center py-6">AP World History Study Tools</Heading>

<div class="flex justify-center gap-3">
    <MenuButton title="Quick Quiz" go="quick-quiz.html" backgroundImage="./assets/btn-bg/main-menu/quiz.webp"/>
    <!-- <MenuButton title="Flashcards" go="flashcards.html" backgroundImage="./assets/btn-bg/main-menu/flashcards.avif"/> -->
</div>

<SEO title="AP World History Study Tools" description="Collection of tools for students to learn more about AP World History topics. You can build it yourself or go to the website."/>