<script>
    import { sequencerOptions } from '../Store/store'
    import { stepSequencer } from '../JS/main.js'
</script>

<style>
    input[type=range] {
        -webkit-appearance: none;
        width: 90%;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #EDF2F7;
        border-radius: 6px;
        border: 0px solid #010101;
    }
    input[type=range]::-webkit-slider-thumb {
        border: 1px solid #00001E;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        background: #FC8181;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -2.5px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #EDF2F7;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #EDF2F7;
        border-radius: 6px;
        border: 0px solid #010101;
    }
    input[type=range]::-moz-range-thumb {
        border: 1px solid #00001E;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        background: #FC8181;
        cursor: pointer;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #EDF2F7;
        border: 0px solid #010101;
        border-radius: 12px;
    }
    input[type=range]::-ms-fill-upper {
        background: #EDF2F7;
        border: 0px solid #010101;
        border-radius: 12px;
        box-shadow: 1px 1px 1px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        border: 1px solid #00001E;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        background: #FC8181;
    cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #EDF2F7;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #EDF2F7;
    }
</style>

<aside class="w-48 h-full text-xs flex flex-col">

    <div id="optionsContainer" class="w-full h-full flex flex-col justify-start items-center">

        <div id="bpmSettings" class="w-36 h-24 flex flex-col justify-center items-center bg-gray-600 border border-gray-700 rounded-lg select-none">

                <h2 class="font-bold text-white pb-2">bpm</h2>

                <input type="range" bind:value={$sequencerOptions.bpm} min="60" max="180" on:change={stepSequencer.updateBPM} disabled={$stepSequencer.intervalTimer.isPlaying} class="align-middle cursor-pointer disabled:opacity-50">
                
                <p class="text-white pt-2">{$sequencerOptions.bpm}</p>   

        </div>

        <hr class="h-8">

        <div id="numberOfBeats" class="w-36 h-24 flex flex-col justify-center items-center bg-gray-600 border border-gray-700 rounded-lg select-none">

            <h2 class="font-bold text-white pb-2">number of beats</h2>

            <label for="8" class="pb-1 text-left font-semibold text-white">
                <input type="radio" bind:group={$sequencerOptions.numberOfBeats} value={2} on:change={stepSequencer.updateSteps} disabled={$stepSequencer.intervalTimer.isPlaying} class="form-radio text-red-400 align-middle cursor-pointer disabled:opacity-50">
                2
            </label>

            <label for="16" class="pb-1 text-left font-semibold text-white">
                <input type="radio" bind:group={$sequencerOptions.numberOfBeats} value={4} on:change={stepSequencer.updateSteps} disabled={$stepSequencer.intervalTimer.isPlaying} class="form-radio text-red-400 align-middle cursor-pointer disabled:opacity-50">
                4
            </label>

            <label for="32" class="pb-1 text-left font-semibold text-white">
                <input type="radio" bind:group={$sequencerOptions.numberOfBeats} value={8} on:change={stepSequencer.updateSteps} disabled={$stepSequencer.intervalTimer.isPlaying} class="form-radio text-red-400 align-middle cursor-pointer disabled:opacity-50">
                8
            </label>

        </div>

        <hr class="h-8">

    </div>
    
</aside>