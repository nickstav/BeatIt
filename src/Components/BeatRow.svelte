<script>
    import { instruments } from '../JS/instruments.js'
    import { sequencerOptions } from '../Store/store.js'
    import { beatsArray } from '../Store/store.js'
    import { stepSequencer } from '../JS/main.js'

    export let label, img, instrument
</script>

<style>
	.selected {
		background-color: #ff3e00;
		color: white;
	}
</style>

<div 
id="beatRow" 
class="flex flex-row w-full h-10 justify-start items-center px-2 rounded-md {$sequencerOptions.selectedTrack === instruments[instrument]['label'] ? "bg-gray-600" : ""} { stepSequencer.trackMuted[instrument] ? "opacity-30" : ""}"
>

    <div 
    id="soundIcon" 
    title={label}
    class="h-8 w-8 flex items-center justify-center bg-white rounded-lg cursor-pointer"
    on:click={() => {sequencerOptions.toggleTrackSelection(instrument)}}
    >
        <img src={img} alt="Snare Drum" class="h-6 w-6">
    </div>
    
    {#each $beatsArray as i}
		<div 
        id="beat" 
        class=" ml-2 w-6 h-6 rounded-lg bg-red-300 border border-red-400 text-xs flex items-center justify-center cursor-pointer {(i + 1) % 4 === 1 ? "bg-red-400 border border-red-500" : ""} {$stepSequencer.displayActiveUI(instrument, i) ? "bg-red-600 border border-red-600" : ""}"
        on:click={() => {stepSequencer.toggleAudio(instrument, i)}}
        >
        </div>
	{/each}

</div>
