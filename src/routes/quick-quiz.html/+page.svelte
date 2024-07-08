<script lang="ts">
    import MenuButton from '../../components/meunubtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import '../../app.css'
    import { onMount } from 'svelte';
    import { Heading } from 'flowbite-svelte';

    onMount(() => {
        localStorage.clear();
    });
</script>

<BackButton/>
<Heading tag="h2" customSize="text-4xl font-extrabold text-center py-6">Quick Quizzes</Heading>
<div class="flex justify-center gap-3">
    <MenuButton title="By Unit"  go="by-unit.html"  backgroundImage="./assets/btn-bg/quick-quiz/byunit.jpg"/>
    <MenuButton title="By Topic" go="by-topic.html" backgroundImage="./assets/btn-bg/quick-quiz/bytopic.jpg"/>
    <!-- <MenuButton title="Custom"   go="custom.html"   backgroundImage="./assets/btn-bg/quick-quiz/custom.jpg"/> -->
</div>