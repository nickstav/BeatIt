<script>
    import { playSample, nudgeTrack } from '../JS/track.js';
    import { sequencerOptions } from '../Store/store.js';
    import { stepSequencer } from '../JS/main.js';
    import { instruments } from '../JS/instruments.js'
    
    let trackActive;

    // Create a bool to disable track option buttons if not track is selected
    $: if ($sequencerOptions.selectedTrack === null) {
            trackActive = false;
    } else {
            trackActive = true;
    }

    // Return a boolean stating whether only one track is unmuted
    $: trackSoloing = (Object.values($stepSequencer.trackMuted).filter(bool => bool === false).length === 1? true : false)

</script>

<div id="trackOptions" class="w-72 h-16 flex flex-col items-center bg-gray-600 border border-gray-700 rounded-lg select-none {$sequencerOptions.selectedTrack === null ? "opacity-25" : ""}">
   
    <h2 class="font-bold text-white text-xs pt-1 pb-2">track options</h2>

    <div id="buttonsContainer" class="flex flex-1 w-full flex-row justify-around">

        <div id="playButton" class="px-2">

            <button id="playTrack" title="Play Sample" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6" on:click={() => {playSample($sequencerOptions.selectedTrack)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

        </div>

        <div id="nudgeButtons" class="px-2">

            <button id="nudgeLeft" title="Nudge Left" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6" on:click={() => {nudgeTrack('left')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
            </button>

            <button id="nudgeRight" title="Nudge Right" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6" on:click={() => {nudgeTrack('right')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>

        </div>

        <div id="muteSoloButtons" class="px-2">

            <button id="solo" title="Solo Track" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6 {trackSoloing && !$stepSequencer.trackMuted[$sequencerOptions.trackKey] ? "text-red-500" : ""}" on:click={stepSequencer.toggleSoloing}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            </button>

            <button id="mute" title="Mute Track" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6 {$stepSequencer.trackMuted[$sequencerOptions.trackKey] ? "text-red-500" : ""}" on:click={stepSequencer.toggleMuting}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            </button>

        </div>

        <div id="velocityButton" class="px-2">

            <button id="velocity" title="Velocity (high volume)" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6 {$stepSequencer.highVolume[$sequencerOptions.trackKey] ? "text-red-500" : ""}" on:click={stepSequencer.toggleVelocity}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current">
                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
                </svg>
            </button>

        </div>

        <div id="clearButton" class="px-2">

            <button id="clear" title="Clear Track" disabled={!trackActive} style="outline: none" class=" text-white w-6 h-6" on:click={stepSequencer.clearTrack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

        </div>

    </div>

</div>