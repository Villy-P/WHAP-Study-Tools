<script lang="ts">
	import MenuButton from './../../components/meunubtn.svelte';
    import BackButton from '../../components/backbtn.svelte';
    import { Heading } from 'flowbite-svelte';

    import { topics } from '../../data/topics.json';

    import '../../app.css'
    import { onMount } from 'svelte';
    import { quickQuiz } from '$lib/stores/QuickQuizStore';

    import SEO from '../../components/SEO.svelte';

    onMount(() => {
        localStorage.clear();
    });
</script>

<BackButton/>
<Heading tag="h2" customSize="text-4xl font-extrabold text-center py-6">By Topic</Heading>
<div class="flex gap-3 justify-center flex-wrap pb-5">
    {#each topics as topic, i}
        <MenuButton title={topic.name.replaceAll("-", " ")} go="start-quiz.html" backgroundImage={topic.image}/>
    {/each}
</div>

<SEO title="By Topic" description="Take a quiz by topic. You can choose from the list of topics and take a quiz on the selected topic."/>
