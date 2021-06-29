<script>
    import { stepSequencer } from '../JS/main.js'
</script>

<div id="audioControls" class="w-full h-14 flex flex-row justify-center items-center select-none">
    
    {#if !$stepSequencer.playbackInProgress()}
        <button id="play" title="Play" style="outline: none" class="w-12 h-12 text-white" on:click={() => {stepSequencer.playSequence()}}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    {:else}
        <button id="pause" title="Pause" style="outline: none" class="w-12 h-12 text-white" on:click={() => {stepSequencer.pausePlayback()}}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    {/if}

    <button id="stop" title="Stop" style="outline: none" class="w-12 h-12 text-white" on:click={() => {stepSequencer.stopPlayback()}}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
    </button>

    <button id="loop" title="Loop Playback" style="outline: none" class="w-12 h-12" on:click={() => {stepSequencer.toggleLooping()}}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-white {$stepSequencer.intervalTimer.loopPlayback ? "text-red-500" : ""}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    </button>

    <button id="delete" title="Clear Sequence" style="outline: none" class=" text-white w-9 h-9" on:click={() => {stepSequencer.clearSequence()}}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    </button>

</div>