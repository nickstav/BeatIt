<script>
    import BeatRow from './BeatRow.svelte'
    import { stepSequencer } from '../JS/main.js'
    import { beatsArray } from '../Store/store.js'
    import { instruments } from '../JS/instruments.js'
</script>

<div id="grid" class="px-8 w-5/6 h-3/4 flex flex-1 flex-col justify-start items-start align-middle overflow-x-auto">

    <div id="scrollableContainer" class="mx-auto">
    <div id="numbersRow" class="flex flex-row w-full h-8 justify-start items-center select-none">

        <div id="indent" class="h-8 w-8 flex items-center justify-center"></div>
    
        {#each $beatsArray as i}
		    <div id="number" class="ml-2 w-6 h-6 text-xs text-white flex items-center justify-center {$stepSequencer.intervalTimer.currentStepNumber === i ? "bg-red-500 rounded-2xl" : ""}">
                {i + 1}
            </div>
	    {/each}

    </div>

    {#each Object.entries(instruments) as [instrument, info]}
        <BeatRow label={info['label']} img={info['iconSrc']} instrument={instrument}/>
    {/each}

    </div>
</div>