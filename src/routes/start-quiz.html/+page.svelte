<script lang="ts">
    import '../../app.css'

    const options = [
        {
            id: "mcq",
            name: "Multiple Choice Questions",
        }, {
            id: "order-items",
            name: "Timeline Ordering"
        }, {
            id: "allow-images",
            name: "Allow Questions with Images"
        }
    ]
</script>

<div class="w-96">
    <h1 class="text-xl">Options:</h1>
    {#each options as option}
        <input type="checkbox" id={option.id}/>
        <label for={option.id}>{option.name}</label><br>
    {/each}
</div>