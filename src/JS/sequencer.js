import { get } from 'svelte/store';
import { sequencerOptions } from '../Store/store.js'
import { IntervalTimer } from './timer.js'
import { Step } from './step.js'
import { SvelteUpdatable } from './svelteUpdatable.js'

export class Sequencer extends SvelteUpdatable {
    constructor() {
        super()

        // Get number of beats and bpm from the store
        this.numberOfBeats = get(sequencerOptions).numberOfBeats;
        this.bpm = get(sequencerOptions).bpm;

        // Define the target interval between steps in ms
        this.tempo = 60000 / this.bpm;

        // Set up a timer to run the sequence
        this.intervalTimer = new IntervalTimer(this.bpm, this.numberOfBeats);

        // Create a step for each beat
        this.steps = [];
        for (let i = 0; i < this.numberOfBeats; i++) {
            this.steps.push(new Step(i + 1));
        }
    }

    // Toggle on/off whether audio is to be played for a given step
    toggleAudio = (instrument, stepNumber) => {
        this.steps[stepNumber - 1].toggleAudio(instrument);

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Toggle on/off looping of playback
    toggleLooping = () => {
        this.intervalTimer.loopPlayback = !this.intervalTimer.loopPlayback;

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    // Function to control whether the UI is to display "selected" colour or not
    displayActiveUI = (instrument, stepNumber) => {
        return this.steps[stepNumber - 1].playCommands[instrument];
    }

    // Function to tell UI whether playback is in progress or not
    playbackInProgress = () => {
        return this.intervalTimer.isPlaying;
    }

    // Update the BPM whenever the value is changed in the UI
    updateBPM = () => {
        this.bpm = get(sequencerOptions).bpm;
        this.intervalTimer.tempo = 60000 / this.bpm;
    }

    // Update the array of steps whenever number of beats is altered in the UI
    updateSteps = () => {

        const oldNumberOfBeats = this.numberOfBeats;

        // Get the new value
        this.numberOfBeats = get(sequencerOptions).numberOfBeats;
        this.intervalTimer.numberOfSteps = this.numberOfBeats;

        // Add or remove steps from the array as required
        if (oldNumberOfBeats > this.numberOfBeats) {

            for (let i = oldNumberOfBeats; i < this.numberOfBeats; i++) {
                this.steps.push(new Step(i + 1));
            }

        } else if (oldNumberOfBeats < this.numberOfBeats) {

            this.steps.splice(-1, (this.numberOfBeats - oldNumberOfBeats));
            
        }
    }

    // Play the beat for a given step number in the sequence
    playBeat = (stepNumber) => {
       this.steps[stepNumber - 1].playStep();

       // Manually call updateUI method to see changes reflected in the UI
       this.updateUI();
    }

    // Play the entire sequence of steps
    playSequence = () => {  
        this.intervalTimer.runSteps(this.playBeat);

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    stopPlayback = () => {
        this.intervalTimer.stopPlayback();

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

    pausePlayback = () => {
        this.intervalTimer.pausePlayback();

        // Manually call updateUI method to see changes reflected in the UI
        this.updateUI();
    }

}