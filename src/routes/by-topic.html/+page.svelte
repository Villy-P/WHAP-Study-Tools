<script lang="ts">
	import MenuButton from './../../components/meunubtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import { topics } from '../../data/topics.json';

    import '../../app.css'
    import { onMount } from 'svelte';
    import { quickQuiz } from '$lib/stores/QuickQuizStore';

    onMount(() => {
        localStorage.clear();
    });
</script>

<BackButton/>
<h1 class="font-bold text-3xl text-center py-6">By Topic</h1>
<div class="flex gap-3 justify-center flex-wrap pb-5">
    {#each topics as topic, i}
        <MenuButton title={topic.name.replaceAll("-", " ")} go="start-quiz.html" backgroundImage={topic.image}/>
    {/each}
</div>
