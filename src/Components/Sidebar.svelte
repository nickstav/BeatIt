<script>
    import SavedSequences from './SavedSequences.svelte'
    import Settings from './Settings.svelte'
</script>

<aside class="w-48 h-full text-xs flex flex-col">

    <div id="optionsContainer" class="w-full h-full flex flex-col justify-start items-center">

        <Settings/>

        <SavedSequences/>

    </div>
    
</aside>