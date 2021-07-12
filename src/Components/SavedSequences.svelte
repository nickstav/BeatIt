<script>
    import { localStorage } from '../JS/main.js';
    import { sequencerOptions } from '../Store/store.js';
    import { loadSequence, deleteSequence } from '../JS/saveLoad.js';
</script>

<div id="savedSequences" class="w-36 h-40 flex flex-col justify-start items-center bg-gray-600 border border-gray-700 rounded-lg select-none">

    <h2 class="font-bold text-white py-2">saved sequences</h2> 

    <div id="sequenceList" class="w-32 flex flex-1 flex-col mb-2 bg-gray-200 rounded-md overflow-auto">

        {#each Object.keys(localStorage) as sequenceName}
            <div class="p-1 border-b border-gray-900 cursor-pointer {$sequencerOptions.selectedSavedSequence === sequenceName ? "bg-blue-500" : ""}" on:click={()=> {sequencerOptions.toggleSelectedSavedSequence(sequenceName)}}>
                {sequenceName}
            </div>
        {/each}

    </div>

    <div id="savedSequencesButtons" class="w-12 h-8 flex flex-row justify-between">

        <button id="openSequence" title="Open Sequence" style="outline: none" class=" text-white w-6 h-6 disabled:opacity-30" on:click={loadSequence} disabled={$sequencerOptions.selectedSavedSequence === null}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
        </button>
        
        <button id="deleteSequence" title="Delete Sequence" style="outline: none" class=" text-white w-6 h-6 disabled:opacity-30" on:click={deleteSequence} disabled={$sequencerOptions.selectedSavedSequence === null}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>

    </div>

</div>