<script>
    import { savedSequences } from '../Store/savedSequences.js';
</script>

<div id="savedSequences" class="w-36 h-32 flex flex-col justify-start items-center bg-gray-600 border border-gray-700 rounded-lg select-none">

    <h2 class="font-bold text-white py-2">saved sequences</h2> 

    <div id="sequenceList" class="w-32 flex flex-1 flex-col mb-2 bg-gray-200 rounded-md">

        {#each $savedSequences as sequence}
            <div>{sequence['sequenceName']}</div>
        {/each}

    </div>

</div>