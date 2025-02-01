<script lang="ts">
	import CollapsableButton from './../../components/collapsablebtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import { units } from '../../data/units.json';

    import '../../app.css'
    import { questions } from '../../data/questions';
    import { onMount } from 'svelte';
    import { Heading } from 'flowbite-svelte';

    import SEO from '../../components/SEO.svelte';

    onMount(() => {
        localStorage.clear();
    });

    function getQuestionTypeOfUnit(unit: number) {
        return questions.filter((e) => {
            return e.unit == unit
        }).length;
    }
</script>

<BackButton/>
<Heading tag="h2" customSize="text-4xl font-extrabold text-center py-6">By Unit</Heading>
<div class="flex gap-3 justify-center flex-wrap pb-5">
    {#each units as unit, i}
        <CollapsableButton title={`Unit ${i + 1} - ${unit.name}`} desc={unit.desc} go="/start-quiz.html" backgroundImage={unit.bgpath} unit={i + 1} count={getQuestionTypeOfUnit(i + 1)}/>
    {/each}
</div>

<SEO title="By Unit" description="Take a quiz by unit. You can choose from the list of units and take a quiz on the selected unit."/>
