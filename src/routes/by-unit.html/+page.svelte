<script lang="ts">
	import CollapsableButton from './../../components/collapsablebtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import { units } from '../../data/units.json';

    import '../../app.css'
    import { questions } from '../../data/questions';
    import { onMount } from 'svelte';

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
<h1 class="font-bold text-3xl text-center py-6">By Unit</h1>
<div class="flex gap-3 justify-center flex-wrap pb-5">
    {#each units as unit, i}
        <CollapsableButton title={`Unit ${i + 1} - ${unit.name}`} desc={unit.desc} go="/start-quiz.html" backgroundImage={unit.bgpath} unit={i + 1} count={getQuestionTypeOfUnit(i + 1)}/>
    {/each}
</div>
