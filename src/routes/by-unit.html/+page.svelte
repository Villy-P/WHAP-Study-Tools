<script lang="ts">
	import CollapsableButton from './../../components/collapsablebtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import { units } from '../../data/units';

    import '../../app.css'
</script>

<BackButton/>
<h1 class="font-bold text-3xl text-center py-6">By Unit</h1>
{#each units as unit, i}
    <CollapsableButton title={`Unit ${i + 1} - ${unit.name}`} desc={unit.desc} go="/start-quiz.html" backgroundImage=""/>
{/each}
