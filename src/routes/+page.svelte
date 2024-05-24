<script lang="ts">
    import MenuButton from '../components/meunubtn.svelte';

    import '../app.css'
    import { onMount } from 'svelte';

    onMount(() => {
        localStorage.clear();
    });
</script>

<h1 class="font-bold text-3xl text-center py-6">AP World History Study Tools</h1>

<div class="flex justify-center gap-3">
    <MenuButton title="Quick Quiz" go="quick-quiz.html" backgroundImage="./assets/btn-bg/main-menu/quiz.webp"/>
    <!-- <MenuButton title="Flashcards" go="flashcards.html" backgroundImage="./assets/btn-bg/main-menu/flashcards.avif"/> -->
</div>