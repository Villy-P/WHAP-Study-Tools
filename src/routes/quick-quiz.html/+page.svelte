<script lang="ts">
    import MenuButton from '../../components/meunubtn.svelte';
    import BackButton from '../../components/backbtn.svelte';

    import '../../app.css'
</script>

<BackButton/>
<h1 class="font-bold text-3xl text-center py-6">Quick Quizzes</h1>
<MenuButton title="By Unit" go="by-unit.html" backgroundImage=""/>
<MenuButton title="By Topic" go="by-topic.html" backgroundImage=""/>